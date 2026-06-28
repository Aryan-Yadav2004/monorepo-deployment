/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prisma 7's TypeScript-native client uses a WASM query compiler.
  // Next.js/webpack cannot bundle .mjs/.wasm files from Prisma's runtime,
  // so we tell Next.js to treat them as external (resolved at runtime, not bundled).
  serverExternalPackages: ["@prisma/client", "prisma", "db"],

  webpack: (config) => {
    // Prevent webpack from trying to bundle Prisma's native/wasm runtime files
    config.externals = [
      ...(config.externals || []),
      "@prisma/client",
      "prisma",
    ];
    return config;
  },
};

export default nextConfig;

