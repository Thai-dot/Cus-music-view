/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
