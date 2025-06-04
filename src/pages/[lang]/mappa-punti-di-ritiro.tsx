import { Box, Grid, Link, Typography } from "@mui/material";
import { langCodes } from "@utils/constants";
import { sortPointsByDistance } from "@utils/map";
import type { GetStaticPaths, NextPage } from "next";
import Script from "next/script";
import Papa from "papaparse";
import { useEffect, useRef, useState } from "react";
import { MapRef } from "react-map-gl/maplibre";
import PickupPointsList from "src/components/PickupPointsList";
import PickupPointsMapLibre from "src/components/PickupPointsMapLibre";
import PickupPointsInfoDrawer from "src/components/Ritiro/PickupPointsInfoDrawer";
import Tabs from "src/components/Tabs";
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
  const translations = getI18n(params.lang, ["pickup", "common"]);

  return { props: { translations, lang: params.lang, noLayout: true } };
}

type MOBILE_TABS = "list" | "map";

const MappaPuntiDiRitiroPage: NextPage = () => {
  const { t } = useTranslation(["pickup", "common"]);
  const mapRef = useRef<MapRef | null>(null);

  const [selectedTab, setSelectedTab] = useState<MOBILE_TABS>("list");
  const [points, setPoints] = useState<Point[]>([]);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<RaddOperator | null>(null);

  let hasData = false;

  const handleChangeTab = (tabIndex: number) => {
    setSelectedTab(tabIndex === 1 ? "map" : "list");
  };

  const toggleDrawer = (open: boolean, pickupPoint: RaddOperator | null) => {
    setIsDrawerOpen(open);
    setSelectedPoint(pickupPoint);
  };

  const handleNavigate = (latitude: number, longitude: number) => {
    if (mapRef.current && mapRef.current.flyTo) {
      mapRef.current.flyTo({
        center: [longitude, latitude],
        zoom: 15,
      });
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
      normalizedAddress: e.indirizzo_AWS.replace(", Italia", ""),
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
    }));

  let rowsToSet: RaddOperator[] | null = initialRaddOperators;

  if (userLocation?.latitude && userLocation?.longitude) {
    rowsToSet = sortPointsByDistance(rowsToSet, userLocation);
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
          <Typography
            fontWeight={700}
            fontSize="14px"
            color="textSecondary"
            mb={3}
            sx={{ textTransform: "uppercase" }}
          >
            {t("search.eyelet")}
          </Typography>

          <Typography variant="h4">{t("search.title")}</Typography>

          <Typography mt={2} mb={1} color="textPrimary" variant="body2">
            {t("search.description_1")}
            <strong>{t("search.description_2")}</strong>.{" "}
          </Typography>

          <Link
            href="#come-funzionano-punti-di-ritiro"
            color="primary"
            fontWeight={700}
            sx={{ textDecoration: "none" }}
          >
            {t("how-it-works")}
          </Link>

          <Box sx={{ display: { xs: "flex", md: "none" }, my: 3 }}>
            <Tabs
              tabs={[t("tabs.list"), t("tabs.map")]}
              onTabChange={handleChangeTab}
              breakOnMobile={false}
              buttonSize="small"
              fullWidth
            />
          </Box>

          <Box
            sx={{
              display: {
                xs: selectedTab === "list" ? "block" : "none",
                md: "block",
              },
            }}
          >
            <PickupPointsList
              rows={rowsToSet}
              handleNavigate={handleNavigate}
              toggleDrawer={toggleDrawer}
            />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
          sx={{
            width: "100%",
            display: {
              xs: selectedTab === "map" ? "block" : "none",
              md: "block",
            },
          }}
        >
          <Box sx={{ width: "100%", height: "1000px" }}>
            <PickupPointsMapLibre
              mapRef={mapRef}
              points={rowsToSet}
              userLocation={userLocation}
              toggleDrawer={toggleDrawer}
            />
          </Box>
        </Grid>
        <PickupPointsInfoDrawer
          isOpen={isDrawerOpen}
          toggleDrawer={toggleDrawer}
          point={selectedPoint}
        />
      </Grid>
    </>
  );
};

export default MappaPuntiDiRitiroPage;
