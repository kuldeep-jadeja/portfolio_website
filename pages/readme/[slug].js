import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import { useState } from 'react';
import styles from '../../styles/readmeDetail.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

export default function readmeSlug({ markdown }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (loading) return <p style={{ padding: 16 }}>Loading README…</p>;
    if (error) return <p style={{ padding: 16, color: 'red' }}>Error: {error}</p>;

    return (
        <>
            <Head>
                <title>Readme - Kuldeepsinh Jadeja Portfolio</title>
                <link rel="canonical" href="https://kuldeepjadeja.dev/readme" />
                <meta name="description"
                    content="This is the Readme page for Kuldeepsinh Jadeja's portfolio website. It provides an overview of the portfolio and instructions for navigating and understanding the content." />
                <meta name="image" content="/images/readme.webp" />
                <meta itemProp="name" content="Kuldeepsinh Jadeja - Software Engineer Portfolio" />
                <meta itemProp="description"
                    content="This is the Readme page for Kuldeepsinh Jadeja's portfolio website. It provides an overview of the portfolio and instructions for navigating and understanding the content." />
                <meta itemProp="image" content="/images/readme.webp" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Readme - Kuldeepsinh Jadeja Portfolio" />
                <meta name="twitter:description"
                    content="This is the Readme page for Kuldeepsinh Jadeja's portfolio website. It provides an overview of the portfolio and instructions for navigating and understanding the content." />
                <meta name="twitter:site" content="@kuldeepjadeja" />
                <meta name="twitter:creator" content="@kuldeepjadeja" />
                <meta name="twitter:image:src" content="/images/readme.webp" />
                <meta name="keywords"
                    content="Kuldeep Jadeja, Software Engineer, React Developer, Readme,  Frontend Developer, JavaScript Developer, Portfolio" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <meta name="og:title" content="Readme - Kuldeepsinh Jadeja Portfolio" />
                <meta name="og:description"
                    content="This is the Readme page for Kuldeepsinh Jadeja's portfolio website. It provides an overview of the portfolio and instructions for navigating and understanding the content." />
                <meta name="og:image" content="/images/readme.webp" />
                <meta name="og:url" content="https://kuldeepjadeja.dev/readme" />
                <meta name="og:site_name" content="Kuldeep Jadeja Portfolio" />
                <meta name="og:locale" content="en_US" />
                <meta name="og:type" content="article" />
                <link rel="shortcut icon" type="image/x-icon" href="images/favicon.png" />
                <link rel="apple-touch-icon-precomposed" href="images/favicon.png" />
                <meta name="title" property="og:title"
                    content="Readme - Kuldeepsinh Jadeja Portfolio" />
                <meta name="image" property="og:image" content="/images/readme.webp" />
                <meta name="author" content="Kuldeep Jadeja" />
                <link rel="icon" type="image/x-icon" href="images/favicon.ico" />
            </Head>
            <div className={styles.mainWrapper}>
                <Link className={styles.backBtn} href="/readme" >
                    <div className={styles.arrowWrapper}>
                        <Image src="/images/light-btn-arrow-right.svg" alt="Back Arrow" width={15} height={15} />
                        <Image src="/images/light-btn-arrow-right.svg" alt="Back Arrow" width={15} height={15} />
                    </div>
                    Back to Readme Listing
                </Link>
                <div className='markdown-body markdown-body-light' id='#top'>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>
                </div>
                <div className={styles.backToTopBtn} id="#top">
                    <a href="#top" title="Back to Top">
                        <Image src="/images/arrow-left.svg" alt="Back to Top" width={20} height={20} />
                    </a>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const data = {
        owner: 'kuldeep-jadeja',
        repo: context.params.slug,
        branch: 'main',
        path: 'README.md',
    };

    const url = `https://raw.githubusercontent.com/${data?.owner}/${data?.repo}/${data?.branch}/${data?.path}`;

    const response = await fetch(url);

    if (!response.ok) {
        return res
            .status(response.status)
            .json({ error: `Failed to fetch README from GitHub`, status: response.status });
    }

    const markdown = await response.text();

    return {
        props: {
            markdown
        }
    };
}