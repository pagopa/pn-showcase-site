import { Place } from "@mui/icons-material";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { langCodes } from "@utils/constants";
import { sortPointsByDistance } from "@utils/map";
import type { GetStaticPaths, NextPage } from "next";
import Script from "next/script";
import Papa from "papaparse";
import { useEffect, useRef, useState } from "react";
import AccessibleAutocomplete from "src/components/Autocomplete";
import PickupPointsMapLibre from "src/components/PickupPointsMapLibre";
import { getI18n } from "../../api/i18n";
import PickupPointsList from "../../components/PickupPointsList";
import PointInfoDrawer from "../../components/Ritiro/PointInfoDrawer";
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
  const { t } = useTranslation(["common", "pickup"]);

  const [points, setPoints] = useState<Point[]>([]);
  const [filteredOperators, setFilteredOperators] = useState<RaddOperator[]>(
    []
  );
  const [isSearchFailed, setIsSearchFailed] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<RaddOperator | null>(null);

  const mapRef = useRef<any>(null);

  let hasData = false;

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

  const toggleDrawer = (open: boolean, pickupPoint: RaddOperator | null) => {
    setIsDrawerOpen(open);
    setSelectedPoint(pickupPoint);
  };

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
          }
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    }

    getUserLocation();
  }, []);

  const initialRaddOperators: RaddOperator[] = points
    .filter((point) => point.latitudine && point.longitudine)
    .map((e) => ({
      denomination: e.descrizione,
      city: e.città,
      address: e.via,
      province: e.provincia,
      region: e.regione,
      cap: e.cap,
      contacts: e.telefono,
      latitude: Number(e.latitudine),
      longitude: Number(e.longitudine),
      monday: e.lunedi,
      tuesday: e.martedi,
      wednesday: e.mercoledi,
      thursday: e.giovedi,
      friday: e.venerdi,
      saturday: e.sabato,
      sunday: e.domenica,
      type: e.tipologia,
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

      <Grid container sx={{ mt: 4, mb: 2, px: 3 }} spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="h4">
            {t("search.title", { ns: "pickup" })}
          </Typography>

          <Typography
            my={3}
            color="textPrimary"
            variant="body2"
            sx={{ maxWidth: 554 }}
          >
            {t("search.description_1", { ns: "pickup" })}
            <strong>{t("search.description_2", { ns: "pickup" })}</strong>.{" "}
          </Typography>
          {/* 
          <Alert severity="info" variant="standard">
            {t("search.disclaimer", { ns: "pickup" })}
          </Alert> */}

          <Box sx={{ mt: 2 }}>
            <AccessibleAutocomplete
              options={[
                "Milano",
                "Milazzo",
                "Roma",
                "Romagna",
                "Via Roma",
                "Via Milano",
              ]}
              renderInput={(value) => (
                <Stack spacing={2} direction="row" alignItems="flex-start">
                  <Place fontSize="small" sx={{ color: "text.secondary" }} />
                  <Typography variant="body2">{value}</Typography>
                </Stack>
              )}
            />
          </Box>

          <PickupPointsList
            rows={rowsToSet}
            handleNavigate={handleNavigate}
            toggleDrawer={toggleDrawer}
          />
        </Grid>

        <Grid item xs={12} md={8} sx={{ width: "100%" }}>
          <Box sx={{ width: "100%", height: "1000px" }}>
            <PickupPointsMapLibre
              mapRef={mapRef}
              points={rowsToSet}
              userLocation={userLocation}
            />
          </Box>
        </Grid>
        <PointInfoDrawer
          isOpen={isDrawerOpen}
          toggleDrawer={toggleDrawer}
          point={selectedPoint}
        />
      </Grid>
    </>
  );
};

export default RitiroMappaPage;
