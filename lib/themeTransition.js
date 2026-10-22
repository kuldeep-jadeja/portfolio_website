/**
 * Circular theme reveal, ported from Magic UI's AnimatedThemeToggler
 * (https://magicui.design/docs/components/animated-theme-toggler).
 *
 * The View Transitions API snapshots the page, `apply` switches the theme
 * synchronously inside the transition callback, and the live new view is then
 * revealed through a clip-path circle that grows from `origin` until it covers
 * the farthest viewport corner. The matching CSS lives in styles/globals.scss
 * ("Theme transition").
 *
 * Falls back to an instant switch (plus the body's colour fade) when the API is
 * missing or the user prefers reduced motion.
 */
export const THEME_TRANSITION_DURATION = 400;

// Coordinates are percentages of the snapshot reference box: Chrome renders
// absolute px clip-paths on ::view-transition-new(root) unscaled on fractional
// display scales for the first transition after load.
function circleClipPaths(cx, cy, maxRadius, width, height) {
    const at = `${(cx / width) * 100}% ${(cy / height) * 100}%`;
    // circle() percentage radii resolve against hypot(w, h) / sqrt(2).
    const radius = `${(maxRadius / (Math.hypot(width, height) / Math.SQRT2)) * 100}%`;
    return [`circle(0% at ${at})`, `circle(${radius} at ${at})`];
}

function prefersReducedMotion() {
    return (
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

/**
 * @param {() => void} apply  Switches the theme. Must update the DOM synchronously.
 * @param {{ origin?: Element | null, duration?: number }} [options]
 *   `origin` is the element the circle grows from; the viewport centre without one.
 */
export function runThemeTransition(apply, { origin, duration = THEME_TRANSITION_DURATION } = {}) {
    const root = document.documentElement;
    // One reveal at a time: a second click mid-animation is ignored.
    if (root.dataset.themeVt === "active") return;

    if (typeof document.startViewTransition !== "function" || prefersReducedMotion()) {
        apply();
        return;
    }

    // innerWidth/innerHeight (not visualViewport): the snapshot reference box
    // includes classic scrollbars.
    const width = window.innerWidth;
    const height = window.innerHeight;
    let x = width / 2;
    let y = height / 2;
    if (origin) {
        const rect = origin.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
    }
    const maxRadius = Math.hypot(Math.max(x, width - x), Math.max(y, height - y));
    const clipPath = circleClipPaths(x, y, maxRadius, width, height);

    root.dataset.themeVt = "active";
    root.style.setProperty("--theme-vt-duration", `${duration}ms`);
    // Pin the collapsed circle in CSS so Firefox does not paint the new theme
    // unclipped between the snapshot and the animation below starting.
    root.style.setProperty("--theme-vt-clip-from", clipPath[0]);

    let animation = null;
    const cleanup = () => {
        delete root.dataset.themeVt;
        root.style.removeProperty("--theme-vt-duration");
        root.style.removeProperty("--theme-vt-clip-from");
        animation?.cancel();
    };

    const transition = document.startViewTransition(apply);
    transition.finished.finally(cleanup).catch(() => {});
    transition.ready
        .then(() => {
            animation = root.animate(
                { clipPath },
                {
                    duration,
                    easing: "ease-in-out",
                    fill: "forwards",
                    pseudoElement: "::view-transition-new(root)",
                }
            );
        })
        .catch(() => {});
}
