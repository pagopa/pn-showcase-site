import type { GetStaticPaths, NextPage } from "next";

import PageHead from "../../../components/PageHead";
import {
  Alert,
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Papa from "papaparse";
import OperatorsTable from "../../../components/Ritiro/OperatorsTable";
import DarkInfoblockRitiro from "../../../components/Ritiro/DarkInfoblockRitiro";
import OperatorsList from "../../../components/Ritiro/OperatorsList";
import { useEffect, useState } from "react";
import { LangCode, Point, RaddOperator } from "../../../model";
import { useTranslation } from "../../../hook/useTranslation";
import { langCodes } from "@utils/constants";
import { getI18n } from "../../../api/i18n";

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

const RitiroPage: NextPage = () => {
  const { t } = useTranslation(["common", "pickup"]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [points, setPoints] = useState<Point[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredOperators, setFilteredOperators] = useState<RaddOperator[]>(
    []
  );
  const [isSearchFailed, setIsSearchFailed] = useState<boolean>(false);

  let hasData = false;
  useEffect(() => {
    if (!hasData) {
      hasData = true;

      /* 
        Storelocator file is saved on showcase-site bucket s3 at /public/static/documents/radd-stores-registry.csv,
        however this file is not accessible by localhost.
        To test in local environment you need to download file http://www.dev.notifichedigitali.it/public/static/documents/radd-stores-registry.csv 
        and save at the same path but use csvFilePath = "/static/documents/radd-stores-registry.csv".
        The file is already referred in .gitignore.
        ---------------------------------------------------
        Sarah Donvito, 31/05/2024
        ---------------------------------------------------
      */
      const csvFilePath = "/public/static/documents/radd-stores-registry.csv";
      Papa.parse(csvFilePath, {
        download: true,
        header: true,
        complete: (result) => {
          if (result.data && result.data.length > 0) {
            setPoints(result.data as Point[]);
          }
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    }
  }, []);

  const initialRaddOperators: RaddOperator[] = points.map((e) => ({
    denomination: e.descrizione,
    city: e.città,
    address: e.via,
    province: e.provincia,
    cap: e.cap,
    contacts: e.telefono,
  }));

  const handleInputChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    const operators = initialRaddOperators.filter((operator) =>
      operator.city
        ? operator.city.toLowerCase().replace(/[^a-zA-Z]/g, "") ===
            searchValue.toLowerCase().replace(/[^a-zA-Z]/g, "") ||
          operator.cap === searchValue
        : ""
    );

    if (searchValue && operators.length > 0) {
      setFilteredOperators(operators);
    } else if (searchValue && operators.length === 0) {
      setIsSearchFailed(true);
      setFilteredOperators([]);
    } else {
      setFilteredOperators(initialRaddOperators);
    }
  };

  const handleCleanField = () => {
    setSearchValue("");
    setFilteredOperators(initialRaddOperators);
  };

  let rowsToSet: RaddOperator[] | null = null;

  if (filteredOperators.length > 0) {
    rowsToSet = filteredOperators;
  } else if (filteredOperators.length === 0 && isSearchFailed) {
    rowsToSet = [];
  } else {
    rowsToSet = initialRaddOperators;
  }

  return (
    <>
      <PageHead
        title={t("title", { ns: "pickup" })}
        description={t("description", { ns: "pickup" })}
      />
      <Stack
        mt={10}
        mb={5}
        mx={3}
        direction="column"
        alignItems="center"
        spacing={0}
        justifyContent="center"
      >
        <Typography align="center" variant="h2">
          {t("search.title", { ns: "pickup" })}
        </Typography>

        <Typography
          my={3}
          color="textPrimary"
          variant="body2"
          sx={{ maxWidth: 554 }}
          textAlign="center"
        >
          {t("search.description_1", { ns: "pickup" })}
          <strong>{t("search.description_2", { ns: "pickup" })}</strong>. <br />
          {t("search.description_3", { ns: "pickup" })}
        </Typography>

        <Alert
          severity="info"
          variant="standard"
          sx={{ marginBottom: 5, maxWidth: 606 }}
        >
          {t("search.disclaimer", { ns: "pickup" })}
        </Alert>

        <TextField
          value={searchValue}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchClick();
            }
          }}
          onChange={handleInputChange}
          sx={{ maxWidth: 498, width: "100%" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ paddingRight: 0 }}>
                {searchValue && (
                  <IconButton onClick={handleCleanField}>
                    <CloseIcon />
                  </IconButton>
                )}
                <IconButton onClick={handleSearchClick}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          label={t("search.placeholder", { ns: "pickup" })}
          id="textFilter"
        />
      </Stack>
      {isMobile ? (
        <Box
          py={3}
          sx={{
            backgroundColor: "#EEEEEE",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {rowsToSet.length > 0 ? (
            <OperatorsList
              key={JSON.stringify(initialRaddOperators)}
              rows={rowsToSet}
            />
          ) : (
            <Stack sx={{ maxWidth: 1092, minWidth: "100%" }}>
              <Box bgcolor="white" p={3} m={3} textAlign="center">
                <Typography>
                  {t("search.empty_state", { ns: "pickup" })}
                </Typography>
              </Box>
            </Stack>
          )}
        </Box>
      ) : (
        <Box
          minHeight={823}
          sx={{
            backgroundColor: "#FAFAFA",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
          padding={5}
        >
          {rowsToSet.length > 0 ? (
            <Stack sx={{ maxWidth: 1092, width: "100%" }}>
              <OperatorsTable
                key={JSON.stringify(filteredOperators)}
                rows={rowsToSet}
              />
            </Stack>
          ) : (
            <Stack my={5} sx={{ maxWidth: 1092, width: "100%" }}>
              <Box
                bgcolor="white"
                height={56}
                width={1092}
                sx={{
                  margin: "auto",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <Typography>
                  {t("search.empty_state", { ns: "pickup" })}
                </Typography>
              </Box>
            </Stack>
          )}
        </Box>
      )}

      <DarkInfoblockRitiro />
    </>
  );
};

export default RitiroPage;
