import { useRef, useState } from 'react';
import { useFormik } from 'formik';
import { ArrowUpRight, Check, Paperclip, X } from 'lucide-react';
import Seo from '@/components/Seo';
import { SITE_URL, PERSON_ID, WEBSITE_ID, graph, breadcrumbSchema } from '@/lib/seo';
import { gsap, SplitText, useGSAP, MOTION_OK } from '@/lib/gsap';
import { profile, socials } from '@/lib/portfolioData';
import styles from '../styles/Contact.module.scss';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_ATTACHMENTS = 5;
const MIN_MESSAGE_LENGTH = 15;
const ALLOWED_FILE_TYPES = [
    'image/png',
    'image/jpeg',
    'image/webp',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const SOURCES = ['LinkedIn', 'GitHub', 'Google', 'Other'];

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
        errors.name = 'Please enter your name.';
    }

    if (!values.email.trim()) {
        errors.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'That email address doesn\'t look right.';
    }

    if (!values.message.trim()) {
        errors.message = 'Please write a short message.';
    } else if (values.message.trim().length < MIN_MESSAGE_LENGTH) {
        errors.message = `A few more words, please (at least ${MIN_MESSAGE_LENGTH} characters).`;
    }

    if (!values.contactReason) {
        errors.contactReason = 'Please pick one.';
    }

    if (values.attachments.length > MAX_ATTACHMENTS) {
        errors.attachments = `You can attach up to ${MAX_ATTACHMENTS} files.`;
    }

    const oversizedFile = values.attachments.find((file) => file.size > MAX_FILE_SIZE);
    if (oversizedFile) {
        errors.attachments = `${oversizedFile.name} is larger than 10 MB.`;
    }

    const unsupportedFile = values.attachments.find((file) => !ALLOWED_FILE_TYPES.includes(file.type));
    if (unsupportedFile) {
        errors.attachments = `${unsupportedFile.name} isn't a supported file type.`;
    }

    return errors;
}

// Label above, error below, both wired to the control for screen readers.
function Field({ id, label, hint, error, children }) {
    return (
        <div className={styles.field}>
            <label htmlFor={id} className={styles.label}>
                {label}
                {hint ? <span className={styles.labelHint}>{hint}</span> : null}
            </label>
            {children}
            {error ? (
                <p id={`${id}-error`} className={styles.fieldError}>
                    {error}
                </p>
            ) : null}
        </div>
    );
}

export default function Contact() {
    const root = useRef(null);
    const fileInputRef = useRef(null);
    const [isDragActive, setIsDragActive] = useState(false);
    const [sentTo, setSentTo] = useState(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                const split = SplitText.create(root.current.querySelector(`.${styles.title}`), {
                    type: 'lines',
                    mask: 'lines',
                });
                gsap.timeline({ defaults: { ease: 'expo.out' } })
                    .from(split.lines, { yPercent: 110, duration: 1.1, stagger: 0.08 })
                    .from(
                        root.current.querySelectorAll('[data-reveal]'),
                        { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.07 },
                        '<0.2'
                    );
                return () => split.revert();
            });
            return () => mm.revert();
        },
        { scope: root }
    );

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
                        message: data.message || 'Something went wrong while sending your message.',
                    });
                    return;
                }

                setSentTo({ name: values.name.trim().split(/\s+/)[0], email: values.email.trim() });
                resetForm();
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            } catch (error) {
                setStatus({
                    type: 'error',
                    message: 'Could not send your message. Check your connection and try again.',
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

    const errorFor = (name) => (touched[name] && errors[name] ? errors[name] : null);
    const describedBy = (name) => (errorFor(name) ? `${name}-error` : undefined);

    const handleAttachmentChange = (incomingFiles) => {
        const mergedFiles = mergeUniqueFiles(values.attachments, incomingFiles.filter(Boolean));
        setFieldValue('attachments', mergedFiles);
        setFieldTouched('attachments', true, false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleAttachmentRemove = (indexToRemove) => {
        setFieldValue(
            'attachments',
            values.attachments.filter((_, index) => index !== indexToRemove)
        );
        setFieldTouched('attachments', true, false);
    };

    const messageLength = values.message.trim().length;
    const links = socials.filter((s) => s.label !== 'Resume');

    return (
        <>
            <Seo
                title="Contact Kuldeepsinh Jadeja – Hire a Full-Stack Engineer"
                description="Contact Kuldeepsinh Jadeja, a Full-Stack Engineer in Ahmedabad, India, about React, Next.js and Node.js roles, freelance projects or collaborations."
                socialDescription="Contact Kuldeepsinh Jadeja about React, Next.js and Node.js roles, freelance projects or collaborations."
                path="/contact"
                image="/og/contact.jpg"
                jsonLd={graph(
                    {
                        "@type": "ContactPage",
                        "@id": `${SITE_URL}/contact#page`,
                        url: `${SITE_URL}/contact`,
                        name: "Contact Kuldeepsinh Jadeja",
                        isPartOf: { "@id": WEBSITE_ID },
                        about: { "@id": PERSON_ID },
                    },
                    breadcrumbSchema([
                        { name: "Home", path: "/" },
                        { name: "Contact", path: "/contact" },
                    ])
                )}
            />

            <section ref={root} className={styles.page}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Tell me what you&apos;re building.</h1>
                    <p className={styles.lede} data-reveal>
                        Full-time roles, freelance projects or a question about React, Next.js or Node.js.
                        Send a note and I&apos;ll get back to you by email.
                    </p>
                </header>

                <div className={styles.layout}>
                    <aside className={styles.aside}>
                        <div className={styles.availability} data-reveal>
                            <span className={styles.statusDot} aria-hidden="true" />
                            <p>{profile.availability}</p>
                        </div>

                        <dl className={styles.facts} data-reveal>
                            <div>
                                <dt>Currently</dt>
                                <dd>
                                    {profile.role} at {profile.currentCompany}
                                </dd>
                            </div>
                            <div>
                                <dt>Based in</dt>
                                <dd>{profile.location}</dd>
                            </div>
                        </dl>

                        <nav aria-label="Profiles" className={styles.profiles} data-reveal>
                            <p className={styles.profilesTitle}>Or find me on</p>
                            <ul>
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <a href={link.href} target="_blank" rel="noopener noreferrer">
                                            {link.label}
                                            <ArrowUpRight size={16} aria-hidden="true" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </aside>

                    <div className={styles.card} data-reveal>
                        {sentTo ? (
                            <div className={styles.success} role="status">
                                <span className={styles.successIcon} aria-hidden="true">
                                    <Check size={26} strokeWidth={2.2} />
                                </span>
                                <h2 className={styles.successTitle}>Message sent.</h2>
                                <p className={styles.successText}>
                                    Thanks{sentTo.name ? `, ${sentTo.name}` : ''}. I&apos;ll reply to{' '}
                                    <strong>{sentTo.email}</strong>.
                                </p>
                                <button type="button" className={styles.secondaryBtn} onClick={() => setSentTo(null)}>
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                                <div className={styles.row}>
                                    <Field id="name" label="Name" error={errorFor('name')}>
                                        <input
                                            id="name"
                                            type="text"
                                            name="name"
                                            autoComplete="name"
                                            className={styles.input}
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            aria-invalid={errorFor('name') ? 'true' : 'false'}
                                            aria-describedby={describedBy('name')}
                                        />
                                    </Field>
                                    <Field id="email" label="Email" error={errorFor('email')}>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            autoComplete="email"
                                            inputMode="email"
                                            className={styles.input}
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            aria-invalid={errorFor('email') ? 'true' : 'false'}
                                            aria-describedby={describedBy('email')}
                                        />
                                    </Field>
                                </div>

                                <Field
                                    id="message"
                                    label="Message"
                                    hint={
                                        messageLength > 0 && messageLength < MIN_MESSAGE_LENGTH
                                            ? `${MIN_MESSAGE_LENGTH - messageLength} more characters`
                                            : null
                                    }
                                    error={errorFor('message')}
                                >
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={6}
                                        className={`${styles.input} ${styles.textarea}`}
                                        value={values.message}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        aria-invalid={errorFor('message') ? 'true' : 'false'}
                                        aria-describedby={describedBy('message')}
                                        data-lenis-prevent
                                    />
                                </Field>

                                <fieldset
                                    className={styles.fieldset}
                                    aria-describedby={describedBy('contactReason')}
                                >
                                    <legend className={styles.label}>Where did you hear about me?</legend>
                                    <div className={styles.choices}>
                                        {SOURCES.map((source) => (
                                            <label key={source} className={styles.choice}>
                                                <input
                                                    type="radio"
                                                    name="contactReason"
                                                    value={source}
                                                    checked={values.contactReason === source}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <span>{source}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errorFor('contactReason') ? (
                                        <p id="contactReason-error" className={styles.fieldError}>
                                            {errorFor('contactReason')}
                                        </p>
                                    ) : null}
                                </fieldset>

                                <div className={styles.field}>
                                    <span className={styles.label}>
                                        Attachments
                                        <span className={styles.labelHint}>Optional</span>
                                    </span>
                                    <input
                                        ref={fileInputRef}
                                        id="attachments"
                                        name="attachments"
                                        type="file"
                                        className="sr-only"
                                        accept=".png,.jpg,.jpeg,.webp,.pdf,.txt,.doc,.docx"
                                        multiple
                                        tabIndex={-1}
                                        onChange={(event) => handleAttachmentChange(Array.from(event.currentTarget.files || []))}
                                    />
                                    <button
                                        type="button"
                                        className={`${styles.dropzone} ${isDragActive ? styles.dropzoneActive : ''}`}
                                        aria-describedby={`attachments-hint${errorFor('attachments') ? ' attachments-error' : ''}`}
                                        onClick={() => fileInputRef.current?.click()}
                                        onDragOver={(event) => {
                                            event.preventDefault();
                                            setIsDragActive(true);
                                        }}
                                        onDragLeave={() => setIsDragActive(false)}
                                        onDrop={(event) => {
                                            event.preventDefault();
                                            setIsDragActive(false);
                                            handleAttachmentChange(Array.from(event.dataTransfer.files || []));
                                        }}
                                    >
                                        <Paperclip size={18} aria-hidden="true" />
                                        <span>
                                            Drop files or <span className={styles.browse}>browse</span>
                                        </span>
                                    </button>
                                    <p id="attachments-hint" className={styles.hint}>
                                        Up to {MAX_ATTACHMENTS} files, 10 MB each. PNG, JPG, WEBP, PDF, TXT, DOC, DOCX.
                                    </p>

                                    {values.attachments.length ? (
                                        <ul className={styles.files} data-lenis-prevent>
                                            {values.attachments.map((file, index) => (
                                                <li key={`${file.name}-${file.size}-${file.lastModified}`} className={styles.file}>
                                                    <span className={styles.fileName}>{file.name}</span>
                                                    <span className={styles.fileSize}>{formatFileSize(file.size)}</span>
                                                    <button
                                                        type="button"
                                                        className={styles.fileRemove}
                                                        aria-label={`Remove ${file.name}`}
                                                        onClick={() => handleAttachmentRemove(index)}
                                                    >
                                                        <X size={16} aria-hidden="true" />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : null}

                                    {errorFor('attachments') ? (
                                        <p id="attachments-error" className={styles.fieldError}>
                                            {errorFor('attachments')}
                                        </p>
                                    ) : null}
                                </div>

                                {status?.type === 'error' ? (
                                    <p className={styles.formError} role="alert">
                                        {status.message}
                                    </p>
                                ) : null}

                                <div className={styles.actions}>
                                    <button type="submit" className={styles.submit} disabled={isSubmitting}>
                                        {isSubmitting ? 'Sending…' : 'Send message'}
                                        <ArrowUpRight size={18} aria-hidden="true" />
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
