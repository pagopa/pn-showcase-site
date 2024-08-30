import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface CustomInfoblockContentProps {
  title: string;
  children?: ReactNode;
}

const CustomInfoblockContent: React.FC<CustomInfoblockContentProps> = ({
  title,
  children,
}) => {
  return (
    <>
      <Typography variant="h4" color="primary">
        {title}
      </Typography>
      <Box sx={{ pr: { lg: "20%", xs: 0 } }}>{children}</Box>
    </>
  );
};

export default CustomInfoblockContent;
