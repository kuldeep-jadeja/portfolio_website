import Head from "next/head";
import Hero from "@/components/Home/Hero";
import Marquee from "@/components/Home/Marquee";
import About from "@/components/Home/About";
import Experience from "@/components/Home/Experience";
import Skills from "@/components/Home/Skills";
import Projects from "@/components/Home/Projects";
import Outro from "@/components/Home/Outro";

export default function Home() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kuldeepsinh Jadeja",
    "url": "https://kuldeepjadeja.dev",
    "image": "https://kuldeepjadeja.dev/images/kuldeep-profile.webp",
    "jobTitle": "Full-Stack Engineer",
    "worksFor": { "@type": "Organization", "name": "Meetanshi Technologies" },
    "alumniOf": { "@type": "CollegeOrUniversity", "name": "Marwadi University" },
    "address": { "@type": "PostalAddress", "addressLocality": "Ahmedabad", "addressRegion": "Gujarat", "addressCountry": "IN" },
    "description":
      "Full-Stack Engineer building high-performance e-commerce and AI-enabled web products with React, Next.js and Node.js.",
    "sameAs": [
      "https://github.com/kuldeep-jadeja",
      "https://www.linkedin.com/in/kuldeepsinh-jadeja-",
      "https://medium.com/@kuldeepjadeja7",
      "https://kuldeepjadeja.dev"
    ],
    "knowsAbout": [
      "JavaScript",
      "React",
      "Next.js",
      "Node.js",
      "MongoDB",
      "Express.js",
      "GraphQL",
      "JWT",
      "Core Web Vitals",
      "LLM integration",
      "Frontend Development",
      "Full Stack Development"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Kuldeep Jadeja Portfolio",
    "url": "https://kuldeepjadeja.dev",
    "author": {
      "@type": "Person",
      "name": "Kuldeep Jadeja"
    }
  };

  return (
    <>
      <Head>
        <title>Kuldeepsinh Jadeja - Full-Stack Engineer</title>
        <link rel="canonical" href="https://kuldeepjadeja.dev/" />
        <meta name="description"
          content="Kuldeepsinh Jadeja is a Full-Stack Engineer in Ahmedabad, India, building high-performance e-commerce and AI-enabled web products with React, Next.js, Node.js and MongoDB." />
        <meta name="image" content="/images/Homepage.webp" />
        <meta itemProp="name" content="Kuldeepsinh Jadeja - Full-Stack Engineer" />
        <meta itemProp="description"
          content="Kuldeepsinh Jadeja is a Full-Stack Engineer in Ahmedabad, India, building high-performance e-commerce and AI-enabled web products with React, Next.js, Node.js and MongoDB." />
        <meta itemProp="image" content="/images/Homepage.webp" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Kuldeepsinh Jadeja - Full-Stack Engineer" />
        <meta name="twitter:description"
          content="Kuldeepsinh Jadeja is a Full-Stack Engineer in Ahmedabad, India, building high-performance e-commerce and AI-enabled web products with React, Next.js, Node.js and MongoDB." />
        <meta name="twitter:site" content="@kuldeepjadeja" />
        <meta name="twitter:creator" content="@kuldeepjadeja" />
        <meta name="twitter:image:src" content="/images/Homepage.webp" />
        <meta name="keywords"
          content="Kuldeep Jadeja, Kuldeepsinh Jadeja, Full-Stack Engineer, React Developer, Next.js Developer, Node.js Developer, Ahmedabad, Portfolio" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="og:title" content="Kuldeepsinh Jadeja - Full-Stack Engineer" />
        <meta name="og:description"
          content="Kuldeepsinh Jadeja is a Full-Stack Engineer in Ahmedabad, India, building high-performance e-commerce and AI-enabled web products with React, Next.js, Node.js and MongoDB." />
        <meta name="og:image" content="/images/Homepage.webp" />
        <meta name="og:url" content="https://kuldeepjadeja.dev/" />
        <meta name="og:site_name" content="Kuldeep Jadeja Portfolio" />
        <meta name="og:locale" content="en_US" />
        <meta name="og:type" content="article" />
        <link rel="shortcut icon" type="image/x-icon" href="images/favicon.png" />
        <link rel="apple-touch-icon-precomposed" href="images/favicon.png" />
        <meta name="title" property="og:title"
          content="Kuldeepsinh Jadeja - Full-Stack Engineer" />
        <meta name="image" property="og:image" content="/images/Homepage.webp" />
        <meta name="author" content="Kuldeep Jadeja" />
        <link rel="icon" type="image/x-icon" href="images/favicon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </Head>
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Outro />
    </>
  );
}
