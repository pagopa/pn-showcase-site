import { Stack, Typography } from "@mui/material";
import { langCodes } from "@utils/constants";
import { GetStaticPaths } from "next";
import Link from "next/link";
import { useContext } from "react";
import { getI18n } from "src/api/i18n";
import LangContext from "src/context/lang-context";
import { LangCode } from "src/model";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: langCodes.map((lang) => ({
      params: { lang },
    })),
    fallback: false,
  };
};

export async function getStaticProps({
  params,
}: {
  params: { lang: LangCode };
}) {
  const translations = getI18n(params.lang, ["common"]);

  return { props: { translations, lang: params.lang } };
}

const Homepage = () => {
  const { lang } = useContext(LangContext);

  return (
    <Stack spacing={1} sx={{ padding: 2 }}>
      <Typography>Homepage pn-showcase-site</Typography>
      <Link
        href={`${lang}/punti-di-ritiro-2a89b635-66f8-458a-a59b-8fb4146cd9d7`}
      >
        Punti di ritiro
      </Link>
      <Link
        href={`${lang}/send-in-numeri-283d8d30-e558-4ef6-9083-8f4ef9f8b8c5`}
      >
        SEND in numeri
      </Link>
    </Stack>
  );
};

export default Homepage;
