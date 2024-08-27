import { Box, Stack, Typography } from "@mui/material";
import lastUpdateSpec from "../assets/data/last-update.vl.json";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import KpiWrapper from "./KpiWrapper";
import { useTranslation } from "../../../hook/useTranslation";

const DashboardIntro = () => {
  const { t } = useTranslation(["numeri"]);
  return (
    <Box mb={10}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={0}
        justifyContent="center"
      >
        <Typography color="textSecondary" variant="caption">
          {t("hero.last_update", { ns: "numeri" })} -&nbsp;
        </Typography>
        <Typography color="textSecondary" variant="caption">
          <KpiWrapper spec={toVegaLiteSpec(lastUpdateSpec)} />
        </Typography>
      </Stack>
    </Box>
  );
};

export default DashboardIntro;
