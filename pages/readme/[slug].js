import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import styles from '../../styles/readmeDetail.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Seo from '@/components/Seo';
import { PERSON_ID, SITE_URL, breadcrumbSchema, graph } from '@/lib/seo';

const REPO_META = {
    AwardWinningSlider: {
        name: 'Award Winning Slider',
        languages: ['JavaScript', 'jQuery', 'GSAP', 'CSS'],
    },
    'clipper-file-server': {
        name: 'Self-Hosted File Server',
        languages: ['JavaScript', 'Node.js', 'Express.js'],
    },
    portfolio_website: {
        name: 'Portfolio Website',
        languages: ['JavaScript', 'React', 'Next.js', 'SCSS'],
    },
    'Image-Background-Remover': {
        name: 'Python Background Remover',
        languages: ['Python', 'FastAPI'],
    },
};

function extractDescription(markdown, fallback) {
    if (!markdown) return fallback;
    const paragraph = markdown
        .replace(/<[^>]+>/g, ' ')
        .replace(/!\[.*?\]\(.*?\)/g, '')
        .replace(/\[(.*?)\]\(.*?\)/g, '$1')
        .split(/\n\s*\n/)
        .map((block) => block.replace(/[#>*`|]/g, '').replace(/\s+/g, ' ').trim())
        .find((block) => block.length > 60);
    if (!paragraph) return fallback;
    return paragraph.length > 155 ? `${paragraph.slice(0, 152).replace(/\s+\S*$/, '')}…` : paragraph;
}

export default function ReadmeSlug({ markdown, slug }) {
    const meta = REPO_META[slug] || { name: slug, languages: [] };
    const path = `/readme/${slug}`;
    const description = extractDescription(
        markdown,
        `${meta.name} by Kuldeepsinh Jadeja: setup, features and usage notes from the project README.`
    );
    const jsonLd = graph(
        {
            "@type": "SoftwareSourceCode",
            "@id": `${SITE_URL}${path}#code`,
            name: meta.name,
            description,
            codeRepository: `https://github.com/kuldeep-jadeja/${slug}`,
            url: `${SITE_URL}${path}`,
            author: { "@id": PERSON_ID, "@type": "Person", name: "Kuldeepsinh Jadeja" },
            programmingLanguage: meta.languages,
        },
        breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Readme', path: '/readme' },
            { name: meta.name, path },
        ])
    );
    return (
        <>
            <Seo
                title={`${meta.name} README – Kuldeepsinh Jadeja`}
                description={description}
                path={path}
                image="/og/readme.jpg"
                type="article"
                jsonLd={jsonLd}
            />
            <div className={styles.mainWrapper}>
                <Link className={styles.backBtn} href="/readme" >
                    <div className={styles.arrowWrapper}>
                        <Image src="/images/light-btn-arrow-right.svg" alt="Back Arrow" width={15} height={15} />
                        <Image src="/images/light-btn-arrow-right.svg" alt="Back Arrow" width={15} height={15} />
                    </div>
                    Back to Readme Listing
                </Link>
                <div className='markdown-body markdown-body-light' id='top'>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>
                </div>
                <div className={styles.backToTopBtn}>
                    <a href="#top" title="Back to Top">
                        <Image src="/images/arrow-left.svg" alt="Back to Top" width={20} height={20} />
                    </a>
                </div>
            </div>
        </>
    );
}

const REPOS = [
    'AwardWinningSlider',
    'clipper-file-server',
    'portfolio_website',
    'Image-Background-Remover',
];

export async function getStaticPaths() {
    const paths = REPOS.map((repo) => ({
        params: { slug: repo },
    }));

    return {
        paths,
        fallback: 'blocking',
    };
}

export async function getStaticProps({ params }) {
    const { slug } = params;

    const url = `https://raw.githubusercontent.com/kuldeep-jadeja/${slug}/main/README.md`;

    const response = await fetch(url);

    if (!response.ok) {
        return { notFound: true };
    }

    const markdown = await response.text();

    return {
        props: {
            markdown,
            slug,
        },
        revalidate: 86400, // refresh every 24 hours
    };
}