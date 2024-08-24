/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/system";

import { theme } from "@pagopa/mui-italia";
import Layout from "../components/Layout";

import "../styles/default.css";
import { LangProvider } from "../context/lang-context";

function MyApp({ Component, pageProps }: AppProps) {
  const noLayout = pageProps.noLayout;

  return (
    <ThemeProvider theme={theme}>
      <LangProvider lang={pageProps.lang} translations={pageProps.translations}>
        {noLayout ? (
          // Se noLayout è true, renderizza solo il componente
          <Component {...pageProps} />
        ) : (
          // Altrimenti, avvolgilo nel LandingLayout
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </LangProvider>
    </ThemeProvider>
  );
}

export default MyApp;
