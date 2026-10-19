import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import styles from "./Section.module.scss";

// "(01) — Label" + large title whose lines rise out of a mask on enter.
export default function SectionHeading({ index, label, title, align = "left" }) {
    const root = useRef(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                const titleEl = root.current.querySelector("h2");
                const split = SplitText.create(titleEl, { type: "lines", mask: "lines" });
                const tl = gsap.timeline({
                    scrollTrigger: { trigger: root.current, start: "top 85%", toggleActions: "play none none none" },
                });
                tl.from(root.current.querySelector(`.${styles.label}`), {
                    autoAlpha: 0,
                    x: -20,
                    duration: 0.8,
                    ease: "power3.out",
                }).from(
                    split.lines,
                    { yPercent: 110, duration: 1.2, stagger: 0.1, ease: "expo.out" },
                    "<0.1"
                );
                return () => split.revert();
            });
            return () => mm.revert();
        },
        { scope: root }
    );

    return (
        <div ref={root} className={`${styles.heading} ${align === "center" ? styles.center : ""}`}>
            <p className={styles.label}>
                <span className={styles.index}>({String(index).padStart(2, "0")})</span> — {label}
            </p>
            <h2 className={styles.title}>{title}</h2>
        </div>
    );
}
