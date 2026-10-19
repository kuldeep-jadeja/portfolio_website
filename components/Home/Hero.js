import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import Magnetic from "@/components/Effects/Magnetic";
import { profile } from "@/lib/portfolioData";
import styles from "./Hero.module.scss";

const BADGE_TEXT = "Full-stack engineer • React • Next.js • Node • ";
// One glyph per slot around the circle: spacing is identical in every browser and font
const BADGE_CHARS = [...BADGE_TEXT.toUpperCase()];

export default function Hero() {
    const root = useRef(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add(MOTION_OK, () => {
                const q = gsap.utils.selector(root);
                const curtain = q(`.${styles.curtain}`)[0];
                const counter = q(`.${styles.counter}`)[0];

                let firstVisit = true;
                try {
                    firstVisit = !sessionStorage.getItem("introSeen");
                    sessionStorage.setItem("introSeen", "1");
                } catch (e) {}

                const split = SplitText.create(q(`.${styles.word}`), {
                    type: "chars",
                    mask: "chars",
                });

                const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

                if (firstVisit) {
                    const count = { value: 0 };
                    tl.to(count, {
                        value: 100,
                        duration: 1,
                        ease: "power2.inOut",
                        onUpdate: () => {
                            counter.textContent = String(Math.round(count.value)).padStart(3, "0");
                        },
                    }).to(curtain, { yPercent: -100, duration: 1, ease: "expo.inOut" }, "+=0.1");
                } else {
                    gsap.set(curtain, { display: "none" });
                }

                tl.set(q("[data-hero-reveal]"), { visibility: "visible" }, firstVisit ? "-=0.45" : 0)
                    .from(split.chars, { yPercent: 115, rotate: 8, duration: 1.3, stagger: 0.035 }, "<")
                    .from(
                        q(`.${styles.portrait}`),
                        { scale: 0, rotate: -120, duration: 1.4, ease: "back.out(1.4)" },
                        "<0.35"
                    )
                    .from(
                        q(`.${styles.fadeUp}`),
                        { y: 28, autoAlpha: 0, duration: 1, stagger: 0.08 },
                        "<0.2"
                    )
                    .from(q(`.${styles.scrollCue}`), { autoAlpha: 0, duration: 1 }, "<0.4");

                // Scroll-linked exit: the two name lines drift apart and the hero recedes
                const exit = {
                    trigger: root.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                };
                gsap.to(q(`.${styles.lineOne}`), { xPercent: -12, ease: "none", scrollTrigger: exit });
                gsap.to(q(`.${styles.lineTwo}`), { xPercent: 10, ease: "none", scrollTrigger: exit });
                gsap.to(q(`.${styles.inner}`), { yPercent: 18, opacity: 0.15, ease: "none", scrollTrigger: exit });

                // Glow follows the pointer
                const glow = q(`.${styles.glow}`)[0];
                const xTo = gsap.quickTo(glow, "x", { duration: 1.2, ease: "power3.out" });
                const yTo = gsap.quickTo(glow, "y", { duration: 1.2, ease: "power3.out" });
                const onMove = (e) => {
                    const rect = root.current.getBoundingClientRect();
                    xTo(e.clientX - rect.left - rect.width / 2);
                    yTo(e.clientY - rect.top - rect.height / 2);
                };
                root.current.addEventListener("pointermove", onMove);

                return () => {
                    root.current?.removeEventListener("pointermove", onMove);
                    split.revert();
                };
            });

            return () => mm.revert();
        },
        { scope: root }
    );

    return (
        <section ref={root} className={styles.hero} id="top">
            <div className={styles.curtain} aria-hidden="true">
                <span className={styles.curtainName}>
                    {profile.firstName} {profile.lastName}
                </span>
                <span className={styles.counter}>000</span>
            </div>

            <div className={styles.glow} aria-hidden="true" />
            <div className={styles.grid} aria-hidden="true" />

            <div className={styles.inner} data-hero-reveal>
                <div className={`${styles.topRow} ${styles.fadeUp}`}>
                    <p className={styles.kicker}>
                        <span className={styles.statusDot} />
                        {profile.role} @ {profile.currentCompany}
                    </p>
                    <p className={styles.kicker}>Based in {profile.location}</p>
                </div>

                <h1 className={styles.name}>
                    <span className="sr-only">
                        {profile.firstName} {profile.lastName}
                    </span>
                    <span className={`${styles.line} ${styles.lineOne}`} aria-hidden="true">
                        <span className={styles.word}>{profile.firstName}</span>
                    </span>
                    <span className={`${styles.line} ${styles.lineTwo}`} aria-hidden="true">
                        <span className={styles.portrait}>
                            <svg className={styles.badge} viewBox="0 0 200 200">
                                {BADGE_CHARS.map((char, i) => (
                                    <text
                                        key={i}
                                        x="100"
                                        y="24"
                                        textAnchor="middle"
                                        transform={`rotate(${(i * 360) / BADGE_CHARS.length} 100 100)`}
                                    >
                                        {char}
                                    </text>
                                ))}
                            </svg>
                            <span className={styles.photo}>
                                <Image
                                    src={profile.image}
                                    alt=""
                                    fill
                                    sizes="(max-width: 768px) 80px, 160px"
                                    priority
                                />
                            </span>
                        </span>
                        <span className={styles.word}>{profile.lastName}</span>
                    </span>
                </h1>

                <div className={styles.bottomRow}>
                    <p className={`${styles.lede} ${styles.fadeUp}`}>
                        {profile.tagline} <span className={styles.muted}>{profile.intro}</span>
                    </p>
                    <div className={`${styles.actions} ${styles.fadeUp}`}>
                        <Magnetic>
                            <a href="#work" className={styles.primaryBtn} data-cursor="fill">
                                View work <ArrowDown size={18} />
                            </a>
                        </Magnetic>
                        <Link href="/contact" className={styles.ghostBtn}>
                            Say hello <ArrowUpRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>

            <div className={styles.scrollCue} aria-hidden="true">
                <span>Scroll</span>
                <span className={styles.scrollLine} />
            </div>
        </section>
    );
}
