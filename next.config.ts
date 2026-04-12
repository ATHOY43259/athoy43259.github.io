/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Exclude Sanity Studio from static export
  exportPathMap: async function () {
    return {
      "/": { page: "/" },
    };
  },
};

module.exports = nextConfig;
