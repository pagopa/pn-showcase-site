import { Box, Grid, Link, Typography } from "@mui/material";
import { langCodes } from "@utils/constants";
import { mapPoint } from "@utils/map";
import type { GetStaticPaths, NextPage } from "next";
import Script from "next/script";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import PickupPointsList from "src/components/PickupPointsList";
import PickupPointsMap from "src/components/PickupPointsMap";
import PickupPointsInfoDrawer from "src/components/Ritiro/PickupPointsInfoDrawer";
import Tabs from "src/components/Tabs";
import { getI18n } from "../../api/i18n";
import { useTranslation } from "../../hook/useTranslation";
import { Coordinates, LangCode, Point, RaddOperator } from "../../model";
import PickupPointsAutocomplete from "src/components/PickupPointsAutocomplete";

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

  const [selectedTab, setSelectedTab] = useState<MOBILE_TABS>("list");
  const [points, setPoints] = useState<RaddOperator[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<RaddOperator | null>(null);
  const [targetPoint, setTargetPoint] = useState<Coordinates | null>(null);

  const handleChangeTab = (tabIndex: number) => {
    setSelectedTab(tabIndex === 1 ? "map" : "list");
  };

  const toggleDrawer = (open: boolean, pickupPoint?: RaddOperator | null) => {
    setIsDrawerOpen(open);
    if (pickupPoint) {
      setSelectedPoint(pickupPoint);
    }
  };

  useEffect(() => {
    const csvFilePath = "/static/documents/radd-stores-registry.csv";
    Papa.parse(csvFilePath, {
      download: true,
      header: true,
      complete: async (result) => {
        if (result.data && result.data.length > 0) {
          const data = result.data as Array<Point>;
          const pickupPoints = data.map((point, index) =>
            mapPoint(point, index)
          );

          setPoints(pickupPoints);
        }
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  }, []);

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
          <Typography variant="h4">{t("search.title")}</Typography>

          <Typography mt={2} mb={1} color="textPrimary" variant="body2">
            {t("search.description_1")}
            <strong>{t("search.description_2")}</strong>.{" "}
            {t("search.description_3")}
          </Typography>

          <Link
            href="#come-funzionano-punti-di-ritiro"
            color="primary"
            fontWeight={700}
            sx={{ textDecoration: "none" }}
          >
            {t("how-it-works")}
          </Link>

          <PickupPointsAutocomplete setTargetPoint={setTargetPoint} />

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
              points={points}
              toggleDrawer={toggleDrawer}
              setSelectedPoint={setSelectedPoint}
              selectedPoint={selectedPoint}
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
            <PickupPointsMap
              points={points}
              selectedPoint={selectedPoint}
              setSelectedPoint={setSelectedPoint}
              toggleDrawer={toggleDrawer}
              targetPoint={targetPoint}
            />
          </Box>
        </Grid>
      </Grid>

      <PickupPointsInfoDrawer
        isOpen={isDrawerOpen}
        point={selectedPoint}
        toggleDrawer={toggleDrawer}
      />
    </>
  );
};

export default MappaPuntiDiRitiroPage;
