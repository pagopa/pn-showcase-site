import { Box, Stack, Typography } from "@mui/material";
import { dashboardColors } from "../shared/colors";

type Props = {
  title: string;
  children: React.ReactNode;
  text?: string;
};

const SectionLayout = ({ title, children, text }: Props) => (
  <Box component="section" marginBottom={12}>
    <Box marginBottom={6}>
      <Typography
        component="h2"
        sx={{
          color: dashboardColors.get("primary"),
          fontSize: "2.375rem",
          fontWeight: 700,
          lineHeight: "3.125rem",
          mb: 1,
        }}
      >
        {title}
      </Typography>
      <Typography
        component="p"
        sx={{
          color: dashboardColors.get("primary"),
          fontSize: "1.125rem",
          fontWeight: 400,
          lineHeight: "1.5rem",
        }}
      >
        {text}
      </Typography>
    </Box>

    <Stack direction={{ xs: "column" }} spacing={{ xs: 2, md: 6 }}>
      {children}
    </Stack>
  </Box>
);
export default SectionLayout;
