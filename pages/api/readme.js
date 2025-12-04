// pages/api/readme.js

export default async function handler(req, res) {
    // You can optionally take owner/repo/branch from query params
    const {
        owner = 'kuldeep-jadeja',
        repo = 'your-repo-name',
        branch = 'main',
        path = 'README.md',
    } = req.query;

    const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            return res
                .status(response.status)
                .json({ error: `Failed to fetch README from GitHub`, status: response.status });
        }

        const markdown = await response.text();

        // Return markdown as JSON
        return res.status(200).json({ markdown });
    } catch (error) {
        console.error('Error fetching README:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
