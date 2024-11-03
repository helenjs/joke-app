import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    i18n: {
        locales: ['en', 'de', 'fr', 'es'],
        defaultLocale: 'en',
        localeDetection: false,
    },
    trailingSlash: true,
};

export default nextConfig;
