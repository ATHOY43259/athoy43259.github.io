/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,   // required for GitHub Pages routing
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
