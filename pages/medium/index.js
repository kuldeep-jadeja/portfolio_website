'use client';

import Image from 'next/image';
import styles from '../../styles/MediumPageList.module.scss';
import Head from 'next/head';

export function extractThumbnail(html) {
    if (!html) return null;
    const match = html.match(/<img[^>]+src="([^">]+)"/i);
    if (!match) return null;
    return match[1].replace('/max/1024/', '/max/600/');
}

export function createSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export default function MediumPageList({ articles }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <>
            <Head>
                <title>Medium - Kuldeepsinh Jadeja</title>
                <link rel="canonical" href="https://kuldeepjadeja.dev/medium" />
                <meta name="description"
                    content="This is the Medium page for Kuldeepsinh Jadeja's portfolio website. It provides an overview of the Medium articles and instructions for navigating and understanding the content." />
                <meta name="image" content="/images/medium.webp" />
                <meta itemProp="name" content="Kuldeepsinh Jadeja - Software Engineer Portfolio" />
                <meta itemProp="description"
                    content="This is the Medium page for Kuldeepsinh Jadeja's portfolio website. It provides an overview of the Medium articles and instructions for navigating and understanding the content." />
                <meta itemProp="image" content="/images/medium.webp" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Medium - Kuldeepsinh Jadeja Portfolio" />
                <meta name="twitter:description"
                    content="This is the Medium page for Kuldeepsinh Jadeja's portfolio website. It provides an overview of the Medium articles and instructions for navigating and understanding the content." />
                <meta name="twitter:site" content="@kuldeepjadeja" />
                <meta name="twitter:creator" content="@kuldeepjadeja" />
                <meta name="twitter:image:src" content="/images/medium.webp" />
                <meta name="keywords"
                    content="Kuldeep Jadeja, Software Engineer, React Developer, Medium,  Frontend Developer, JavaScript Developer, Portfolio" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <meta name="og:title" content="Medium - Kuldeepsinh Jadeja Portfolio" />
                <meta name="og:description"
                    content="This is the Medium page for Kuldeepsinh Jadeja's portfolio website. It provides an overview of the Medium articles and instructions for navigating and understanding the content." />
                <meta name="og:image" content="/images/medium.webp" />
                <meta name="og:url" content="https://kuldeepjadeja.dev/medium" />
                <meta name="og:site_name" content="Kuldeep Jadeja Portfolio" />
                <meta name="og:locale" content="en_US" />
                <meta name="og:type" content="article" />
                <link rel="shortcut icon" type="image/x-icon" href="images/favicon.png" />
                <link rel="apple-touch-icon-precomposed" href="images/favicon.png" />
                <meta name="title" property="og:title"
                    content="Medium - Kuldeepsinh Jadeja Portfolio" />
                <meta name="image" property="og:image" content="/images/medium.webp" />
                <meta name="author" content="Kuldeep Jadeja" />
                <link rel="icon" type="image/x-icon" href="images/favicon.ico" />
            </Head>
            <main className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.pageTitle}>Medium Articles</h1>
                </header>

                <section className={styles.articlesGrid}>
                    {articles.map((article) => (
                        <article key={article.guid} className={styles.articleItem}>
                            <a href={`/medium/${createSlug(article.title)}`} className={styles.articleLink}>
                                <div className={styles.imageWrapper}>
                                    {extractThumbnail(article.description) && (
                                        <Image
                                            src={extractThumbnail(article.description) || "https://fakeimg.pl/600x400/ff0000/?text=Issue_From_Medium&font=lobster"}
                                            alt={article.title}
                                            width={800}
                                            height={300}
                                            className={styles.articleImage}
                                        />
                                    )}
                                </div>
                            </a>
                            <div className={styles.content}>
                                <time className={styles.date}>{formatDate(article.pubDate)}</time>
                                <a href={`/medium/${createSlug(article.title)}`} className={styles.articleLink}>
                                    <h2 className={styles.title}>{article.title}</h2>
                                </a>
                                <a href={`/medium/${createSlug(article.title)}`} className={styles.articleLink}>
                                    <span className={styles.readMore}>Read article</span>
                                    <div className={styles.arrowWrapper}>
                                        <img src="./images/light-btn-arrow-right.svg" />
                                        <img src="./images/light-btn-arrow-right.svg" />
                                    </div>
                                </a>
                            </div>
                        </article>
                    ))}
                </section>
            </main>
        </>
    );
}

export async function getServerSideProps() {
    try {
        const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@kuldeepjadeja7');
        const data = await res.json();
        return {
            props: {
                articles: data.items || [],
            },
        };
    } catch (error) {
        console.error('Failed to fetch articles:', error);
        return {
            props: {
                articles: [],
            },
        };
    }
}