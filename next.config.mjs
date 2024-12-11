/** @type {import('next').NextConfig} */
import { configDotenv } from 'dotenv';
configDotenv();


const nextConfig = {
  images:{
    domains:['images.unsplash.com'],
    unoptimized:true
},
    env: {
        NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
      }, 
};

export default nextConfig;
