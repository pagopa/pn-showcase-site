import { Button } from "@mui/material";
import { dashboardColors } from "../shared/colors";

export default function AlertButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Button
      sx={{
        color: dashboardColors.get("icon"),
        whiteSpace: "nowrap",
      }}
      href="https://www.dati.gov.it/view-dataset?Cerca=&tags_set=send&tags=send&ordinamento=&organization=pagopa-s-p-a"
      size="small"
      target="_parent"
    >
      {children}
    </Button>
  );
}
