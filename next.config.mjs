/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  // A static export has no image optimisation server, so images are served as-is.
  images: { unoptimized: true },
};

export default nextConfig;
