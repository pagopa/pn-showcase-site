import { List } from "@mui/material";
import { ReactNode } from "react";

interface CustomInfoblockListProps {
  children: ReactNode;
}

const CustomInfoblockList: React.FC<CustomInfoblockListProps> = ({
  children,
}) => {
  return <List sx={{ listStyleType: "disc", pl: 4 }}>{children}</List>;
};

export default CustomInfoblockList;
