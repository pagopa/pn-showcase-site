const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  distDir: 'build',
  transpilePackages: [
    '@pagopa/mui-italia',
  ],
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
    "@mui/material": {
      transform: "@mui/material/{{member}}",
    },
  }
};
/**
 * As soon as RADD sperimentation start, all page extension mapping needs to be remove.
 * It can affect building phase drastically.
 * In addition to this, also the pages in "punti di ritiro" folder should have their extensions
 * changed from ".dev.tsx" to ".tsx"
 * 
 * What this code does:
 * This code will allow you to use .dev.xxx extensions for dev-only pages, and .xxx for pages that are publicly accessible.
 * 
 * More info here https://dev.to/tylerlwsmith/development-only-pages-in-nextjs-4fgo
 */
module.exports = (phase, { defaultConfig }) => ({
  ...defaultConfig,
  ...nextConfig,
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js", "jsx"]
    .map((extension) => {
      const isDevServer = phase === PHASE_DEVELOPMENT_SERVER;
      const prodExtension = `(?<!dev\.)${extension}`;
      const devExtension = `dev\.${extension}`;
      return isDevServer ? [devExtension, extension] : prodExtension;
    })
    .flat(),
});

