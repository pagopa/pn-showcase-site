import { Box, Grid, Typography } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { ButtonNaked } from "@pagopa/mui-italia";
import { langCodes } from "@utils/constants";
import { mapPoint } from "@utils/map";
import type { GetStaticPaths, NextPage } from "next";
import Script from "next/script";
import Papa from "papaparse";
import { useEffect, useRef, useState } from "react";
import ErrorBox from "src/components/ErrorBox";
import PickupPointsAutocomplete from "src/components/PickupPointsAutocomplete";
import PickupPointsList from "src/components/PickupPointsList";
import PickupPointsMap from "src/components/PickupPointsMap";
import PickupPointsInfoDialog from "src/components/PickupPointsInfoDialog";
import Tabs from "src/components/Tabs";
import { getI18n } from "../../api/i18n";
import { useTranslation } from "../../hook/useTranslation";
import { Coordinates, LangCode, Point, RaddOperator } from "../../model";
import { MapRef } from "react-map-gl/maplibre";

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

const PickupPointsPage: NextPage = () => {
  const { t } = useTranslation(["pickup", "common"]);

  const mapRef = useRef<MapRef>(null);
  const [selectedTab, setSelectedTab] = useState<MOBILE_TABS>("list");
  const [points, setPoints] = useState<RaddOperator[]>([]);
  const [fetchError, setFetchError] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<RaddOperator | null>(null);
  const [searchCoordinates, setSearchCoordinates] =
    useState<Coordinates | null>(null);

  const handleChangeTab = (tabIndex: number) => {
    setSelectedTab(tabIndex === 1 ? "map" : "list");
  };

  const scrollToTarget = (event: MouseEvent | null, target: string) => {
    if (event) {
      event.preventDefault();
    }
    window.parent.postMessage(
      {
        type: "scrollTo",
        target,
      },
      "*"
    );
  };

  const toggleDialog = (open: boolean, pickupPoint?: RaddOperator | null) => {
    scrollToTarget(null, "pickup-point-iframe");
    setIsDialogOpen(open);
    if (pickupPoint) {
      setSelectedPoint(pickupPoint);
    }
  };

  const getData = () => {
    const csvFilePath = "/static/documents/radd-stores-registry.csv";
    Papa.parse(csvFilePath, {
      download: true,
      header: true,
      complete: async (result) => {
        if (result.data && result.data.length > 0) {
          const data = result.data as Array<Point>;
          const pickupPoints = data.map((point) => mapPoint(point));

          setPoints(pickupPoints);
          setFetchError(false);
        }
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
        setFetchError(true);
      },
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Script
        src="/iframe-resizer/child/index.umd.js"
        type="text/javascript"
        id="iframe-resizer-child"
      />

      {!fetchError ? (
        <Grid container sx={{ mt: 4, mb: 2, px: 3 }} spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h4">{t("search.title")}</Typography>

            <Typography mt={2} mb={1} color="textPrimary" variant="body2">
              {t("search.description_1")}
              <b>{t("search.description_2")}</b>. {t("search.description_3")}
            </Typography>

            <ButtonNaked
              color="primary"
              sx={{
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "16px",
                mt: 1,
              }}
              onClick={(e: MouseEvent) =>
                scrollToTarget(e, "come-funzionano-punti-di-ritiro")
              }
            >
              {t("how-it-works")}
            </ButtonNaked>

            <PickupPointsAutocomplete
              mapRef={mapRef}
              points={points}
              searchCoordinates={searchCoordinates}
              setSearchCoordinates={setSearchCoordinates}
              setSelectedPoint={setSelectedPoint}
            />

            <Box sx={{ display: { xs: "flex", md: "none" }, my: 3 }}>
              <Tabs
                tabs={[t("tabs.list"), t("tabs.map")]}
                onTabChange={handleChangeTab}
                breakOnMobile={false}
                buttonSize="small"
                fullWidth
              />
            </Box>

            <Box aria-live="polite" sx={visuallyHidden}>
              {!points || points.length === 0
                ? "Caricamento dei punti di ritiro"
                : `Trovati ${points.length} punti di ritiro`}
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
                points={points}
                toggleDialog={toggleDialog}
                setSelectedPoint={setSelectedPoint}
                selectedPoint={selectedPoint}
                searchCoordinates={searchCoordinates}
                isVisible={selectedTab === "list"}
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
            aria-hidden="true"
          >
            <Box
              sx={{ width: "100%", height: { xs: "500px", md: "1070px" } }}
              tabIndex={-1}
            >
              <PickupPointsMap
                mapRef={mapRef}
                points={points}
                selectedPoint={selectedPoint}
                setSelectedPoint={setSelectedPoint}
                toggleDialog={toggleDialog}
                searchCoordinates={searchCoordinates}
                setSearchCoordinates={setSearchCoordinates}
              />
            </Box>
          </Grid>
        </Grid>
      ) : (
        <ErrorBox
          handleRetry={getData}
          retryLabel={t("retry-cta")}
          sx={{
            mt: 4,
            mb: 2,
            height: { xs: "500px", md: "1000px" },
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary" fontWeight={600}>
            {t("fetch-csv-error")}
          </Typography>
        </ErrorBox>
      )}

      <PickupPointsInfoDialog
        isOpen={isDialogOpen}
        point={selectedPoint}
        toggleDialog={toggleDialog}
        searchCoordinates={searchCoordinates}
      />
    </>
  );
};

export default PickupPointsPage;
