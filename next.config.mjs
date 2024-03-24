/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hzkxzvmxjrwshjeducza.supabase.co",
      },
    ],
  },
};

export default nextConfig;
