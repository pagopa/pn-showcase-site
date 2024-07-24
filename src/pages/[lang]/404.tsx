import { Typography } from "@mui/material";
import PageHead from "../../components/PageHead";
import { GetStaticPaths } from "next";
import { langCodes } from "@utils/constants";
import { getI18n } from "../../api/i18n";
import { LangCode } from "../../model";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: langCodes.map((lang) => ({
      params: { lang },
    })),
    fallback: false,
  }
}

export async function getStaticProps({params}: {params: {lang: LangCode}}) {
  const translations = getI18n(params.lang, ['common'])

  return { props: {translations, lang: params.lang} }
}

const NotFound = () => (
  <>
    <PageHead
      title="SEND - Pagina non trovata"
      description="Pagina non trovata"
    />
    <Typography variant="h4">Error 404</Typography>
  </>
);

export default NotFound;
