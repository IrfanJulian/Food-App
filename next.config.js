/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    URL_API: process.env.API_KEY
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}

module.exports = nextConfig
