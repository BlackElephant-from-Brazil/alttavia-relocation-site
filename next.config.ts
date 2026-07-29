import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.resolve(dirname),
  async rewrites() {
    return [{ source: '/favicon.ico', destination: '/icon.svg' }]
  },
  async redirects() {
    return [
      // Legacy WordPress URLs still known to Google — redirect to their current equivalents.
      { source: '/pt/lar', destination: '/pt', permanent: true },
      { source: '/contact', destination: '/en/contact', permanent: true },
      { source: '/relocation-services', destination: '/en/relocation-services', permanent: true },
      { source: '/pt/servicos-de-realocacao', destination: '/pt/relocation-services', permanent: true },
      { source: '/pt/blogue', destination: '/pt/blog', permanent: true },
      {
        source: '/pt/portugal-espanha-ou-malta-para-onde-se-mudar-em-2026',
        destination: '/blog/portugal-spain-or-malta-where-to-relocate-in-2026',
        permanent: true,
      },
    ]
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default nextConfig
