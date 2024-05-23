/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/system";
import { useEffect } from "react";

import { theme } from "@pagopa/mui-italia";
import LandingLayout from "../src/layout/LandingLayout";
import { LangProvider } from "../provider/lang-context";

import "../styles/default.css";

function Main({ Component, pageProps }: AppProps) {
  const noLayout = pageProps.noLayout;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "/node_modules/@iframe-resizer/child/index.umd.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <LangProvider>
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
