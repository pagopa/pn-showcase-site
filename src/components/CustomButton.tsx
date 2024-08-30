import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button } from "@mui/material";

type CustomButtonProps = {
  href: string;
  text: string;
};

const CustomButton: React.FC<CustomButtonProps> = ({ href, text }) => (
  <Button
    size="small"
    color="primary"
    href={href}
    sx={{
      fontSize: "16px",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      paddingTop: "8px",
    }}
  >
    {text}
    <ArrowForwardIcon sx={{ fontSize: "16px", ml: 0.5 }} />
  </Button>
);

export default CustomButton;
