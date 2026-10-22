import Seo from "@/components/Seo";
import { SITE_URL, PERSON_ID, WEBSITE_ID, personSchema, websiteSchema, graph } from "@/lib/seo";
import { projects } from "@/lib/portfolioData";
import Hero from "@/components/Home/Hero";
import Marquee from "@/components/Home/Marquee";
import About from "@/components/Home/About";
import Experience from "@/components/Home/Experience";
import Skills from "@/components/Home/Skills";
import Projects from "@/components/Home/Projects";
import Outro from "@/components/Home/Outro";

const DESCRIPTION =
  "Kuldeepsinh Jadeja is a Full-Stack Engineer at Meetanshi Technologies building fast e-commerce and AI-enabled web apps with React, Next.js and Node.js.";

const jsonLd = graph(
  websiteSchema,
  personSchema,
  {
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    url: `${SITE_URL}/`,
    name: "Kuldeepsinh Jadeja – Full-Stack Engineer (React, Next.js)",
    description: DESCRIPTION,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
    inLanguage: "en",
  },
  {
    "@type": "ItemList",
    "@id": `${SITE_URL}/#projects`,
    name: "Projects by Kuldeepsinh Jadeja",
    itemListElement: projects.map((project, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareSourceCode",
        name: project.title,
        description: project.description,
        programmingLanguage: project.stack,
        author: { "@id": PERSON_ID },
        ...(project.links.source && { codeRepository: project.links.source }),
        ...(project.links.live && { url: project.links.live }),
      },
    })),
  }
);

export default function Home() {
  return (
    <>
      <Seo
        title="Kuldeepsinh Jadeja – Full-Stack Engineer (React, Next.js)"
        description={DESCRIPTION}
        socialDescription="Full-Stack Engineer at Meetanshi Technologies building fast e-commerce and AI web apps with React, Next.js and Node.js."
        path="/"
        type="profile"
        imageAlt="Kuldeepsinh Jadeja, Full-Stack Engineer at Meetanshi Technologies"
        jsonLd={jsonLd}
      />
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
