import { withContentlayer } from 'next-contentlayer'

/**
 * @type {import('next').NextConfig}
 */
const config = withContentlayer({
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  pageExtensions: ['js', 'ts', 'tsx', 'mdx'],
  images: {
    domains: ['cdn.glitch.com', 'www.icloud.com'],
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  async rewrites() {
    return [{ source: '/shortcuts', destination: '/bookmarks/shortcuts' }]
  },
})

export default config
