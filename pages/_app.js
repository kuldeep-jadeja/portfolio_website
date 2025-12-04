import styles from '../styles/github-markdown.css';
import "../styles/globals.scss";
import { ThemeProvider } from '../contexts/ThemeContext';
import Script from "next/script";
import 'lenis/dist/lenis.css'
import Lenis from 'lenis'
import { useEffect } from "react";
import MainWrapper from "@/components/MainWrapper/MainWrapper";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1,
      lerp: 0.05,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    return () => {
      lenis.destroy();
    }
  }, []);

  return (
    <>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-H9RNHSBV4Y" />
      <Script id="google-analytics">
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
