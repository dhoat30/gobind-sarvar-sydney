const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

const normalizeUrl = (value, fallbackProtocol) => {
  if (!value) {
    return "";
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `${fallbackProtocol}://${value}`;
};

const cmsUrl = normalizeUrl(
  process.env.NEXT_PUBLIC_CMS_URL ||
    (process.env.NODE_ENV === "production"
      ? "gobindsarvar.com.au"
      : "gobind-sarvar-sydney.local"),
  protocol,
);

const baseUrl = normalizeUrl(
  process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production"
      ? "gobindsarvar.com.au"
      : "localhost:3000"),
  protocol,
);

const siteName = "Gobind Sarvar";

// bundle analyzer
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfigp} */
const nextConfig = {

    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
    },
    images: {
        remotePatterns: [{
            protocol: "http",
            hostname: "gobind-sarvar-sydney.local",
            port: '',
            pathname: '/**',
        },
        {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            port: '',
            pathname: '/**'
        }
    ],
    },
    env: {
        url: cmsUrl,
        siteUrl: baseUrl,
        siteName: siteName,
    },
};

module.exports = withBundleAnalyzer(nextConfig);