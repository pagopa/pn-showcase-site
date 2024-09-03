/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/system";

import { theme } from "@pagopa/mui-italia";
import Layout from "../components/Layout";

import "../styles/default.css";
import { LangProvider } from "../context/lang-context";
import Loading from "./loading";

function MyApp({ Component, pageProps }: AppProps) {
  const noLayout = pageProps.noLayout;
  const translationLoading = !pageProps.lang && !pageProps.translations;

  return (
    <ThemeProvider theme={theme}>
      <LangProvider lang={pageProps.lang} translations={pageProps.translations}>
        
        {translationLoading && <Loading />}
        
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
