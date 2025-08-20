import { Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import { formatHours, OPENING_DAYS } from "@utils/openingHours";
import React from "react";
import { useTranslation } from "src/hook/useTranslation";
import { RaddOperator } from "src/model";

type Props = {
  point: RaddOperator;
};

const OpeningHours: React.FC<Props> = ({ point }) => {
  const { t } = useTranslation(["pickup"]);

  return (
    <List>
      <Typography
        fontSize="16px"
        fontWeight={600}
        color="text.secondary"
        sx={{ px: 0, mb: 1 }}
      >
        {t("drawer.opening-hours")}
      </Typography>
      <ListItem sx={{ px: 0 }}>
        {point?.rawOpeningHours ? (
          <ListItemText
            primary={
              <Typography variant="body2">{point.rawOpeningHours}</Typography>
            }
          />
        ) : (
          <Grid container sx={{ width: "100%" }}>
            {OPENING_DAYS.map((day) => (
              <React.Fragment key={day}>
                <Grid item xs={3} py={1}>
                  <Typography variant="body2">
                    {t(`drawer.days.${day}`)}
                  </Typography>
                </Grid>
                <Grid item xs={9} py={1}>
                  <Typography variant="body2">
                    {formatHours(point?.[day]) || "-"}
                  </Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        )}
      </ListItem>
    </List>
  );
};

export default OpeningHours;
