// Keep in sync with REPOS in pages/readme/[slug].js
const repos = [
    'AwardWinningSlider',
    'clipper-file-server',
    'portfolio_website',
    'Image-Background-Remover',
];

// Crawlers for AI search and assistants. Allowed explicitly so the portfolio
// can be cited in ChatGPT, Claude, Perplexity, Gemini and Copilot answers.
const aiCrawlers = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-SearchBot',
    'Claude-User',
    'PerplexityBot',
    'Perplexity-User',
    'Google-Extended',
    'Applebot-Extended',
    'Bingbot',
    'CCBot',
];

// Same resolution as SITE_URL in lib/seo.js
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://kuldeep-jadeja.vercel.app').replace(/\/$/, '');

module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    // Medium article pages are canonicalised to medium.com, so they stay out of the sitemap.
    exclude: ['/api/*', '/medium/*'],
    transform: async (config, path) => ({
        loc: path,
        changefreq: path === '/' ? 'weekly' : 'monthly',
        priority: path === '/' ? 1.0 : path.split('/').length > 2 ? 0.6 : 0.8,
        lastmod: new Date().toISOString(),
    }),
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/', disallow: ['/api/'] },
            ...aiCrawlers.map((userAgent) => ({ userAgent, allow: '/', disallow: ['/api/'] })),
        ],
    },

    additionalPaths: async (config) => {
        const result = [
            config.transform(config, '/readme'),
            config.transform(config, '/medium'),
            ...repos.map((repo) => config.transform(config, `/readme/${repo}`)),
        ];
        return Promise.all(result);
    },
};
