import Head from "next/head";
import React, { useEffect, useState } from "react";

interface Props {
  title: string;
  description: string;
}

const PageHead = ({ title, description }: Props) => {

  const [windowOrigin, setWindowOrigin] = useState<string>();
  const regex = /https:\/\/www.((dev|test|uat|hotfix)?.?)notifichedigitali.it/;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowOrigin(window.origin);
    }
  }, []);

  return <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    {windowOrigin && regex.test(windowOrigin) && <meta name="robots" content="noindex"></meta>}
    <link
      rel="manifest"
      href="/static/manifest.webmanifest"
      crossOrigin="anonymous"
    />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/static/icons/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/static/icons/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/static/icons/favicon-16x16.png"
    />


  </Head>
};

export default PageHead;
