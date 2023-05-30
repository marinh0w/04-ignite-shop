/** @type {import('next').NextConfig} */
const nextConfig = {}

images: {
  domains: [
    'files.stripe.com'
  ]
}

module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 's3.amazonaws.com',
          port: '',
          pathname: '/my-bucket/**',
        },
      ],
    },
  };
