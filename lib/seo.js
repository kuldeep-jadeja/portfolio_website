// Site-wide SEO constants and JSON-LD builders.
// Keep entity data here so every page describes the same Person and WebSite.
import { profile, socials, education } from "@/lib/portfolioData";

export const SITE_URL = "https://kuldeepjadeja.dev";
export const SITE_NAME = "Kuldeepsinh Jadeja";
export const TWITTER_HANDLE = "@kuldeepjadeja";
export const DEFAULT_OG_IMAGE = "/og/home.jpg";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const EMPLOYER_ID = "https://meetanshi.com/#organization";

export function absoluteUrl(path = "/") {
    if (/^https?:\/\//.test(path)) return path;
    return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

export const employer = {
    "@type": "Organization",
    "@id": EMPLOYER_ID,
    name: "Meetanshi Technologies",
    url: "https://meetanshi.com",
    logo: absoluteUrl("/images/meetanshi.png"),
    sameAs: [
        "https://www.linkedin.com/company/meetanshi/",
        "https://x.com/MeetanshiInc",
        "https://github.com/MeetanshiInc",
    ],
};

export const personSchema = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: `${profile.firstName} ${profile.lastName}`,
    alternateName: "Kuldeep Jadeja",
    givenName: profile.firstName,
    familyName: profile.lastName,
    url: `${SITE_URL}/`,
    image: absoluteUrl(profile.image),
    jobTitle: profile.role,
    description:
        "Full-Stack Engineer at Meetanshi Technologies building high-performance e-commerce and AI-enabled web products with React, Next.js and Node.js.",
    worksFor: employer,
    alumniOf: {
        "@type": "CollegeOrUniversity",
        name: education.school,
    },
    address: {
        "@type": "PostalAddress",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        addressCountry: "IN",
    },
    sameAs: socials.filter((s) => s.label !== "Resume").map((s) => s.href),
    knowsAbout: [
        "React",
        "Next.js",
        "Node.js",
        "JavaScript",
        "TypeScript",
        "MongoDB",
        "GraphQL",
        "REST APIs",
        "JWT authentication",
        "Role-based access control",
        "Core Web Vitals",
        "Technical SEO",
        "Magento 2",
        "E-commerce development",
        "LLM integration",
    ],
};

export const websiteSchema = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    alternateName: "Kuldeep Jadeja Portfolio",
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
};

export function breadcrumbSchema(items) {
    return {
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: absoluteUrl(item.path),
        })),
    };
}

// Wrap one or more nodes in a single @graph document.
export function graph(...nodes) {
    return { "@context": "https://schema.org", "@graph": nodes.flat().filter(Boolean) };
}
