/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    serverRuntimeConfig: {
        API_WEATHER_KEY: process.env.API_WEATHER_KEY,
        API_IMAGE_KEY: process.env.API_IMAGE_KEY,
    },
    publicRuntimeConfig: {
        staticFolder: '/static',
    },
}

module.exports = nextConfig
