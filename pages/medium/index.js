'use client';

import Image from 'next/image';
import styles from '../../styles/MediumPageList.module.scss';

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