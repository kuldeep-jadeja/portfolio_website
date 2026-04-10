import styles from '../styles/Contact.module.scss';

export default function Contact() {
    return (
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
                    <form className={styles.contactForm}>
                        <div className={styles.inputGrp}>
                            <input type="text" placeholder='Name' className={styles.input} />
                        </div>
                        <div className={styles.inputGrp}>
                            <input type="email" placeholder='Email' className={styles.input} />
                        </div>
                        <div className={styles.inputGrp}>
                            <textarea placeholder='Message' className={styles.textarea}
                                style={{ resize: 'none' }}
                            ></textarea>
                        </div>
                        <div className={`${styles.inputGrp} ${styles.radioGroup}`}>
                            <h3 className={styles.formLabel}>
                                Where did you hear about me?
                            </h3>
                            <div className={styles.radioWrapper}>
                                <label className={styles.radioLabel}>
                                    <input type="radio" name="contactReason" value="LinkedIn" className={styles.radioInput} />
                                    <span className={styles.customRadio}></span>
                                    <span className={styles.radioText}>LinkedIn</span>
                                </label>
                                <label className={styles.radioLabel}>
                                    <input type="radio" name="contactReason" value="github" className={styles.radioInput} />
                                    <span className={styles.customRadio}></span>
                                    <span className={styles.radioText}>GitHub</span>
                                </label>
                                <label className={styles.radioLabel}>
                                    <input type="radio" name="contactReason" value="google" className={styles.radioInput} />
                                    <span className={styles.customRadio}></span>
                                    <span className={styles.radioText}>Google</span>
                                </label>
                                <label className={styles.radioLabel}>
                                    <input type="radio" name="contactReason" value="other" className={styles.radioInput} />
                                    <span className={styles.customRadio}></span>
                                    <span className={styles.radioText}>Other</span>
                                </label>
                            </div>
                        </div>
                        <button type='submit' className={styles.submitBtn}>Submit</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
