import styles from '../../styles/MediumPageDetails.module.scss';

export default function MediumPageDetail({ article }) {
    return (
        <div className={styles.container}>
            {article ? (
                <div className={styles.contentWrapper}>
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
                    <div className={styles.readMoreLink}>
                        <a href={article.link} target="_blank" rel="noopener noreferrer">Read full article on Medium</a>
                        <div className={styles.arrowWrapper}>
                            <img src="/images/light-btn-arrow-right.svg" />
                            <img src="/images/light-btn-arrow-right.svg" />
                        </div>
                    </div>
                </div>
            ) : (
                <p>Article not found.</p>
            )}
        </div>
    );
}

export async function getServerSideProps(context) {
    const { slug } = context.params;

    const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@kuldeepjadeja7');
    const data = await res.json();

    const article = data.items.find(item => {
        const articleSlug = item.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        return articleSlug === slug;
    });

    return {
        props: {
            article: article || null,
        },
    };
}