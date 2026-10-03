/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/favicon.ico",
        destination: "/asko-cafe-icon.png",
        permanent: true,
      },
      {
        source: "/apple-touch-icon.png",
        destination: "/asko-cafe-icon.png",
        permanent: true,
      },
    ];
  },
};
module.exports = nextConfig;
