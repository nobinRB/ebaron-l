/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'res.cloudinary.com',
      'images.unsplash.com',
      'ui-avatars.com',  // Added this domain for placeholder avatars
      // Add other image domains as needed
    ],
  },
  experimental: {
    appDir: true
  },
  typescript: {
    ignoreBuildErrors: true,  // 🚨 Use only for debugging
  },
};

export default nextConfig;
