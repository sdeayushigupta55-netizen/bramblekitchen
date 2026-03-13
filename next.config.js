/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  output: "export",   // This creates static export
  images: {
    unoptimized: true, // required for static export
  },
};

module.exports = nextConfig;
