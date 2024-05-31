/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/system";
import Head from "next/head";

import { theme } from "@pagopa/mui-italia";
import LandingLayout from "../src/layout/LandingLayout";
import { LangProvider } from "../provider/lang-context";

import "../styles/default.css";

function Main({ Component, pageProps }: AppProps) {
  const noLayout = pageProps.noLayout;

  return (
    <ThemeProvider theme={theme}>
      <LangProvider>
        <Head>
          <script
            src="/node_modules/@iframe-resizer/child/index.umd.js"
          ></script>
        </Head>
        {noLayout ? (
          // Se noLayout è true, renderizza solo il componente
          <Component {...pageProps} />
        ) : (
          // Altrimenti, avvolgilo nel LandingLayout
          <LandingLayout>
            <Component {...pageProps} />
          </LandingLayout>
        )}
      </LangProvider>
    </ThemeProvider>
  );
}

export default Main;
