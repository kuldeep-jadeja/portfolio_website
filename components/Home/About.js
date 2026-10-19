import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import { profile, projects, yearsSince } from "@/lib/portfolioData";
import SectionHeading from "./SectionHeading";
import sectionStyles from "./Section.module.scss";
import styles from "./About.module.scss";

export default function About() {
    const root = useRef(null);

    const stats = [
        { value: yearsSince(profile.careerStart), suffix: "+", label: "Years building for the web" },
        { value: 1000, suffix: "+", label: "Active users secured with JWT & RBAC" },
        { value: 35, prefix: "+", suffix: "", label: "Lighthouse points gained on live products" },
        { value: projects.length, suffix: "", label: "Featured side projects" },
    ];

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                // Words light up as the statement scrolls through the viewport
                const split = SplitText.create(root.current.querySelector(`.${styles.statement}`), {
                    type: "words",
                });
                gsap.fromTo(
                    split.words,
                    { opacity: 0.14 },
                    {
                        opacity: 1,
                        ease: "none",
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: root.current.querySelector(`.${styles.statement}`),
                            start: "top 80%",
                            end: "bottom 45%",
                            scrub: true,
                        },
                    }
                );

                // Count-up stats
                gsap.utils.toArray(`.${styles.statValue}`, root.current).forEach((el) => {
                    const target = Number(el.dataset.value);
                    const counter = { value: 0 };
                    gsap.to(counter, {
                        value: target,
                        duration: 1.8,
                        ease: "power3.out",
                        scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
                        onUpdate: () => {
                            el.textContent = Math.round(counter.value).toLocaleString("en-US");
                        },
                    });
                });

                gsap.from(`.${styles.stat}`, {
                    y: 40,
                    autoAlpha: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "expo.out",
                    scrollTrigger: { trigger: `.${styles.stats}`, start: "top 88%", toggleActions: "play none none none" },
                });

                return () => split.revert();
            });
            return () => mm.revert();
        },
        { scope: root }
    );

    return (
        <section ref={root} className={sectionStyles.section} id="about">
            <SectionHeading index={1} label="About" title="Full-stack, performance-obsessed." />
            <p className={styles.statement}>{profile.about}</p>

            <ul className={styles.stats}>
                {stats.map((stat) => (
                    <li key={stat.label} className={styles.stat}>
                        <p className={styles.statNumber}>
                            {stat.prefix}
                            <span className={styles.statValue} data-value={stat.value} suppressHydrationWarning>
                                {stat.value.toLocaleString("en-US")}
                            </span>
                            {stat.suffix}
                        </p>
                        <p className={styles.statLabel}>{stat.label}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}
