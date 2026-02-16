const fetch = require('node-fetch');

const repos = [
    'AwardWinningSlider',
    'clipper-file-server',
    'portfolio_website',
    'Image-background-remover',
];

function createSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

module.exports = {
    siteUrl: 'https://kuldeepjadeja.dev',
    generateRobotsTxt: true,

    additionalPaths: async (config) => {
        const result = [];

        // README index
        result.push(await config.transform(config, '/readme'));

        // README dynamic pages
        repos.forEach((repo) => {
            result.push(config.transform(config, `/readme/${repo}`));
        });

        // Medium index page
        result.push(await config.transform(config, '/medium'));

        // Fetch Medium RSS articles
        try {
            const res = await fetch(
                'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@kuldeepjadeja7'
            );

            const data = await res.json();
            const articles = data.items || [];

            articles.forEach((article) => {
                const slug = createSlug(article.title);
                result.push(config.transform(config, `/medium/${slug}`));
            });
        } catch (err) {
            console.error('Medium sitemap fetch failed:', err);
        }

        return Promise.all(result);
    },
};
