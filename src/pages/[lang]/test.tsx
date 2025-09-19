import { Stack, Typography } from "@mui/material";
import { langCodes } from "@utils/constants";
import type { GetStaticPaths, NextPage } from "next";
import MuiItaliaAutocomplete from "src/components/MuiItaliaAutocomplete";
import { getI18n } from "../../api/i18n";
import { LangCode } from "../../model";

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
  const translations = getI18n(params.lang, ["pickup", "common"]);

  return { props: { translations, lang: params.lang, noLayout: true } };
}

const options = [
  { label: "Milano", id: "MI" },
  { label: "Roma", id: "RM" },
  { label: "Torino", id: "TO" },
  { label: "Napoli", id: "NA" },
  { label: "Firenze", id: "FI" },
  { label: "Bologna", id: "BO" },
  { label: "Venezia", id: "VE" },
  { label: "Verona", id: "VR" },
  { label: "Palermo", id: "PA" },
  { label: "Genova", id: "GE" },
];

const TestPage: NextPage = () => {
  return (
    <Stack p={4} spacing={2}>
      <Typography variant="h4">Test Page</Typography>

      <MuiItaliaAutocomplete
        multiple
        options={options}
        renderOption={(value) => (
          <Typography variant="body2" color="primary">
            {value.label}
          </Typography>
        )}
        sx={{ width: "600px" }}
      />
    </Stack>
  );
};

export default TestPage;
