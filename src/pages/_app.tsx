/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { ThemeProvider } from "@mui/system";
import type { AppProps } from "next/app";

import { theme } from "@pagopa/mui-italia";

import Loading from "../components/loading";
import { LangProvider } from "../context/lang-context";
import "../styles/default.css";

function MyApp({ Component, pageProps }: AppProps) {
  const translationLoading = !pageProps.lang && !pageProps.translations;

  return (
    <ThemeProvider theme={theme}>
      <LangProvider lang={pageProps.lang} translations={pageProps.translations}>
        {translationLoading && <Loading />}

        <Component {...pageProps} />
      </LangProvider>
    </ThemeProvider>
  );
}

export default MyApp;
