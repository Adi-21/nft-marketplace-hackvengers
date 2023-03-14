/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['https://ipfs.infura.io:5001'],
 },
}

module.exports = nextConfig
