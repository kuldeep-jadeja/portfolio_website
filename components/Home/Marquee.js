import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { marqueeWords } from "@/lib/portfolioData";
import styles from "./Marquee.module.scss";

function Row({ words, outline }) {
    // Rendered twice so the track can loop seamlessly at -50%
    const items = [...words, ...words];
    return (
        <div className={`${styles.row} ${outline ? styles.outline : ""}`}>
            <div className={styles.track}>
                {items.map((word, i) => (
                    <span key={i} className={styles.item} aria-hidden={i >= words.length ? "true" : undefined}>
                        {word}
                        <span className={styles.star} aria-hidden="true">✦</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

// Two counter-moving rows whose speed and direction follow scroll velocity.
export default function Marquee() {
    const root = useRef(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                const tracks = gsap.utils.toArray(`.${styles.track}`, root.current);
                const loops = tracks.map((track, i) =>
                    gsap
                        .fromTo(
                            track,
                            { xPercent: i % 2 ? -50 : 0 },
                            { xPercent: i % 2 ? 0 : -50, duration: 38, ease: "none", repeat: -1 }
                        )
                        // Start deep into the loop so a negative timeScale can run backwards
                        .totalTime(38 * 1000)
                );

                let direction = 1;
                const st = ScrollTrigger.create({
                    trigger: root.current,
                    start: "top bottom",
                    end: "bottom top",
                    onUpdate: (self) => {
                        const velocity = self.getVelocity();
                        if (velocity !== 0) direction = velocity > 0 ? 1 : -1;
                        const boost = 1 + Math.min(Math.abs(velocity) / 250, 6);
                        loops.forEach((loop) => {
                            gsap.to(loop, { timeScale: boost * direction, duration: 0.2, overwrite: true });
                            gsap.to(loop, { timeScale: direction, duration: 1.2, delay: 0.2, ease: "power2.out" });
                        });
                    },
                });

                // Slight skew while moving fast
                const skewTo = gsap.quickTo(root.current, "skewY", { duration: 0.5, ease: "power3.out" });
                const skewTrigger = ScrollTrigger.create({
                    trigger: root.current,
                    start: "top bottom",
                    end: "bottom top",
                    onUpdate: (self) => skewTo(gsap.utils.clamp(-4, 4, self.getVelocity() / -400)),
                });

                return () => {
                    st.kill();
                    skewTrigger.kill();
                };
            });
            return () => mm.revert();
        },
        { scope: root }
    );

    return (
        <section ref={root} className={styles.marquee} aria-label="Technologies">
            <Row words={marqueeWords} />
            <Row words={[...marqueeWords].reverse()} outline />
        </section>
    );
}
