/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ['miro.medium.com', 'cdn-images-1.medium.com'],
  },
};

export default nextConfig;
