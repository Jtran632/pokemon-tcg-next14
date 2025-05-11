/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pokemontcg.io",
      },
    ],
  },
  allowlist: ["fs"],
};

module.exports = nextConfig;
// module.exports = nextConfig;
