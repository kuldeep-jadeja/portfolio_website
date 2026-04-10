import fs from 'fs/promises';
import path from 'path';
import formidable from 'formidable';
import { getDb } from '../../lib/mongodb';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_ATTACHMENTS = 5;
const DEFAULT_CONTACT_UPLOAD_FOLDER = 'contact-attachments';
const ALLOWED_MIME_TYPES = new Set([
    'image/png',
    'image/jpeg',
    'image/webp',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

export const config = {
    api: {
        bodyParser: false,
    },
};

function firstFieldValue(value) {
    if (Array.isArray(value)) {
        return String(value[0] || '');
    }
    return String(value || '');
}

function getFileArray(fileInput) {
    if (!fileInput) {
        return [];
    }
    return Array.isArray(fileInput) ? fileInput : [fileInput];
}

function parseMultipartForm(req) {
    const form = formidable({
        multiples: true,
        allowEmptyFiles: false,
        maxFileSize: MAX_FILE_SIZE,
        maxFiles: MAX_ATTACHMENTS,
        keepExtensions: true,
    });

    return new Promise((resolve, reject) => {
        form.parse(req, (error, fields, files) => {
            if (error) {
                reject(error);
                return;
            }
            resolve({ fields, files });
        });
    });
}

function sanitizeBaseName(name) {
    return name.replace(/[^a-zA-Z0-9-_]/g, '-').replace(/-+/g, '-').slice(0, 64) || 'file';
}

function sanitizeFolderPath(folderPath) {
    const normalized = String(folderPath || '')
        .replace(/\\/g, '/')
        .replace(/^\/+|\/+$/g, '');

    const safeSegments = normalized
        .split('/')
        .map((segment) => segment.replace(/[^a-zA-Z0-9-_]/g, '-').replace(/-+/g, '-').slice(0, 64))
        .filter(Boolean);

    return safeSegments.join('/') || DEFAULT_CONTACT_UPLOAD_FOLDER;
}

function parseJsonSafely(text) {
    try {
        return JSON.parse(text);
    } catch {
        return null;
    }
}

function deriveUploadUrl() {
    const explicitUploadUrl = process.env.CLIPPER_UPLOAD_URL || process.env.FILE_SERVER_UPLOAD_URL;
    if (explicitUploadUrl) {
        return explicitUploadUrl;
    }

    const flmngrUrl = process.env.NEXT_PUBLIC_FLMNGR_URL;
    if (!flmngrUrl) {
        return null;
    }

    try {
        const url = new URL(flmngrUrl);
        url.pathname = '/upload';
        url.search = '';
        url.hash = '';
        return url.toString();
    } catch {
        return null;
    }
}

function deriveDeleteUrl(uploadUrl) {
    const explicitDeleteUrl = process.env.CLIPPER_DELETE_URL || process.env.FILE_SERVER_DELETE_URL;
    if (explicitDeleteUrl) {
        return explicitDeleteUrl;
    }

    if (!uploadUrl) {
        return null;
    }

    try {
        const url = new URL(uploadUrl);
        url.pathname = '/delete';
        url.search = '';
        url.hash = '';
        return url.toString();
    } catch {
        return null;
    }
}

function getFileServerConfig() {
    const uploadUrl = deriveUploadUrl();
    const deleteUrl = deriveDeleteUrl(uploadUrl);
    const uploadToken =
        process.env.CLIPPER_UPLOAD_TOKEN ||
        process.env.FILE_SERVER_UPLOAD_TOKEN ||
        'clipper-upload-token-2024';

    if (!uploadUrl || !deleteUrl || !uploadToken) {
        const error = new Error('File server upload is not configured.');
        error.code = 'FILE_SERVER_CONFIG_MISSING';
        throw error;
    }

    return { uploadUrl, deleteUrl, uploadToken };
}

function extractFileServerPath(fileUrl) {
    try {
        const parsed = new URL(fileUrl);
        const marker = '/files/';
        const markerIndex = parsed.pathname.indexOf(marker);
        if (markerIndex === -1) {
            return null;
        }
        return decodeURIComponent(parsed.pathname.slice(markerIndex + marker.length));
    } catch {
        return null;
    }
}

async function uploadAttachmentToFileServer(file) {
    const { uploadUrl, deleteUrl, uploadToken } = getFileServerConfig();
    const uploadFolder = sanitizeFolderPath(process.env.CLIPPER_CONTACT_UPLOAD_FOLDER || DEFAULT_CONTACT_UPLOAD_FOLDER);
    const originalName = file.originalFilename || 'attachment';
    const extension = path.extname(originalName).toLowerCase();
    const baseName = sanitizeBaseName(path.basename(originalName, extension));
    const uniquePart = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const fileServerName = `${uploadFolder}/${uniquePart}-${baseName}${extension}`;

    const fileBuffer = await fs.readFile(file.filepath);
    const body = new FormData();
    // Send filename first so multer destination callback receives req.body.filename.
    body.append('filename', fileServerName);
    body.append('file', new Blob([fileBuffer], { type: file.mimetype || 'application/octet-stream' }), originalName);

    let response;
    try {
        response = await fetch(uploadUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${uploadToken}`,
            },
            body,
        });
    } catch (networkError) {
        const error = new Error('Unable to reach file upload server.');
        error.code = 'FILE_SERVER_UNREACHABLE';
        error.cause = networkError;
        throw error;
    }

    const responseText = await response.text();
    const responseJson = parseJsonSafely(responseText);
    const uploadedUrl = responseJson?.url;
    const isSuccess = response.ok && responseJson?.success && typeof uploadedUrl === 'string';

    if (!isSuccess) {
        const error = new Error(responseJson?.error || responseJson?.message || 'Upload failed on file server.');
        error.code = 'FILE_SERVER_UPLOAD_FAILED';
        error.status = response.status;
        throw error;
    }

    const fileServerPath = extractFileServerPath(uploadedUrl) || fileServerName;

    return {
        publicUrl: uploadedUrl,
        originalName,
        mimeType: file.mimetype || null,
        size: file.size || null,
        fileServerPath,
        deleteUrl,
        uploadToken,
    };
}

async function deleteAttachmentFromFileServer(savedAttachment) {
    if (!savedAttachment?.fileServerPath || !savedAttachment?.deleteUrl || !savedAttachment?.uploadToken) {
        return;
    }

    try {
        await fetch(savedAttachment.deleteUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${savedAttachment.uploadToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filename: savedAttachment.fileServerPath,
                action: 'delete',
            }),
        });
    } catch (error) {
        console.error('Could not delete uploaded attachment from file server:', error);
    }
}

async function deleteAttachmentsFromFileServer(savedAttachments) {
    for (const savedAttachment of savedAttachments) {
        // Best-effort cleanup for each uploaded file when a later operation fails.
        await deleteAttachmentFromFileServer(savedAttachment);
    }
}

function validateFields(payload) {
    const fieldErrors = {};

    if (!payload.name) {
        fieldErrors.name = 'Name is required.';
    }

    if (!payload.email) {
        fieldErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
        fieldErrors.email = 'Please provide a valid email address.';
    }

    if (!payload.message) {
        fieldErrors.message = 'Message is required.';
    } else if (payload.message.length < 15) {
        fieldErrors.message = 'Message must be at least 15 characters.';
    }

    if (!payload.contactReason) {
        fieldErrors.contactReason = 'Please select how you heard about me.';
    }

    return fieldErrors;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    let savedAttachments = [];
    let uploadedFiles = [];

    try {
        const { fields, files } = await parseMultipartForm(req);
        const payload = {
            name: firstFieldValue(fields.name).trim(),
            email: firstFieldValue(fields.email).trim(),
            message: firstFieldValue(fields.message).trim(),
            contactReason: firstFieldValue(fields.contactReason).trim(),
        };

        const fieldErrors = validateFields(payload);
        if (Object.keys(fieldErrors).length > 0) {
            return res.status(400).json({
                message: 'Please fix the highlighted fields and try again.',
                fieldErrors,
            });
        }

        uploadedFiles = getFileArray(files.attachments || files.attachment).filter(Boolean);

        if (uploadedFiles.length > MAX_ATTACHMENTS) {
            return res.status(400).json({
                message: `You can upload up to ${MAX_ATTACHMENTS} files.`,
                fieldErrors: {
                    attachments: `You can upload up to ${MAX_ATTACHMENTS} files.`,
                },
            });
        }

        for (const uploadedFile of uploadedFiles) {
            if (!uploadedFile.mimetype || !ALLOWED_MIME_TYPES.has(uploadedFile.mimetype)) {
                return res.status(400).json({
                    message: 'Unsupported file type.',
                    fieldErrors: {
                        attachments: 'Only PNG, JPG, WEBP, PDF, TXT, DOC, and DOCX files are supported.',
                    },
                });
            }

            const savedAttachment = await uploadAttachmentToFileServer(uploadedFile);
            savedAttachments.push(savedAttachment);
        }

        const attachmentDocs = savedAttachments.map((savedAttachment) => ({
            url: savedAttachment.publicUrl,
            originalName: savedAttachment.originalName,
            mimeType: savedAttachment.mimeType,
            size: savedAttachment.size,
        }));

        const db = await getDb();
        const insertResult = await db.collection('contact_submissions').insertOne({
            ...payload,
            attachments: attachmentDocs,
            // Keep legacy field for compatibility with existing reads.
            attachment: attachmentDocs[0] || null,
            createdAt: new Date(),
        });

        return res.status(201).json({
            message: 'Your message has been submitted successfully.',
            id: insertResult.insertedId,
        });
    } catch (error) {
        await deleteAttachmentsFromFileServer(savedAttachments);

        if (error?.code === 'MONGODB_CONFIG_MISSING') {
            return res.status(500).json({
                message: 'Database is not configured yet. Please contact the site owner.',
            });
        }

        if (error?.code === 'FILE_SERVER_CONFIG_MISSING') {
            return res.status(500).json({
                message: 'Attachment upload service is not configured on the server.',
            });
        }

        if (error?.code === 'FILE_SERVER_UNREACHABLE') {
            return res.status(503).json({
                message: 'Attachment upload service is currently unavailable. Please try again shortly.',
            });
        }

        if (error?.code === 'FILE_SERVER_UPLOAD_FAILED') {
            return res.status(502).json({
                message: 'Attachment upload failed. Please try again.',
            });
        }

        if (error?.name === 'MongoServerSelectionError') {
            return res.status(503).json({
                message: 'Database is temporarily unavailable. Please try again shortly.',
            });
        }

        if (error?.name === 'MongoServerError') {
            return res.status(500).json({
                message: 'Database error while saving your message. Please try again.',
            });
        }

        if (error?.code === 1009 || /maxFileSize/i.test(error?.message || '')) {
            return res.status(400).json({
                message: 'Uploaded file exceeds 10MB limit.',
                fieldErrors: {
                    attachments: 'Each file must be 10MB or smaller.',
                },
            });
        }

        if (error?.code === 1015 || /maxFiles/i.test(error?.message || '')) {
            return res.status(400).json({
                message: `You can upload up to ${MAX_ATTACHMENTS} files.`,
                fieldErrors: {
                    attachments: `You can upload up to ${MAX_ATTACHMENTS} files.`,
                },
            });
        }

        console.error('Contact form submission failed:', error);
        return res.status(500).json({
            message: 'Unexpected server error. Please try again later.',
        });
    } finally {
        for (const uploadedFile of uploadedFiles) {
            if (!uploadedFile?.filepath) {
                continue;
            }

            try {
                await fs.unlink(uploadedFile.filepath);
            } catch {
                // Ignore temp file cleanup failures.
            }
        }
    }
}
