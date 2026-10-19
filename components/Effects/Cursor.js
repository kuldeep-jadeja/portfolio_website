import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import styles from "./Effects.module.scss";

const INTERACTIVE = "a, button, [data-cursor]";

// Dot + trailing ring. Only on fine pointers with motion allowed.
export default function Cursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        const canUse =
            window.matchMedia("(pointer: fine)").matches &&
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!canUse) return;

        const root = document.documentElement;
        root.classList.add("has-cursor");

        const dot = dotRef.current;
        const ring = ringRef.current;
        gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

        const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
        const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
        const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
        const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

        let visible = false;
        const onMove = (e) => {
            if (!visible) {
                visible = true;
                gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 });
            }
            dotX(e.clientX);
            dotY(e.clientY);
            ringX(e.clientX);
            ringY(e.clientY);
        };

        const onOver = (e) => {
            const target = e.target.closest(INTERACTIVE);
            if (!target) return;
            // data-cursor="fill" grows a solid ring that inverts what is beneath it
            const fill = target.getAttribute("data-cursor") === "fill";
            gsap.to(ring, {
                scale: fill ? 2.6 : 1.8,
                backgroundColor: fill ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
                duration: 0.35,
                ease: "power3.out",
            });
            gsap.to(dot, { scale: 0, duration: 0.2 });
        };

        const onOut = (e) => {
            const target = e.target.closest(INTERACTIVE);
            if (!target || target.contains(e.relatedTarget)) return;
            gsap.to(ring, { scale: 1, backgroundColor: "rgba(255,255,255,0)", duration: 0.35, ease: "power3.out" });
            gsap.to(dot, { scale: 1, duration: 0.2 });
        };

        const onLeaveWindow = () => {
            visible = false;
            gsap.to([dot, ring], { autoAlpha: 0, duration: 0.3 });
        };

        window.addEventListener("pointermove", onMove);
        document.addEventListener("pointerover", onOver);
        document.addEventListener("pointerout", onOut);
        document.documentElement.addEventListener("pointerleave", onLeaveWindow);

        return () => {
            root.classList.remove("has-cursor");
            window.removeEventListener("pointermove", onMove);
            document.removeEventListener("pointerover", onOver);
            document.removeEventListener("pointerout", onOut);
            document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className={styles.cursorDot} aria-hidden="true" />
            <div ref={ringRef} className={styles.cursorRing} aria-hidden="true" />
        </>
    );
}
