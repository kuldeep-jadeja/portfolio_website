// Single source of truth for the home page content.
// Update this file to keep the portfolio in sync with LinkedIn.

export const profile = {
    firstName: "Kuldeepsinh",
    lastName: "Jadeja",
    role: "Full-Stack Engineer",
    currentCompany: "Meetanshi Technologies",
    location: "Ahmedabad, India",
    image: "/images/kuldeep-profile.webp",
    tagline: "Building high-performance e-commerce and AI-enabled web products.",
    intro: "React, Next.js & Node.js.",
    about:
        "I build production web apps for e-commerce and AI-enabled products. I've shipped modular React and Next.js front ends, secured APIs for 1,000+ active users, and lifted Lighthouse scores by 20–35 points. Lately I'm wiring LLM pipelines and local AI tooling into products people actually use.",
    availability: "Open to Full-Stack and React/Next.js roles — on-site, hybrid, or remote.",
    careerStart: "2022-04-01",
};

export const socials = [
    { label: "GitHub", href: "https://github.com/kuldeep-jadeja" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kuldeepsinh-jadeja-" },
    { label: "Medium", href: "https://medium.com/@kuldeepjadeja7" },
    { label: "Resume", href: "https://files.kuldeepjadeja.dev/files/Resume/kuldeepsinh_Resume.pdf" },
];

export const experience = [
    {
        company: "Meetanshi Technologies",
        role: "Full Stack Engineer",
        period: "Jul 2026 — Present",
        location: "Bhavnagar, India",
        highlights: [
            "Building responsive, high-performance React and Next.js (SSR/SSG) interfaces for e-commerce and a custom CRM.",
            "Bringing GraphQL/REST integration, JWT/RBAC auth and Lighthouse tuning into new client work.",
            "Improving Core Web Vitals with code splitting and lazy loading, and exploring AI/LLM integration in web tooling.",
        ],
        stack: ["React", "Next.js", "SSR/SSG", "GraphQL", "JWT/RBAC"],
    },
    {
        company: "Redlio Designs",
        role: "Full Stack Engineer",
        period: "Jul 2024 — Jul 2026",
        location: "Ahmedabad, India",
        logo: "/images/redlio.png",
        highlights: [
            "Built and maintained scalable React/Next.js web portals with modular architectures.",
            "Integrated GraphQL and RESTful APIs with JWT auth and RBAC, securing 1,000+ active users.",
            "Improved Lighthouse scores by 20–35 points across two production projects through lazy loading and code splitting.",
            "Translated Figma designs into accessible UIs with TailwindCSS, Framer Motion and React Query; took part in sprint planning and code reviews.",
        ],
        stack: ["Next.js", "React", "Node.js", "MongoDB", "GraphQL", "TailwindCSS", "Framer Motion", "React Query"],
    },
    {
        company: "Salecto India",
        role: "Frontend Developer",
        period: "Dec 2022 — Jun 2024",
        logo: "/images/salecto.png",
        highlights: [
            "Developed custom Magento themes and enhanced storefronts for European e-commerce brands.",
            "Built responsive UIs with HTML, SCSS and jQuery, working with design, backend and QA for pixel-perfect delivery.",
            "Improved SEO and performance across multiple storefronts and authored user guides and technical docs.",
        ],
        stack: ["Magento 2", "HTML", "SCSS", "jQuery", "SEO"],
    },
    {
        company: "Salecto India",
        role: "Trainee Frontend Developer",
        period: "Jun 2022 — Dec 2022",
        logo: "/images/salecto.png",
        highlights: [
            "Gained hands-on experience across the Magento ecosystem.",
            "Contributed to frontend components and wrote product manuals, API docs and internal developer tutorials.",
        ],
        stack: ["Magento 2", "Frontend", "Documentation"],
    },
    {
        company: "Aura Research & Technology Inc",
        role: "Solutions Consultant",
        period: "Apr 2022 — Jun 2022",
        highlights: [
            "Delivered product demos and technical walkthroughs to clients.",
            "Created business proposals, landing pages and marketing emails.",
        ],
        stack: ["Product demos", "Landing pages"],
    },
];

export const education = {
    school: "Marwadi University",
    degree: "Bachelor's Degree in Computer Science",
    period: "2019 — 2022",
};

export const skillGroups = [
    {
        title: "Frontend",
        items: ["React", "Next.js", "JavaScript", "TypeScript", "TailwindCSS", "Framer Motion", "React Query", "GSAP", "SCSS"],
    },
    {
        title: "Backend & APIs",
        items: ["Node.js", "Express.js", "MongoDB", "GraphQL", "RESTful APIs", "Redis", "BullMQ"],
    },
    {
        title: "Auth & Security",
        items: ["JWT", "RBAC", "ABAC"],
    },
    {
        title: "Performance",
        items: ["Lighthouse", "Core Web Vitals", "SSR / SSG", "Code splitting", "Lazy loading"],
    },
    {
        title: "AI & Tooling",
        items: ["LLM pipelines", "OpenRouter", "Whisper", "Local AI", "Python", "FastAPI", "FFmpeg"],
    },
    {
        title: "Commerce",
        items: ["Magento 2", "Storefront theming", "SEO", "jQuery"],
    },
];

export const marqueeWords = [
    "React",
    "Next.js",
    "Node.js",
    "GraphQL",
    "MongoDB",
    "TypeScript",
    "TailwindCSS",
    "JWT / RBAC",
    "Core Web Vitals",
    "LLM pipelines",
    "Magento 2",
];

export const projects = [
    {
        title: "Award Winning Slider",
        image: "/images/Award-winning-slider.webp",
        description:
            "A stunning, modern image carousel with synchronized text animations and smooth transitions. Built with vanilla JavaScript, jQuery, Slick Carousel, and GSAP animations.",
        stack: ["HTML5", "CSS3", "JavaScript", "jQuery", "Slick Carousel", "GSAP"],
        links: {
            live: "https://award-winning-slider.kuldeepjadeja.dev/",
            readme: "/readme/AwardWinningSlider",
            source: "https://github.com/kuldeep-jadeja/AwardWinningSlider",
        },
    },
    {
        title: "Self-Hosted File Server",
        image: "/images/file-server.webp",
        description:
            "A powerful and elegant Node.js file server powered by Express and Flmngr, with an intuitive web interface for all your file management needs.",
        stack: ["Node.js", "Express.js", "Flmngr", "Multer", "HTML5"],
        links: {
            live: "https://files.kuldeepjadeja.dev/file-server",
            readme: "/readme/clipper-file-server",
            source: "https://github.com/kuldeep-jadeja/clipper-file-server",
        },
    },
    {
        title: "Automated Twitch Clipper",
        image: "/images/clip-final.webp",
        description:
            "Detects viral Twitch moments, creates clips, manages a content library with AI-powered tools, and auto-posts to Instagram and YouTube by converting clips into Shorts format.",
        stack: ["Next.js", "Node.js", "Express.js", "MongoDB", "Redis", "BullMQ", "FFmpeg", "Twitch API", "OpenRouter API"],
        links: {},
        note: "Private for now — public release planned",
    },
    {
        title: "Python Background Remover",
        image: "/images/python_background_remover.webp",
        description:
            "Remove image backgrounds instantly with AI-powered precision. A FastAPI service built on Rembg and ONNX Runtime that delivers clean, professional cut-outs in seconds.",
        stack: ["Python", "FastAPI", "Rembg", "ONNX Runtime", "Pillow", "uvicorn"],
        links: {
            readme: "/readme/Image-Background-Remover",
            source: "https://github.com/kuldeep-jadeja/Image-Background-Remover",
        },
    },
];

export function yearsSince(dateString) {
    const start = new Date(dateString);
    const now = new Date();
    return Math.floor((now - start) / (365.25 * 24 * 60 * 60 * 1000));
}
