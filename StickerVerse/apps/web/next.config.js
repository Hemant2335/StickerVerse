/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/dri5u2nqb/image/upload/**',
          },
        ],
      },
}

module.exports = nextConfig
