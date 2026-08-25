import { GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Stack, Typography } from "@mui/material";
import { MIButton } from "@pagopa/mui-italia";
import { langCodes } from "@utils/constants";
import { getI18n } from "src/api/i18n";
import LangContext from "src/context/lang-context";
import { LangCode } from "src/model";

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: langCodes.map((lang) => ({
    params: { lang },
  })),
  fallback: false,
});

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

  const redirectToInternalPage = (page: string) => {
    if (langCodes.includes(lang)) {
      const separator = page.startsWith("/") ? "" : "/";
      void push(`/${lang}${separator}${page}`);
    }
  };

  return (
    <Stack spacing={2} sx={{ padding: 2 }}>
      <Typography>Homepage pn-showcase-site</Typography>
      <MIButton
        variant="text"
        onClick={() => redirectToInternalPage("/mappa-punti-di-ritiro")}
        sx={{ width: "200px" }}
      >
        Mappa Punti di ritiro
      </MIButton>
      <MIButton
        variant="text"
        onClick={() =>
          redirectToInternalPage(
            "/send-in-numeri-283d8d30-e558-4ef6-9083-8f4ef9f8b8c5",
          )
        }
        sx={{ width: "200px" }}
      >
        SEND in numeri
      </MIButton>
    </Stack>
  );
};

export default Homepage;
