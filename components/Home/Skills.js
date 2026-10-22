import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { skillGroups } from "@/lib/portfolioData";
import SectionHeading from "./SectionHeading";
import sectionStyles from "./Section.module.scss";
import styles from "./Skills.module.scss";

// Spotlight that follows the pointer inside each card. Writes `transform` on the
// spotlight itself: a CSS variable on the card would restyle every pill per move.
function trackPointer(e) {
    const card = e.currentTarget;
    const spot = card.firstElementChild;
    const rect = card.getBoundingClientRect();
    spot.style.transform = `translate(${e.clientX - rect.left}px, ${e.clientY - rect.top}px)`;
}

export default function Skills() {
    const root = useRef(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                gsap.utils.toArray(`.${styles.card}`).forEach((card, i) => {
                    const tl = gsap.timeline({
                        scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
                    });
                    tl.from(card, {
                        y: 80,
                        autoAlpha: 0,
                        rotateX: -12,
                        transformOrigin: "50% 100%",
                        duration: 1.2,
                        delay: (i % 2) * 0.12,
                        ease: "expo.out",
                    }).from(
                        card.querySelectorAll(`.${styles.pill}`),
                        { scale: 0.6, autoAlpha: 0, duration: 0.5, stagger: 0.04, ease: "back.out(2.5)" },
                        "<0.35"
                    );
                });
            });
            return () => mm.revert();
        },
        { scope: root }
    );

    return (
        <section ref={root} className={sectionStyles.section} id="skills">
            <SectionHeading index={3} label="Skills" title="The toolbox." />
            <div className={styles.grid}>
                {skillGroups.map((group) => (
                    <article key={group.title} className={styles.card} onPointerMove={trackPointer}>
                        <span className={styles.spotlight} aria-hidden="true" />
                        <div className={styles.cardHead}>
                            <h3 className={styles.cardTitle}>{group.title}</h3>
                            <span className={styles.cardIndex}>
                                {String(group.items.length).padStart(2, "0")} tools
                            </span>
                        </div>
                        <ul className={styles.pills}>
                            {group.items.map((item) => (
                                <li key={item} className={styles.pill}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </section>
    );
}
