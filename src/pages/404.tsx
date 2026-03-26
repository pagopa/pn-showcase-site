import { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { getInitialLocale } from "@utils/i18n";

const NotFound: NextPage = () => {
  const router = useRouter();

  // language detection
  useEffect(() => {
    const detectedLng = getInitialLocale();
    if (
      router.asPath.startsWith("/" + detectedLng) &&
      router.route === "/404"
    ) {
      // prevent endless loop
      void router.replace("/" + detectedLng + router.route);
      return;
    }
    void router.replace(`/${detectedLng}${router.asPath}`);
  }, []);

  return (
    <Head>
      <meta key="robots" name="robots" content="noindex, nofollow" />
    </Head>
  );
};

export default NotFound;
