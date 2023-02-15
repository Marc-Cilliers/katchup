/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static-cdn.jtvnw.net",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "clips-media-assets2.twitch.tv",
      },
      {
        protocol: "https",
        hostname: "clips-media-assets.twitch.tv",
      },
    ],
  },
};

module.exports = nextConfig;
