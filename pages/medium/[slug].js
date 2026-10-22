import Image from 'next/image';
import styles from '../../styles/MediumPageDetails.module.scss';
import Seo from '@/components/Seo';
import { PERSON_ID, SITE_URL, breadcrumbSchema, graph } from '@/lib/seo';

function createSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

function stripHtml(html) {
    if (!html) return '';
    const text = html
        .replace(/<figcaption[\s\S]*?<\/figcaption>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&#39;|&#x27;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/\s+/g, ' ')
        .trim();
    return text.length > 155 ? `${text.slice(0, 152).replace(/\s+\S*$/, '')}…` : text;
}

function extractThumbnail(html) {
    if (!html) return null;
    const match = html.match(/<img[^>]+src="([^">]+)"/i);
    return match ? match[1] : null;
}

export default function MediumPageDetail({ article }) {
    const path = `/medium/${article.slug}`;
    const description = stripHtml(article.description);
    const image = extractThumbnail(article.description) || "/og/medium.jpg";
    // rss2json returns "YYYY-MM-DD HH:mm:ss" in UTC
    const parsed = new Date(`${String(article.pubDate).replace(' ', 'T')}Z`);
    const published = Number.isNaN(parsed.getTime()) ? article.pubDate : parsed.toISOString();
    const jsonLd = graph(
        {
            "@type": "BlogPosting",
            "@id": `${SITE_URL}${path}#article`,
            headline: article.title,
            description,
            image: image.startsWith('http') ? image : `${SITE_URL}${image}`,
            author: { "@id": PERSON_ID, "@type": "Person", name: "Kuldeepsinh Jadeja", url: SITE_URL },
            publisher: { "@id": PERSON_ID },
            datePublished: published,
            dateModified: published,
            mainEntityOfPage: article.link,
            url: article.link,
            keywords: article.categories || [],
            inLanguage: "en",
            isAccessibleForFree: true,
        },
        breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Articles', path: '/medium' },
            { name: article.title, path },
        ])
    );

    return (
        <>
            {/* Medium is the original publisher, so the canonical points there to avoid duplicate content. */}
            <Seo
                title={`${article.title} – Kuldeepsinh Jadeja`}
                description={description}
                path={path}
                canonical={article.link}
                image={image}
                imageAlt={article.title}
                type="article"
                article={{ publishedTime: published, tags: article.categories }}
                jsonLd={jsonLd}
            />
            <div className={styles.container}>
                {article ? (
                    <div className={styles.contentWrapper} id="top">
                        <h1 className={styles.articleTitle}>{article.title}</h1>
                        <p className={styles.authorName}><strong>Author:</strong> {article.author}</p>
                        <p className={styles.publishDate}><strong>Published:</strong> {new Date(article.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <div className={styles.categories}>
                            <strong>Categories:</strong> {
                                article.categories && article.categories.length > 0 ? article.categories.map((category, index) => (
                                    <p key={index} className={styles.tags}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </p>
                                )) : 'None'
                            }
                        </div>
                        <div className={styles.content}>
                            <div dangerouslySetInnerHTML={{ __html: article.description }} />
                        </div>
                        <div className={styles.backToTopBtn}>
                            <a href="#top" title="Back to Top">
                                <Image src="/images/arrow-left.svg" alt="Back to Top" width={20} height={20} />
                            </a>
                        </div>
                        <div className={styles.readMoreLink}>
                            <a href={article.link} target="_blank" rel="noopener noreferrer">Read full article on Medium</a>
                            <div className={styles.arrowWrapper}>
                                <img src="/images/light-btn-arrow-right.svg" alt="" />
                                <img src="/images/light-btn-arrow-right.svg" alt="" />
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Article not found.</p>
                )}
            </div>
        </>
    );
}

const FEED_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@kuldeepjadeja7';

async function fetchArticles() {
    try {
        const res = await fetch(FEED_URL);
        if (!res.ok) return [];
        const data = await res.json();
        return data.items || [];
    } catch (err) {
        console.error('Medium feed fetch failed:', err);
        return [];
    }
}

export async function getStaticPaths() {
    const articles = await fetchArticles();

    const paths = articles.map((item) => ({
        params: {
            slug: createSlug(item.title),
        },
    }));

    return {
        paths,
        fallback: 'blocking',
    };
}

export async function getStaticProps({ params }) {
    const articles = await fetchArticles();

    const article = articles.find((item) => {
        return createSlug(item.title) === params.slug;
    });

    if (!article) {
        // Retry later in case the feed was temporarily unavailable
        return { notFound: true, revalidate: 600 };
    }

    article.slug = params.slug;

    return {
        props: {
            article,
        },
        revalidate: 3600, // refresh every hour
    };
}