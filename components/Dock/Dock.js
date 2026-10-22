import { FileBadge, Github, Home, LibraryBig, MessageCircleHeart, NotebookTabs } from "lucide-react";
import styles from "./Dock.module.scss";
import { cloneElement, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const defaultItems = [
    { id: 'home', icon: <Home />, label: 'Home', href: "/" },
    { id: 'github', icon: <Github />, label: 'Github', href: "https://github.com/kuldeep-jadeja/", target: "_blank" },
    { id: 'resume', icon: <FileBadge />, label: 'Resume', href: "https://files.kuldeepjadeja.dev/files/Resume/kuldeepsinh_Resume.pdf", target: "_blank" },
    { id: 'readme', icon: <LibraryBig />, label: 'Readme', href: "/readme" },
    { id: 'medium', icon: <NotebookTabs />, label: 'Medium', href: "/medium" },
    {id:'contact', icon: <MessageCircleHeart />, label: 'Contact', href: "/contact" }
];

function indexForPath(items, pathname, fallback) {
    const currentIndex = items.findIndex(item => {
        if (!item.href || item.href === '#') return false;

        // For external links, exact match only
        if (item.target === "_blank") {
            return item.href === pathname;
        }

        // For internal links, check if current path starts with item href
        // This handles both exact matches and nested routes
        return pathname === item.href || pathname.startsWith(item.href + '/');
    });

    if (currentIndex !== -1) return currentIndex;
    // Default to last item if no match
    return pathname ? items.length - 1 : fallback;
}

export default function Dock({
    items = defaultItems,
    defaultActiveIndex = 0,
    onTabChange,
    iconClassName
}) {
    const router = useRouter();
    // Seeded from the route so the server-rendered HTML already marks the right tab
    const [activeIndex, setActiveIndex] = useState(() => indexForPath(items, router.pathname, defaultActiveIndex));
    const [ready, setReady] = useState(false);

    const itemRefs = useRef([]);
    const limelightRef = useRef(null);

    // Sync activeIndex with current route
    useEffect(() => {
        setActiveIndex(indexForPath(items, router.pathname, defaultActiveIndex));
    }, [router.pathname, items, defaultActiveIndex]);

    useLayoutEffect(() => {
        if (!items.length) return;

        const active = itemRefs.current[activeIndex];
        const limelight = limelightRef.current;

        if (active && limelight) {
            const left =
                active.offsetLeft + active.offsetWidth / 2 - limelight.offsetWidth / 2;

            // transform, not `left`: composite-only, so it never re-lays out the dock
            limelight.style.transform = `translateX(${left}px)`;

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
