import type { GetStaticPaths, NextPage } from "next";

import { Alert, Box, Stack, Typography } from "@mui/material";
import { langCodes } from "@utils/constants";
import { sortPointsByDistance } from "@utils/map";
import dynamic from "next/dynamic";
import Script from "next/script";
import Papa from "papaparse";
import { useEffect, useRef, useState } from "react";
import { getI18n } from "../../api/i18n";
import PickupPointsList from "../../components/PickupPointsList";
import { useTranslation } from "../../hook/useTranslation";
import { LangCode, Point, RaddOperator } from "../../model";
import { provinceToRegione } from "../../utils/mapperRegioni";

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
  const MapWithNoSSR = dynamic(
    () => import("../../components/PickupPointsMap"),
    {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }
  );

  const { t } = useTranslation(["common", "pickup"]);

  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState<Point[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredOperators, setFilteredOperators] = useState<RaddOperator[]>(
    []
  );
  const [isSearchFailed, setIsSearchFailed] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const mapRef = useRef<any>(null);

  const handleNavigate = (latitude: number, longitude: number) => {
    if (mapRef.current && mapRef.current.flyTo) {
      mapRef.current.flyTo([latitude, longitude], 18);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Got coordinates", latitude, longitude);
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

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

    getUserLocation();
  }, []);

  const initialRaddOperators: RaddOperator[] = points.map((e) => ({
    denomination: e.descrizione,
    city: e.città,
    address: e.via,
    province: e.provincia,
    region: provinceToRegione[e.provincia] ?? "",
    cap: e.cap,
    contacts: e.telefono,
    latitude: e.latitudine ? Number(e.latitudine) : undefined,
    longitude: e.longitudine ? Number(e.longitudine) : undefined,
  }));

  let rowsToSet: RaddOperator[] | null = null;

  if (filteredOperators.length > 0) {
    rowsToSet = filteredOperators;
  } else if (filteredOperators.length === 0 && isSearchFailed) {
    rowsToSet = [];
  } else {
    rowsToSet = initialRaddOperators;
  }

  if (userLocation?.latitude && userLocation?.longitude) {
    rowsToSet = sortPointsByDistance(rowsToSet, userLocation) ?? [];
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
        mb={2}
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

        <Alert severity="info" variant="standard">
          {t("search.disclaimer", { ns: "pickup" })}
        </Alert>
      </Stack>

      <Stack
        direction="row"
        display="flex"
        sx={{
          width: "100%",
          height: "650px",
        }}
      >
        <Box display="flex" flexDirection="column">
          {/* <Box sx={{ px: 2, py: 1 }}>
            <AccessibleAutocomplete
              options={[
                "Milano",
                "Milazzo",
                "Roma",
                "Romagna",
                "Via Roma",
                "Via Milano",
              ]}
            />
          </Box> */}
          <Box sx={{ overflowY: "auto", px: 2 }}>
            <PickupPointsList
              rows={rowsToSet}
              handleNavigate={handleNavigate}
            />
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <MapWithNoSSR
            mapRef={mapRef}
            points={rowsToSet}
            userLocation={userLocation}
          />
        </Box>
      </Stack>
    </>
  );
};

export default RitiroMappaPage;
