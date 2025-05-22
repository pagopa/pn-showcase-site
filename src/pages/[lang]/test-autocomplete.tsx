import { Box } from "@mui/material";
import { langCodes } from "@utils/constants";
import { GetStaticPaths } from "next";
import React from "react";
import { getI18n } from "src/api/i18n";
import MuiItaliaAutocomplete from "src/components/MuiItaliaAutocomplete";
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
  const translations = getI18n(params.lang, ["common", "pickup"]);

  return { props: { translations, lang: params.lang } };
}

const TestAutocomplete = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <MuiItaliaAutocomplete
        options={[
          "Milano",
          "Milano Marittima",
          "Milano Centrale",
          "Milano Porta Garibaldi",
          "Milano Porta Romana",
          "Milano Porta Venezia",
          "Milano Cadorna",
          "Milano Garibaldi",
        ]}
        noResultsText="Non abbiamo trovato nulla"
        placeholder="Digita un indirizzo"
        label="Cerca un indirizzo"
        hideArrow
        sx={{ width: "300px", mt: 24 }}
      />
    </Box>
  );
};

export default TestAutocomplete;
