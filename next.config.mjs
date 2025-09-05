import { withContentCollections } from '@content-collections/next';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { createSecureHeaders } from 'next-secure-headers';

const bundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.BUNDLE_ANALYZER === 'true'
});

const svgLoader = {
  loader: '@svgr/webpack',
  options: {
    svgoConfig: {
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              removeViewBox: false // Preserve the viewBox attribute
            }
          }
        }
      ]
    }
  }
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: [svgLoader],
          as: '*.js'
        }
      }
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        port: '',
        pathname: '**',
        search: ''
      }
    ]
  },
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        locale: false,
        source: '/(.*)',
        headers: createSecureHeaders({
          frameGuard: 'deny',
          noopen: 'noopen',
          nosniff: 'nosniff',
          xssProtection: 'sanitize',
          forceHTTPSRedirect: [
            true,
            { maxAge: 60 * 60 * 24 * 360, includeSubDomains: true }
          ],
          referrerPolicy: 'same-origin'
        })
      }
    ];
  },
  async redirects() {
    return [
      {
        source: '/auth',
        destination: '/auth/login',
        permanent: false
      },
      {
        source: '/dashboard',
        destination: '/dashboard/',
        permanent: false
      },
      {
        source: '/app/settings',
        destination: '/app/settings/account/profile',
        permanent: false
      },
      {
        source: '/app/settings/account',
        destination: '/app/settings/account/profile',
        permanent: false
      },
      {
        source: '/app/settings/organization',
        destination: '/app/settings/organization/information',
        permanent: false
      }
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [svgLoader]
    });
    return config;
  }
};

export default withContentCollections(bundleAnalyzerConfig(nextConfig));
