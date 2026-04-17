const protocol = process.env.NODE_ENV === "production" ? "https" : "https";

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
      ? "cms.gobindsarvar.nsw.edu.au"
      : "cms.gobindsarvar.nsw.edu.au"),
  protocol,
);

const baseUrl = normalizeUrl(
  process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production"
      ? "gobindsarvar.nsw.edu.au"
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
            protocol: "https",
            hostname: "cms.gobindsarvar.nsw.edu.au",
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
    // add redirects for old routes
    async redirects() {
        return [
            {
                source: '/get-free-quote',
                destination: 'https://tally.so/r/w5PEQQ',
                permanent: true,
            },
              {
                source: '/enrol-now',
                destination: 'https://tally.so/r/w5PEQQ',
                permanent: true,
            },
        ] 
      } 
};

module.exports = withBundleAnalyzer(nextConfig);
