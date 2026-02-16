import Image from 'next/image';
import styles from '../../styles/MediumPageDetails.module.scss';
import Head from 'next/head';

function createSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

function stripHtml(html) {
    if (!html) return '';
    return html.replace(/<[^>]+>/g, '').slice(0, 160);
}

function extractThumbnail(html) {
    if (!html) return null;
    const match = html.match(/<img[^>]+src="([^">]+)"/i);
    return match ? match[1] : null;
}

export default function MediumPageDetail({ article }) {
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": stripHtml(article.description),
        "image": extractThumbnail(article.description) || "https://kuldeepjadeja.dev/images/medium.webp",
        "author": {
            "@type": "Person",
            "name": "Kuldeep Jadeja",
            "url": "https://kuldeepjadeja.dev"
        },
        "publisher": {
            "@type": "Person",
            "name": "Kuldeepsinh Jadeja",
            "url": "https://kuldeepjadeja.dev"
        },
        "datePublished": article.pubDate,
        "dateModified": article.pubDate,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://kuldeepjadeja.dev/medium/${article.slug}`
        },
        "url": article.link,
        "articleSection": article.categories || [],
        "keywords": article.categories?.join(", ") || "",
        "inLanguage": "en-US",
        "isAccessibleForFree": true
    };

    return (
        <>
            <Head>
                <title>{article.title} | Kuldeep Jadeja</title>
                <link rel="canonical" href={`https://kuldeepjadeja.dev/medium/${article.slug}/`} />
                <meta name="description"
                    content={stripHtml(article.description)} />
                <meta name="image" content="/images/medium.webp" />
                <meta itemProp="name" content="Kuldeepsinh Jadeja - Software Engineer Portfolio" />
                <meta itemProp="description"
                    content={stripHtml(article.description)} />
                <meta itemProp="image" content="/images/medium.webp" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={article.title} />
                <meta name="twitter:description"
                    content={stripHtml(article.description)} />
                <meta name="twitter:site" content="@kuldeepjadeja" />
                <meta name="twitter:creator" content="@kuldeepjadeja" />
                <meta name="twitter:image:src" content="/images/medium.webp" />
                <meta name="keywords"
                    content="Kuldeep Jadeja, Software Engineer, React Developer, Medium,  Frontend Developer, JavaScript Developer, Portfolio" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <meta name="og:title" content={article.title} />
                <meta name="og:description"
                    content={stripHtml(article.description)} />
                <meta name="og:image" content="/images/medium.webp" />
                <meta name="og:url" content={`https://kuldeepjadeja.dev/medium/${article.slug}/`} />
                <meta name="og:site_name" content="Kuldeep Jadeja Portfolio" />
                <meta name="og:locale" content="en_US" />
                <meta name="og:type" content="article" />
                <link rel="shortcut icon" type="image/x-icon" href="images/favicon.png" />
                <link rel="apple-touch-icon-precomposed" href="images/favicon.png" />
                <meta name="title" property="og:title"
                    content={article.title} />
                <meta name="image" property="og:image" content="/images/medium.webp" />
                <meta name="author" content="Kuldeep Jadeja" />
                <link rel="icon" type="image/x-icon" href="images/favicon.ico" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(articleSchema),
                    }}
                />
            </Head>
            <div className={styles.container}>
                {article ? (
                    <div className={styles.contentWrapper} id="top">
                        <h2 className={styles.articleTitle}>{article.title}</h2>
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

export async function getStaticPaths() {
    const res = await fetch(
        'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@kuldeepjadeja7'
    );

    const data = await res.json();
    const articles = data.items || [];

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
    const res = await fetch(
        'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@kuldeepjadeja7'
    );

    const data = await res.json();

    const article = data.items.find((item) => {
        return createSlug(item.title) === params.slug;
    });

    if (!article) {
        return { notFound: true };
    }

    article.slug = params.slug;

    return {
        props: {
            article,
        },
        revalidate: 3600, // refresh every hour
    };
}