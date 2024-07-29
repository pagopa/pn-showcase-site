import { getInitialLocale } from "@utils/i18n"
import { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Index: NextPage = () => {
  const router = useRouter();

  // language detection
  useEffect(() => {
      const detectedLng = getInitialLocale();
      router.replace('/[lang]', `/${detectedLng}`)
  }, [])

  return (
      <Head>
        <meta key="robots" name="robots" content="noindex, nofollow" />
      </Head>
  )
}

export default Index;
  