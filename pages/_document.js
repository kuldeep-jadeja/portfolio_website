import { Html, Head, Main, NextScript } from "next/document";

// Runs before paint: applies the saved theme (no light-mode flash) and flags
// that JS + motion are available so the hero can start hidden.
const bootScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.setAttribute('data-theme',t);if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('js-motion')}if(sessionStorage.getItem('introSeen')){d.classList.add('intro-seen')}}catch(e){}})();`;

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head />
      <body>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
