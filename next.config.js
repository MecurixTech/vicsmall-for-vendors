/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["s3-alpha-sig.figma.com", "utfs.io", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
