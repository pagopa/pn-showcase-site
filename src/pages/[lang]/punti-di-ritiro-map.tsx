import type { GetStaticPaths, NextPage } from "next";

import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { langCodes } from "@utils/constants";
import dynamic from "next/dynamic";
import Script from "next/script";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import { getI18n } from "../../api/i18n";
import { useTranslation } from "../../hook/useTranslation";
import { LangCode, Point, RaddOperator } from "../../model";

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

  return { props: { translations, lang: params.lang, noLayout: true } };
}

const RitiroMappaPage: NextPage = () => {
  const MapWithNoSSR = dynamic(() => import("../../components/MapWithReact"), {
    ssr: false,
    loading: () => <p>Loading...</p>,
  });

  const { t } = useTranslation(["common", "pickup"]);

  const [loading, setLoading] = useState(true);
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
      const csvFilePath = "/static/documents/radd-stores-registry-map.csv";
      Papa.parse(csvFilePath, {
        download: true,
        header: true,
        complete: (result) => {
          if (result.data && result.data.length > 0) {
            setPoints(result.data as Point[]);
            setLoading(false);
          }
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
          setLoading(false);
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
    latitude: e.latitudine ? Number(e.latitudine) : undefined,
    longitude: e.longitudine ? Number(e.longitudine) : undefined,
  }));

  console.log(initialRaddOperators);

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
      <Script
        src="/iframe-resizer/child/index.umd.js"
        type="text/javascript"
        id="iframe-resizer-child"
        strategy="beforeInteractive"
      />

      <Stack
        mt={8}
        mb={5}
        mx={3}
        direction="column"
        alignItems="center"
        spacing={0}
        justifyContent="center"
      >
        <Typography
          align="center"
          fontWeight={700}
          fontSize="14px"
          color="textSecondary"
          mb={3}
          sx={{ textTransform: "uppercase" }}
        >
          {t("search.eyelet", { ns: "pickup" })}
        </Typography>

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

      <Stack
        sx={{
          width: "100%",
          height: "650px",
        }}
      >
        <MapWithNoSSR points={rowsToSet} />
      </Stack>
    </>
  );
};

export default RitiroMappaPage;
