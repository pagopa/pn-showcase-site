import { Card, CardContent, Typography } from "@mui/material";
import CustomButton from "../CustomButton";

export interface CardProps {
  title?: string;
  href: string;
  text: string;
}

const AssistanceCard: React.FC<CardProps> = ({ title, href, text }) => (
  <Card
    sx={{
      width: "100%",
      maxWidth: "350px",
      boxShadow: "0px 8px 38px 7px #002b551a",
      borderRadius: "16px",
      textAlign: "center",
      wordWrap: "break-word",
      display: "grid",
      justifyContent: "center",
      alignItems: "center",
      padding: "24px 0px",
    }}
  >
    <CardContent>
      <Typography
        variant="h6"
        sx={{ color: "#17324D", wordBreak: "break-word" }}
      >
        {title}
      </Typography>
      <CustomButton href={href} text={text} />
    </CardContent>
  </Card>
);

export default AssistanceCard;
