/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'gratisography.com',
      },
      {
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

module.exports = nextConfig;
