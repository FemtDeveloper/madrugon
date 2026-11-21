/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 only allows q=75 by default; the app uses quality={100} in a few places
    qualities: [75, 100],
    // Tailor to our layout: common breakpoints for hero and grid images
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536],
    imageSizes: [64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hzkxzvmxjrwshjeducza.supabase.co",
      },
      // Firebase Storage download URLs
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/**",
      },
      // Public bucket URLs (if used)
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
