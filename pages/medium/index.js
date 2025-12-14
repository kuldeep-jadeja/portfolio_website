import styles from '../../styles/MediumPageList.module.scss';

export default function MediumPageList({ articles }) {
    console.log(articles);

    return (
        <div className={styles.mainWrapper}>
            <h1>Medium Articles</h1>
        </div>
    );
}

export async function getServerSideProps() {
    const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@kuldeepjadeja7');
    const data = await res.json();

    return {
        props: {
            articles: data.items,
        },
    };
}
