import { useRouter } from "next/router";
import { useEffect } from "react";
import { getInitialLocale } from "@utils/i18n";
import Head from "next/head";
import { NextPage } from "next";

const NotFound: NextPage = () => {
  const router = useRouter();

  // language detection
  useEffect(() => {
      const detectedLng = getInitialLocale();
      if (router.asPath.startsWith('/' + detectedLng) && router.route === '/404') { // prevent endless loop
        router.replace('/' + detectedLng + router.route);
        return;
      }
      router.replace(`/${detectedLng}${router.asPath}`);
  })

  return (
      <Head>
        <meta key="robots" name="robots" content="noindex, nofollow" />
      </Head>
  )
}

export default NotFound;
