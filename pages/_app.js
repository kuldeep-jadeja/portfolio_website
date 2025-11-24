import "../styles/globals.scss";
import { ThemeProvider } from '../contexts/ThemeContext';
import Script from "next/script";

export default function App({ Component, pageProps }) {
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
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
