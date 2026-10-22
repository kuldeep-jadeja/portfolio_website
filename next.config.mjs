/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  transpilePackages: [
    'react-markdown',
    'remark-gfm',
    'rehype-raw',
  ],
  async redirects() {
    return [
      {
        // Old lowercase slug; GitHub repo is Image-Background-Remover
        source: '/readme/Image-background-remover',
        destination: '/readme/Image-Background-Remover',
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'miro.medium.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-images-1.medium.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
