/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prisma 7's TypeScript-native client uses a WASM query compiler.
  // serverExternalPackages tells Next.js NOT to bundle these at build time
  // — they are resolved at runtime instead. Works with both webpack and Turbopack.
  serverExternalPackages: ["@prisma/client", "prisma", "db"],

  // Next.js 16 defaults to Turbopack. Declaring this silences the
  // "webpack config present but no turbopack config" hard error.
  turbopack: {},
};

export default nextConfig;
