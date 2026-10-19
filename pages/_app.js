import '../styles/github-markdown.css';
import "../styles/globals.scss";
import { ThemeProvider } from '../contexts/ThemeContext';
import Script from "next/script";
import 'lenis/dist/lenis.css'
import { useEffect } from "react";
import { useRouter } from "next/router";
import Lenis from "lenis";
import MainWrapper from "@/components/MainWrapper/MainWrapper";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Smooth scroll driven by the GSAP ticker so ScrollTrigger stays in sync
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, anchors: true });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // Reset scroll and recalculate triggers after client-side navigation
  useEffect(() => {
    const onRouteDone = () => {
      window.__lenis?.scrollTo(0, { immediate: true });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    router.events.on("routeChangeComplete", onRouteDone);
    return () => router.events.off("routeChangeComplete", onRouteDone);
  }, [router.events]);

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-H9RNHSBV4Y"
        strategy="lazyOnload"
      />

      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-H9RNHSBV4Y');
        `}
      </Script>
      <ThemeProvider>
        <MainWrapper>
          <Component {...pageProps} />
        </MainWrapper>
      </ThemeProvider>
    </>
  );
}
