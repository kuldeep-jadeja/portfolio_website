import Image from 'next/image';
import styles from '../../styles/MediumPageDetails.module.scss';

export default function MediumPageDetail({ article }) {
    console.log(article.slug);

    return (
        <>
            <Head>
                <title>Medium - Kuldeepsinh Jadeja</title>
                <link rel="canonical" href={`https://kuldeepjadeja.dev/medium/${article.slug}/`} />
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
                <meta name="og:url" content={`https://kuldeepjadeja.dev/medium/${article.slug}/`} />
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
            <div className={styles.container}>
                {article ? (
                    <div className={styles.contentWrapper} id="#top">
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
                        <div className={styles.backToTopBtn} id="#top">
                            <a href="#top" title="Back to Top">
                                <Image src="/images/arrow-left.svg" alt="Back to Top" width={20} height={20} />
                            </a>
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
        </>
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