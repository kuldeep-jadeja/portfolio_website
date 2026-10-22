import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// Pulls its child toward the pointer while hovered, then springs back.
export default function Magnetic({ children, strength = 0.35, className }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (
            !el ||
            !window.matchMedia("(pointer: fine)").matches ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        // Both tweens use overwrite: "auto" and start from the live position, so
        // re-entering mid-release grabs the element where it is instead of
        // fighting the elastic return.
        const onMove = (e) => {
            const rect = el.getBoundingClientRect();
            gsap.to(el, {
                x: (e.clientX - (rect.left + rect.width / 2)) * strength,
                y: (e.clientY - (rect.top + rect.height / 2)) * strength,
                duration: 0.6,
                ease: "power3.out",
                overwrite: "auto",
            });
        };
        const onLeave = () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)", overwrite: "auto" });
        };

        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        return () => {
            el.removeEventListener("pointermove", onMove);
            el.removeEventListener("pointerleave", onLeave);
        };
    }, [strength]);

    return (
        <div ref={ref} className={className} style={{ display: "inline-block" }}>
            {children}
        </div>
    );
}
