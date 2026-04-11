import Head from 'next/head';
import styles from '../styles/Contact.module.scss';
import { useFormik } from 'formik';
import { useRef, useState } from 'react';
import { ImageUp, X } from 'lucide-react';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_ATTACHMENTS = 5;
const ALLOWED_FILE_TYPES = [
    'image/png',
    'image/jpeg',
    'image/webp',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

function formatFileSize(bytes) {
    if (!bytes) {
        return '0 B';
    }

    const units = ['B', 'KB', 'MB', 'GB'];
    const base = 1024;
    const unitIndex = Math.min(Math.floor(Math.log(bytes) / Math.log(base)), units.length - 1);
    const value = bytes / Math.pow(base, unitIndex);
    return `${value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

function mergeUniqueFiles(existingFiles, incomingFiles) {
    const seen = new Set(existingFiles.map((file) => `${file.name}-${file.size}-${file.lastModified}`));
    const merged = [...existingFiles];

    incomingFiles.forEach((file) => {
        const signature = `${file.name}-${file.size}-${file.lastModified}`;
        if (!seen.has(signature)) {
            seen.add(signature);
            merged.push(file);
        }
    });

    return merged;
}

function validate(values) {
    const errors = {};

    if (!values.name.trim()) {
        errors.name = 'Name is required.';
    }

    if (!values.email.trim()) {
        errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Please enter a valid email address.';
    }

    if (!values.message.trim()) {
        errors.message = 'Message is required.';
    } else if (values.message.trim().length < 15) {
        errors.message = 'Message must be at least 15 characters.';
    }

    if (!values.contactReason) {
        errors.contactReason = 'Please choose one option.';
    }

    if (values.attachments.length > MAX_ATTACHMENTS) {
        errors.attachments = `You can upload up to ${MAX_ATTACHMENTS} files.`;
    }

    const oversizedFile = values.attachments.find((file) => file.size > MAX_FILE_SIZE);
    if (oversizedFile) {
        errors.attachments = `${oversizedFile.name} is larger than 10MB.`;
    }

    const unsupportedFile = values.attachments.find((file) => !ALLOWED_FILE_TYPES.includes(file.type));
    if (unsupportedFile) {
        errors.attachments = `${unsupportedFile.name} is not a supported file type.`;
    }

    return errors;
}

export default function Contact() {
    const [isDragActive, setIsDragActive] = useState(false);
    const fileInputRef = useRef(null);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: '',
            contactReason: '',
            attachments: [],
        },
        validate,
        onSubmit: async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
            setStatus(null);

            const formData = new FormData();
            formData.append('name', values.name.trim());
            formData.append('email', values.email.trim());
            formData.append('message', values.message.trim());
            formData.append('contactReason', values.contactReason);

            values.attachments.forEach((file) => {
                formData.append('attachments', file);
            });

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json().catch(() => ({}));

                if (!response.ok) {
                    if (data.fieldErrors && typeof data.fieldErrors === 'object') {
                        const normalizedFieldErrors = { ...data.fieldErrors };
                        if (normalizedFieldErrors.attachment && !normalizedFieldErrors.attachments) {
                            normalizedFieldErrors.attachments = normalizedFieldErrors.attachment;
                        }
                        setErrors(normalizedFieldErrors);
                    }

                    setStatus({
                        type: 'error',
                        message: data.message || 'Something went wrong while submitting the form.',
                    });
                    return;
                }

                resetForm();
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                setStatus({
                    type: 'success',
                    message: data.message || 'Thanks! Your message has been submitted.',
                });
            } catch (error) {
                setStatus({
                    type: 'error',
                    message: 'Could not submit the form. Please try again in a moment.',
                });
            } finally {
                setSubmitting(false);
            }
        },
    });

    const {
        values,
        touched,
        errors,
        status,
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
        setFieldTouched,
    } = formik;

    const handleAttachmentChange = (incomingFiles) => {
        const filesToAdd = incomingFiles.filter(Boolean);
        const mergedFiles = mergeUniqueFiles(values.attachments, filesToAdd);

        setFieldValue('attachments', mergedFiles);
        setFieldTouched('attachments', true, false);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleAttachmentRemove = (indexToRemove) => {
        const nextFiles = values.attachments.filter((_, index) => index !== indexToRemove);

        setFieldValue('attachments', nextFiles);
        setFieldTouched('attachments', true, false);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const triggerFilePicker = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            <Head>
                <title>Contact - Kuldeepsinh Jadeja</title>
                <link rel="canonical" href="https://kuldeepjadeja.dev/contact" />
                <meta name="description"
                    content="Get in touch with Kuldeepsinh Jadeja, a passionate software engineer specializing in innovative technology solutions." />
                <meta name="image" content="/images/Homepage.webp" />
                <meta itemProp="name" content="Contact - Kuldeepsinh Jadeja" />
                <meta itemProp="description"
                    content="Kuldeepsinh Jadeja is a passionate software engineer specializing in innovative technology solutions. With strong expertise in software development, he builds impactful digital products and continuously evolves his skills to deliver high-quality, people-focused tech solutions." />
                <meta itemProp="image" content="/images/Homepage.webp" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Contact - Kuldeepsinh Jadeja" />
                <meta name="twitter:description"
                    content="Get in touch with Kuldeepsinh Jadeja, a passionate software engineer specializing in innovative technology solutions." />
                <meta name="twitter:site" content="@kuldeepjadeja" />
                <meta name="twitter:creator" content="@kuldeepjadeja" />
                <meta name="twitter:image:src" content="/images/Homepage.webp" />
                <meta name="keywords"
                    content="Kuldeep Jadeja, Software Engineer, React Developer, Frontend Developer, JavaScript Developer, Portfolio" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <meta name="og:title" content="Contact - Kuldeepsinh Jadeja" />
                <meta name="og:description"
                    content="Get in touch with Kuldeepsinh Jadeja, a passionate software engineer specializing in innovative technology solutions." />
                <meta name="og:image" content="/images/Homepage.webp" />
                <meta name="og:url" content="https://kuldeepjadeja.dev/contact" />
                <meta name="og:site_name" content="Kuldeep Jadeja Portfolio" />
                <meta name="og:locale" content="en_US" />
                <meta name="og:type" content="article" />
                <link rel="shortcut icon" type="image/x-icon" href="images/favicon.png" />
                <link rel="apple-touch-icon-precomposed" href="images/favicon.png" />
                <meta name="title" property="og:title"
                    content="Contact - Kuldeepsinh Jadeja" />
                <meta name="image" property="og:image" content="/images/Homepage.webp" />
                <meta name="author" content="Kuldeep Jadeja" />
                <link rel="icon" type="image/x-icon" href="images/favicon.png" />
            </Head>
            <section className={styles.contactWrapper}>
                <video autoPlay loop muted className={styles.backgroundVideo}>
                    <source src="/images/background_video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className={styles.contactFormWrapper}>
                    <div className={styles.content}>
                        <h1 className={styles.title}>Love To Hear from You 👋🏻</h1>
                        <h2 className={styles.subtitle}>Let's Discuss and Hustle Something Fascinating!</h2>
                    </div>
                    <div className={styles.rightWrapper}>
                        <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
                            <div className={styles.inputGrp}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder='Name'
                                    className={`${styles.input} ${touched.name && errors.name ? styles.inputError : ''}`}
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    aria-invalid={touched.name && errors.name ? 'true' : 'false'}
                                />
                                {touched.name && errors.name ? <span className={styles.errorText}>{errors.name}</span> : null}
                            </div>
                            <div className={styles.inputGrp}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder='Email'
                                    className={`${styles.input} ${touched.email && errors.email ? styles.inputError : ''}`}
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    aria-invalid={touched.email && errors.email ? 'true' : 'false'}
                                />
                                {touched.email && errors.email ? <span className={styles.errorText}>{errors.email}</span> : null}
                            </div>
                            <div className={styles.inputGrp}>
                                <textarea
                                    name="message"
                                    placeholder='Message'
                                    className={`${styles.textarea} ${touched.message && errors.message ? styles.inputError : ''}`}
                                    value={values.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    aria-invalid={touched.message && errors.message ? 'true' : 'false'}
                                    style={{ resize: 'none' }}
                                ></textarea>
                                {touched.message && errors.message ? <span className={styles.errorText}>{errors.message}</span> : null}
                            </div>
                            <div className={`${styles.inputGrp} ${styles.radioGroup}`}>
                                <h3 className={styles.formLabel}>
                                    Where did you hear about me?
                                </h3>
                                <div className={styles.radioWrapper}>
                                    <label className={styles.radioLabel}>
                                        <input
                                            type="radio"
                                            name="contactReason"
                                            value="LinkedIn"
                                            className={styles.radioInput}
                                            checked={values.contactReason === 'LinkedIn'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <span className={styles.customRadio}></span>
                                        <span className={styles.radioText}>LinkedIn</span>
                                    </label>
                                    <label className={styles.radioLabel}>
                                        <input
                                            type="radio"
                                            name="contactReason"
                                            value="GitHub"
                                            className={styles.radioInput}
                                            checked={values.contactReason === 'GitHub'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <span className={styles.customRadio}></span>
                                        <span className={styles.radioText}>GitHub</span>
                                    </label>
                                    <label className={styles.radioLabel}>
                                        <input
                                            type="radio"
                                            name="contactReason"
                                            value="Google"
                                            className={styles.radioInput}
                                            checked={values.contactReason === 'Google'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <span className={styles.customRadio}></span>
                                        <span className={styles.radioText}>Google</span>
                                    </label>
                                    <label className={styles.radioLabel}>
                                        <input
                                            type="radio"
                                            name="contactReason"
                                            value="Other"
                                            className={styles.radioInput}
                                            checked={values.contactReason === 'Other'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <span className={styles.customRadio}></span>
                                        <span className={styles.radioText}>Other</span>
                                    </label>
                                </div>
                                {touched.contactReason && errors.contactReason ? <span className={styles.errorText}>{errors.contactReason}</span> : null}
                            </div>
                            <div className={styles.inputGrp}>
                                <label htmlFor="attachment">Upload Files</label>
                                <input
                                    ref={fileInputRef}
                                    id="attachment"
                                    name="attachments"
                                    type="file"
                                    className={styles.fileInputHidden}
                                    accept=".png,.jpg,.jpeg,.webp,.pdf,.txt,.doc,.docx"
                                    multiple
                                    onChange={(event) => {
                                        const selectedFiles = Array.from(event.currentTarget.files || []);
                                        handleAttachmentChange(selectedFiles);
                                    }}
                                    onBlur={() => setFieldTouched('attachments', true, true)}
                                />
                                <div
                                    className={`${styles.uploadArea} ${isDragActive ? styles.uploadAreaActive : ''} ${values.attachments.length ? styles.uploadAreaWithFiles : ''}`}
                                    role="button"
                                    tabIndex={0}
                                    aria-label="Upload files"
                                    onClick={triggerFilePicker}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter' || event.key === ' ') {
                                            event.preventDefault();
                                            triggerFilePicker();
                                        }
                                    }}
                                    onDragOver={(event) => {
                                        event.preventDefault();
                                        setIsDragActive(true);
                                    }}
                                    onDragEnter={(event) => {
                                        event.preventDefault();
                                        setIsDragActive(true);
                                    }}
                                    onDragLeave={(event) => {
                                        event.preventDefault();
                                        setIsDragActive(false);
                                    }}
                                    onDrop={(event) => {
                                        event.preventDefault();
                                        setIsDragActive(false);
                                        const droppedFiles = Array.from(event.dataTransfer.files || []);
                                        handleAttachmentChange(droppedFiles);
                                    }}
                                >
                                    {!values.attachments.length ? (
                                        <div className={styles.uploadIntro}>
                                            <ImageUp size={26} strokeWidth={1.8} className={styles.uploadIcon} aria-hidden="true" />
                                            <span className={styles.uploadPrimaryText}>
                                                Drop your files here, or <span className={styles.uploadBrowseText}>Browse</span>
                                            </span>
                                            <span className={styles.uploadSecondaryText}>Up to {MAX_ATTACHMENTS} files, max 10MB each</span>
                                        </div>
                                    ) : null}

                                    {values.attachments.length ? (
                                        <div className={styles.selectedFilesList} data-lenis-prevent="true">
                                            {values.attachments.map((file, index) => (
                                                <div className={styles.uploadSelectedRow} key={`${file.name}-${file.size}-${file.lastModified}-${index}`}>
                                                    <div className={styles.uploadSelectedInfo}>
                                                        <span className={styles.uploadSelectedName}>{file.name}</span>
                                                        <span className={styles.uploadSelectedSize}>{formatFileSize(file.size)}</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className={styles.removeFileBtn}
                                                        aria-label={`Remove ${file.name}`}
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            event.stopPropagation();
                                                            handleAttachmentRemove(index);
                                                        }}
                                                    >
                                                        <X size={16} strokeWidth={2} aria-hidden="true" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                                <span className={styles.fileHint}>Accepted: PNG, JPG, WEBP, PDF, TXT, DOC, DOCX</span>
                                {touched.attachments && errors.attachments ? <span className={styles.errorText}>{errors.attachments}</span> : null}
                            </div>

                            {status?.message ? (
                                <div
                                    className={`${styles.statusMessage} ${status.type === 'success' ? styles.statusSuccess : styles.statusError
                                        }`}
                                    role="status"
                                >
                                    {status.message}
                                </div>
                            ) : null}

                            <button type='submit' className={styles.submitBtn} disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
