import { Paper, Stack, Typography } from "@mui/material";

type Props = {
  children: React.ReactNode;
  label: string;
  value?: string;
  notes?: string;
};
const DataCard = ({
  children, label, value, notes
}: Props): JSX.Element => {
  return (
    <Paper
      elevation={8}
      sx={{
        p: 3,
        borderRadius: 2,
        borderLeft: '8px solid #0073E6',
      }}
    >
      <Typography variant="body2" component="h3" sx={{ fontWeight: '600', mb: 3 }}>
        {label}
      </Typography>
      <Stack sx={{ mt: 2 }} direction="column" alignItems="start" spacing={3}>
        <Typography
          sx={{ fontSize: 40, fontWeight: 700, lineHeight: '16px' }}
          component="span"
          color="text"
        >
          {value}
        </Typography>
        {children}
        <Typography component="p" variant="caption" sx={{ mt: 0.5 }}>
          {notes}
        </Typography>
      </Stack>
    </Paper>

  );
};

export default DataCard;
