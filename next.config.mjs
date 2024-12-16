/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    NEXT_PUBLIC_LOCAL_API_URL: process.env.NEXT_PUBLIC_LOCAL_API_URL,
    NEXT_PUBLIC_DEPLOYED_API_URL: process.env.NEXT_PUBLIC_DEPLOYED_API_URL
  }
};

export default nextConfig;
