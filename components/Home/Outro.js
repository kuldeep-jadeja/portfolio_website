import { useRef } from "react";
import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import Magnetic from "@/components/Effects/Magnetic";
import { profile, socials } from "@/lib/portfolioData";
import styles from "./Outro.module.scss";

export default function Outro() {
    const root = useRef(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                const split = SplitText.create(root.current.querySelector(`.${styles.big}`), {
                    type: "chars,words",
                    mask: "chars",
                });

                // Letters rise in sync with scroll
                gsap.from(split.chars, {
                    yPercent: 120,
                    ease: "none",
                    stagger: 0.02,
                    scrollTrigger: {
                        trigger: root.current,
                        start: "top 85%",
                        end: "top 25%",
                        scrub: 0.6,
                    },
                });

                // Starts at 0.85 (never scale(0)); no elastic — nothing threw it, so no overshoot
                gsap.from(`.${styles.ctaWrap}`, {
                    scale: 0.85,
                    autoAlpha: 0,
                    rotate: -45,
                    duration: 1.1,
                    ease: "expo.out",
                    scrollTrigger: { trigger: `.${styles.ctaWrap}`, start: "top 90%", toggleActions: "play none none none" },
                });

                gsap.from(`.${styles.footerItem}`, {
                    y: 24,
                    autoAlpha: 0,
                    stagger: 0.06,
                    duration: 0.9,
                    ease: "expo.out",
                    scrollTrigger: { trigger: `.${styles.footer}`, start: "top 95%", toggleActions: "play none none none" },
                });

                return () => split.revert();
            });
            return () => mm.revert();
        },
        { scope: root }
    );

    const scrollTop = () => {
        if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.6 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <section ref={root} className={styles.outro}>
            <p className={styles.label}>
                <span className={styles.index}>(05)</span> — What&apos;s next
            </p>
            <h2 className={styles.big}>
                Let&apos;s build something <span className={styles.accent}>great</span> together.
            </h2>

            <div className={styles.ctaRow}>
                <p className={styles.ctaText}>
                    {profile.availability} Have a project or just want to talk tech? My inbox is always open.
                </p>
                <Magnetic strength={0.45} className={styles.ctaWrap}>
                    <Link href="/contact" className={styles.cta} data-cursor="fill">
                        Get in touch <ArrowUpRight size={22} />
                    </Link>
                </Magnetic>
            </div>

            <footer className={styles.footer}>
                <ul className={styles.socials}>
                    {socials.map((s) => (
                        <li key={s.label} className={styles.footerItem}>
                            <a href={s.href} target="_blank" rel="noopener noreferrer" className={styles.social}>
                                {s.label} <ArrowUpRight size={14} />
                            </a>
                        </li>
                    ))}
                </ul>
                <div className={`${styles.footerMeta} ${styles.footerItem}`}>
                    <span>
                        © {new Date().getFullYear()} {profile.firstName} {profile.lastName}
                    </span>
                    <button type="button" className={styles.toTop} onClick={scrollTop}>
                        Back to top <ArrowUp size={14} />
                    </button>
                </div>
            </footer>
        </section>
    );
}
