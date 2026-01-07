import { Paper } from "@mui/material";

type Props = {
  children: React.ReactNode;
};
const KpiCard = ({ children }: Props) => (
  <Paper
    elevation={8}
    sx={{
      p: { xs: 4, md: 6 },
      borderRadius: 2,
    }}
  >
    {children}
  </Paper>
);

export default KpiCard;
