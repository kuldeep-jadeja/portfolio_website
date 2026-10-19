import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, Globe, LibraryBig, Lock } from "lucide-react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { projects } from "@/lib/portfolioData";
import SectionHeading from "./SectionHeading";
import sectionStyles from "./Section.module.scss";
import styles from "./Projects.module.scss";

function ProjectLinks({ links, note }) {
    return (
        <div className={styles.links}>
            {links.live && (
                <a href={links.live} target="_blank" rel="noopener noreferrer" className={styles.linkPrimary}>
                    <Globe size={16} strokeWidth={1.6} /> Live site <ArrowUpRight size={16} />
                </a>
            )}
            {links.readme && (
                <Link href={links.readme} className={styles.link}>
                    <LibraryBig size={16} strokeWidth={1.6} /> Readme
                </Link>
            )}
            {links.source && (
                <a href={links.source} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    <Github size={16} strokeWidth={1.6} /> Source
                </a>
            )}
            {note && (
                <span className={styles.note}>
                    <Lock size={14} strokeWidth={1.8} /> {note}
                </span>
            )}
        </div>
    );
}

export default function Projects() {
    const root = useRef(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add(MOTION_OK, () => {
                const wraps = gsap.utils.toArray(`.${styles.cardWrap}`);
                const cleanups = [];

                wraps.forEach((wrap) => {
                    const media = wrap.querySelector(`.${styles.media}`);
                    const img = media.querySelector("img");

                    // Image unmasks from the bottom, body copy follows
                    const tl = gsap.timeline({
                        scrollTrigger: { trigger: wrap, start: "top 80%", toggleActions: "play none none none" },
                        defaults: { ease: "expo.out" },
                    });
                    tl.fromTo(
                        media,
                        { clipPath: "inset(100% 0% 0% 0% round 18px)" },
                        { clipPath: "inset(0% 0% 0% 0% round 18px)", duration: 1.4 }
                    )
                        .from(img, { scale: 1.3, duration: 1.6 }, "<")
                        .from(wrap.querySelectorAll(`.${styles.reveal}`), { y: 30, autoAlpha: 0, duration: 1, stagger: 0.07 }, "<0.25");

                    // 3D tilt on hover
                    const rotX = gsap.quickTo(media, "rotateX", { duration: 0.6, ease: "power3.out" });
                    const rotY = gsap.quickTo(media, "rotateY", { duration: 0.6, ease: "power3.out" });
                    const onMove = (e) => {
                        const r = media.getBoundingClientRect();
                        rotY(((e.clientX - r.left) / r.width - 0.5) * 10);
                        rotX(((e.clientY - r.top) / r.height - 0.5) * -10);
                    };
                    const onLeave = () => {
                        rotX(0);
                        rotY(0);
                    };
                    media.addEventListener("pointermove", onMove);
                    media.addEventListener("pointerleave", onLeave);
                    cleanups.push(() => {
                        media.removeEventListener("pointermove", onMove);
                        media.removeEventListener("pointerleave", onLeave);
                    });
                });

                // Sticky stack: each card recedes as the next one slides over it (desktop only)
                const stack = gsap.matchMedia();
                stack.add("(min-width: 901px)", () => {
                    wraps.forEach((wrap, i) => {
                        const next = wraps[i + 1];
                        if (!next) return;
                        const card = wrap.querySelector(`.${styles.card}`);
                        const trigger = {
                            trigger: next,
                            start: "top bottom",
                            end: "top 15%",
                            scrub: true,
                        };
                        gsap.to(card, {
                            scale: 1 - (wraps.length - 1 - i) * 0.05,
                            ease: "none",
                            scrollTrigger: trigger,
                        });
                        gsap.to(wrap.querySelector(`.${styles.shade}`), {
                            opacity: 0.65,
                            ease: "none",
                            scrollTrigger: trigger,
                        });
                    });
                });

                return () => {
                    stack.revert();
                    cleanups.forEach((fn) => fn());
                };
            });

            return () => mm.revert();
        },
        { scope: root }
    );

    return (
        <section ref={root} className={sectionStyles.section} id="work">
            <SectionHeading index={4} label="Selected work" title="Things I've shipped." />

            <div className={styles.stack}>
                {projects.map((project, i) => (
                    <div key={project.title} className={styles.cardWrap} style={{ "--i": i }}>
                        <article className={styles.card}>
                            <div className={styles.mediaFrame}>
                                <div className={styles.media} data-cursor="fill">
                                    <Image
                                        src={project.image}
                                        alt={`${project.title} preview`}
                                        fill
                                        sizes="(max-width: 900px) 100vw, 55vw"
                                        unoptimized
                                    />
                                </div>
                            </div>

                            <div className={styles.body}>
                                <div className={`${styles.meta} ${styles.reveal}`}>
                                    <span className={styles.number}>{String(i + 1).padStart(2, "0")}</span>
                                    <span className={styles.total}>/ {String(projects.length).padStart(2, "0")}</span>
                                </div>
                                <h3 className={`${styles.title} ${styles.reveal}`}>{project.title}</h3>
                                <p className={`${styles.description} ${styles.reveal}`}>{project.description}</p>
                                <ul className={`${styles.stackList} ${styles.reveal}`} aria-label="Tech stack">
                                    {project.stack.map((tech) => (
                                        <li key={tech}>{tech}</li>
                                    ))}
                                </ul>
                                <div className={styles.reveal}>
                                    <ProjectLinks links={project.links} note={project.note} />
                                </div>
                            </div>
                            <span className={styles.shade} aria-hidden="true" />
                        </article>
                    </div>
                ))}
            </div>
        </section>
    );
}
