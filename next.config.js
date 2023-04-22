const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  env: {
    BGS_BASE_URL: process.env.BGS_BASE_URL,
    BSKY_AGENT_HOSTS: process.env.BSKY_AGENT_HOSTS,
  },
};

module.exports = nextConfig;
