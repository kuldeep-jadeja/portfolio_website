import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { experience, education } from "@/lib/portfolioData";
import SectionHeading from "./SectionHeading";
import sectionStyles from "./Section.module.scss";
import styles from "./Experience.module.scss";

export default function Experience() {
    const root = useRef(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                // Timeline rail draws itself with scroll
                gsap.fromTo(
                    `.${styles.railFill}`,
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: `.${styles.list}`,
                            start: "top 70%",
                            end: "bottom 60%",
                            scrub: true,
                        },
                    }
                );

                gsap.utils.toArray(`.${styles.item}`).forEach((item) => {
                    const tl = gsap.timeline({
                        scrollTrigger: { trigger: item, start: "top 82%", toggleActions: "play none none none" },
                        defaults: { ease: "expo.out" },
                    });
                    tl.from(item.querySelector(`.${styles.node}`), { scale: 0, duration: 0.6, ease: "back.out(3)" })
                        .from(item.querySelector(`.${styles.content}`), { x: 60, autoAlpha: 0, duration: 1.1 }, "<0.05")
                        .from(item.querySelectorAll(`.${styles.highlights} li`), { y: 16, autoAlpha: 0, duration: 0.7, stagger: 0.06 }, "<0.2")
                        .from(item.querySelectorAll(`.${styles.chip}`), { y: 12, autoAlpha: 0, duration: 0.6, stagger: 0.04 }, "<0.2");
                });

                gsap.from(`.${styles.education}`, {
                    y: 40,
                    autoAlpha: 0,
                    duration: 1.1,
                    ease: "expo.out",
                    scrollTrigger: { trigger: `.${styles.education}`, start: "top 88%", toggleActions: "play none none none" },
                });
            });
            return () => mm.revert();
        },
        { scope: root }
    );

    return (
        <section ref={root} className={sectionStyles.section} id="experience">
            <SectionHeading index={2} label="Experience" title="Where I've been building." />

            <div className={styles.list}>
                <span className={styles.rail} aria-hidden="true">
                    <span className={styles.railFill} />
                </span>
                <ol className={styles.items}>
                {experience.map((job, i) => (
                    <li key={`${job.company}-${job.role}`} className={styles.item}>
                        <span className={styles.node} aria-hidden="true" />
                        <article className={styles.content}>
                            <div className={styles.head}>
                                <div className={styles.company}>
                                    <span className={styles.logo}>
                                        {job.logo ? (
                                            <Image src={job.logo} alt="" width={44} height={44} />
                                        ) : (
                                            <span className={styles.monogram} aria-hidden="true">
                                                {job.company.charAt(0)}
                                            </span>
                                        )}
                                    </span>
                                    <div>
                                        <h3 className={styles.role}>{job.role}</h3>
                                        <p className={styles.companyName}>
                                            {job.company}
                                            {job.location && <span className={styles.location}> · {job.location}</span>}
                                        </p>
                                    </div>
                                </div>
                                <p className={styles.period}>
                                    {i === 0 && <span className={styles.current}>Now</span>}
                                    {job.period}
                                </p>
                            </div>
                            {job.highlights && (
                                <ul className={styles.highlights}>
                                    {job.highlights.map((point) => (
                                        <li key={point}>{point}</li>
                                    ))}
                                </ul>
                            )}
                            <ul className={styles.chips} aria-label="Tech used">
                                {job.stack.map((tech) => (
                                    <li key={tech} className={styles.chip}>
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    </li>
                ))}
                </ol>
            </div>

            <div className={styles.education}>
                <p className={styles.educationLabel}>Education</p>
                <div className={styles.educationBody}>
                    <h3 className={styles.educationSchool}>{education.school}</h3>
                    <p className={styles.educationDegree}>{education.degree}</p>
                </div>
                <p className={styles.period}>{education.period}</p>
            </div>
        </section>
    );
}
