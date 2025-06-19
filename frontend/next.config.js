/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    forceSwcTransforms: false,
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  images: {
    domains: ['api.dicebear.com', 'firebasestorage.googleapis.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/**',
      },
    ],
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