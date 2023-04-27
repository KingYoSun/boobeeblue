const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  env: {
    BGS_BASE_URL: process.env.BGS_BASE_URL,
    BSKY_AGENT_HOSTS: process.env.BSKY_AGENT_HOSTS,
    BGS_SEARCH_ENDPOINT: process.env.BGS_SEARCH_ENDPOINT,
  },
};

module.exports = nextConfig;
