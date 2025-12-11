import { FileBadge, Github, Home, LibraryBig } from "lucide-react";
import styles from "./Dock.module.scss";
import { cloneElement, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const defaultItems = [
    { id: 'home', icon: <Home />, label: 'Home', href: "/" },
    { id: 'github', icon: <Github />, label: 'Github', href: "https://github.com/kuldeep-jadeja/", target: "_blank" },
    { id: 'resume', icon: <FileBadge />, label: 'Resume', href: "https://files.kuldeepjadeja.dev/files/Resume/kuldeepsinh_Resume.pdf", target: "_blank" },
    { id: 'readme', icon: <LibraryBig />, label: 'Readme', href: "/readme" },
];

export default function Dock({
    items = defaultItems,
    defaultActiveIndex = 0,
    onTabChange,
    iconClassName
}) {
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
    const [ready, setReady] = useState(false);

    const itemRefs = useRef([]);
    const limelightRef = useRef(null);

    // Sync activeIndex with current route
    useEffect(() => {
        const currentIndex = items.findIndex(item => item.href === router.pathname);
        if (currentIndex !== -1) {
            setActiveIndex(currentIndex);
        } else {
            setActiveIndex(defaultItems.length - 1); // Default to last item if no match
        }
    }, [router.pathname, items]);

    useLayoutEffect(() => {
        if (!items.length) return;

        const active = itemRefs.current[activeIndex];
        const limelight = limelightRef.current;

        if (active && limelight) {
            const left =
                active.offsetLeft + active.offsetWidth / 2 - limelight.offsetWidth / 2;

            limelight.style.left = `${left}px`;

            if (!ready) {
                const timer = setTimeout(() => setReady(true), 50);
                return () => clearTimeout(timer);
            }
        }
    }, [activeIndex, ready, items]);

    const handleClick = (idx, item, extra) => {
        if (item.target === "_blank") {
            extra && extra();
        } else {
            setActiveIndex(idx);
            onTabChange && onTabChange(idx);
            extra && extra();
        }
    };

    return (
        <nav className={styles.nav}>
            {items.map((item, index) => (
                <Link
                    key={item.id}
                    href={item.href || '#'}
                    ref={(el) => (itemRefs.current[index] = el)}
                    className={styles.navItem}
                    title={item.label}
                    onClick={() => handleClick(index, item, item.onClick)}
                    aria-label={item.label}
                    target={item.target}
                    rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                >
                    {cloneElement(item.icon, {
                        className: `${styles.icon} ${activeIndex === index ? styles.iconActive : styles.iconInactive}${item.icon.props.className ? ` ${item.icon.props.className}` : ''}${iconClassName ? ` ${iconClassName}` : ''}`
                    })}
                </Link>
            ))}

            <div
                ref={limelightRef}
                className={`${styles.limelight}${ready ? ` ${styles.limelightReady}` : ''}`}
            >
                <div className={`${styles.glow} ${ready ? styles.glowActive : ''}`}></div>
            </div>
        </nav>
    );
}
