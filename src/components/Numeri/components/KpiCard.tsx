import { Paper, Typography } from "@mui/material";

type Props = {
  children: React.ReactNode;
  label: string;
  subLabel?: string;
  borderLeft?: string;
};
const KpiCard = ({
  children,
  label,
  subLabel,
  borderLeft = "8px solid #0073E6",
}: Props) => {
  return (
    <Paper
      elevation={8}
      sx={{
        p: 3,
        borderRadius: 2,
        borderLeft,
      }}
    >
      <Typography
        variant="body2"
        component="h3"
        sx={{ fontWeight: "600", mb: 1 }}
      >
        {label}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        {subLabel}
      </Typography>

      {children}
    </Paper>
  );
};

export default KpiCard;
