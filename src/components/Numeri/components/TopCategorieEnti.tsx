import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "../../../hook/useTranslation";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import topCategorieEntiSpec from "../assets/data/top-categorie-enti.vl.json";
import { dashboardColors } from "../shared/colors";
import KpiCard from "./KpiCard";
import TopCategorieEntiChart from "./TopCategorieEntiChart";

type Props = {
  selYear?: number | null;
};

const TopCategorieEnti = ({ selYear }: Props) => {
  const { t } = useTranslation(["numeri"]);

  return (
    <Box sx={{ height: "49rem" }}>
      <KpiCard>
        <Stack direction="column" spacing={2}>
          <TopCategorieEntiChart
            spec={toVegaLiteSpec(topCategorieEntiSpec)}
            yearSignal={selYear}
          />
          <Typography
            sx={{
              color: dashboardColors.get("grey-650"),
              fontSize: "0.875rem",
              lineHeight: "1.125rem",
            }}
          >
            {t("categorie_enti.note_1", { ns: "numeri" })}
          </Typography>
        </Stack>
      </KpiCard>
    </Box>
  );
};

export default TopCategorieEnti;
