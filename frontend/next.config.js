/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "undici": false,
        "net": false,
        "tls": false,
        "fs": false,
        "dns": false,
      };
    }
    config.module.rules.push({
      test: /node_modules\/undici/,
      loader: 'ignore-loader',
    });
    return config;
  },
  transpilePackages: ['@firebase', 'firebase'],
};

module.exports = nextConfig; 