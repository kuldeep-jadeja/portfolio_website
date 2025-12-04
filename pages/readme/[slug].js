import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import { useState } from 'react';
import styles from '../../styles/readmeDetail.module.scss';

export default function readmeSlug({ markdown }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (loading) return <p style={{ padding: 16 }}>Loading README…</p>;
    if (error) return <p style={{ padding: 16, color: 'red' }}>Error: {error}</p>;

    return (
        <div className={styles.mainWrapper}>
            <div className='markdown-body markdown-body-light'>
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>
            </div>
        </div>
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