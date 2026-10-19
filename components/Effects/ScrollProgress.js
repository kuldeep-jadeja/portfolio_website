import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import styles from "./Effects.module.scss";

export default function ScrollProgress() {
    const barRef = useRef(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add(MOTION_OK, () => {
            gsap.fromTo(
                barRef.current,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: document.documentElement,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.3,
                        invalidateOnRefresh: true,
                    },
                }
            );
        });
        return () => mm.revert();
    });

    return <div ref={barRef} className={styles.progress} aria-hidden="true" />;
}
