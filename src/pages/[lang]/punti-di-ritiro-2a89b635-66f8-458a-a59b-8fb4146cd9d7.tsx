import type { GetStaticPaths, NextPage } from "next";

import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { langCodes } from "@utils/constants";
import Script from "next/script";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import { getI18n } from "../../api/i18n";
import OperatorsList from "../../components/Ritiro/OperatorsList";
import OperatorsTable from "../../components/Ritiro/OperatorsTable";
import PointInfoDrawer from "../../components/Ritiro/PickupPointsInfoDrawer";
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

  return { props: { translations, lang: params.lang } };
}

const RitiroPage: NextPage = () => {
  const { t } = useTranslation(["common", "pickup"]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState<Point[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredOperators, setFilteredOperators] = useState<RaddOperator[]>(
    []
  );
  const [isSearchFailed, setIsSearchFailed] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<RaddOperator | null>(null);

  let hasData = false;
  useEffect(() => {
    if (!hasData) {
      hasData = true;

      const csvFilePath = "/static/documents/radd-stores-registry.csv";
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
    type: e.tipologia,
    denomination: e.descrizione,
    city: e.città,
    address: e.via,
    normalizedAddress: e.indirizzo_AWS,
    province: e.provincia,
    region: e.regione,
    cap: e.cap,
    contacts: e.telefono,
    monday: e.lunedi,
    tuesday: e.martedi,
    wednesday: e.mercoledi,
    thursday: e.giovedi,
    friday: e.venerdi,
    saturday: e.sabato,
    sunday: e.domenica,
  }));

  const handleInputChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    const normalizedSearchValue = searchValue
      .toLowerCase()
      .replace(/[^a-zA-Z]/g, "");

    const operators = initialRaddOperators.filter((operator) => {
      const normalizedCity = operator.city
        ? operator.city.toLowerCase().replace(/[^a-zA-Z]/g, "")
        : "";
      const normalizedProvince = operator.province
        ? operator.province.toLowerCase().replace(/[^a-zA-Z]/g, "")
        : "";

      return (
        normalizedCity === normalizedSearchValue ||
        normalizedProvince === normalizedSearchValue ||
        operator.cap === searchValue
      );
    });

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

  const toggleDrawer = (open: boolean, pickupPoint: RaddOperator | null) => {
    setIsDrawerOpen(open);
    setSelectedPoint(pickupPoint);
  };

  let rowsToSet: RaddOperator[] | null = null;

  if (filteredOperators.length > 0) {
    rowsToSet = filteredOperators;
  } else if (filteredOperators.length === 0 && isSearchFailed) {
    rowsToSet = [];
  } else {
    rowsToSet = initialRaddOperators;
  }

  const getContent = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress
            id="loading"
            role="status"
            aria-live="polite"
            aria-label={t("loading-aria-label", { ns: "pickup" })}
            sx={{ color: "primary" }}
          />
        </Box>
      );
    }

    if (!rowsToSet || rowsToSet.length === 0) {
      return (
        <Box bgcolor="white" p={3} m={3} textAlign="center">
          <Typography>{t("search.empty_state_1", { ns: "pickup" })}</Typography>
          <Typography>{t("search.empty_state_2", { ns: "pickup" })}</Typography>
        </Box>
      );
    }

    if (isMobile) {
      return (
        <OperatorsList
          key={JSON.stringify(initialRaddOperators)}
          rows={rowsToSet}
          toggleDrawer={toggleDrawer}
        />
      );
    } else {
      return (
        <OperatorsTable
          key={JSON.stringify(filteredOperators)}
          rows={rowsToSet}
          toggleDrawer={toggleDrawer}
        />
      );
    }
  };

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

      <Box
        py={{ xs: 3, sm: 5 }}
        px={{ xs: 0, sm: 5 }}
        sx={{
          backgroundColor: { xs: "#EEEEEE", sm: "#FAFAFA" },
          display: "flex",
          justifyContent: "center",
          alignItems: { xs: "center", sm: "flex-start" },
        }}
      >
        <Stack
          sx={{
            maxWidth: { xs: "100%", sm: 1092 },
            width: { xs: "auto", sm: "100%" },
          }}
        >
          {getContent()}
        </Stack>
      </Box>

      <PointInfoDrawer
        isOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        point={selectedPoint}
      />
    </>
  );
};

export default RitiroPage;
