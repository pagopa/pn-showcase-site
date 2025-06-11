import { Button, Stack, Typography } from "@mui/material";
import { langCodes } from "@utils/constants";
import { GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";
import { getI18n } from "src/api/i18n";
import { useConfig } from "src/context/config-context";
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
  const { push } = useRouter();
  const config = useConfig();

  const redirectToInternalPage = (page: string) => {
    if (langCodes.includes(lang)) {
      const separator = page.startsWith("/") ? "" : "/";
      push(`/${lang}${separator}${page}`);
    }
  };

  return (
    <Stack spacing={1} sx={{ padding: 2 }}>
      <Typography>Homepage pn-showcase-site</Typography>
      <Button
        onClick={() =>
          redirectToInternalPage(
            "/punti-di-ritiro-2a89b635-66f8-458a-a59b-8fb4146cd9d7"
          )
        }
        sx={{ width: "200px" }}
      >
        Punti di ritiro
      </Button>
      <Button
        onClick={() => redirectToInternalPage("/mappa-punti-di-ritiro")}
        sx={{ width: "200px" }}
      >
        Mappa Punti di ritiro
      </Button>
      <Button
        onClick={() =>
          redirectToInternalPage(
            "/send-in-numeri-283d8d30-e558-4ef6-9083-8f4ef9f8b8c5"
          )
        }
        sx={{ width: "200px" }}
      >
        SEND in numeri
      </Button>

      {/* TODO remove */}
      <p>API BASE URL: {config.API_BASE_URL}</p>
    </Stack>
  );
};

export default Homepage;
