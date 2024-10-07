import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface DocCardButton {
  label: string;
  color: string;
  link: string;
  icon?: JSX.Element;
}

type Props = {
  title: string;
  description?: string;
  buttons: Array<DocCardButton>;
};

const DocCard: React.FC<Props> = ({ title, description, buttons }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Card className="documentiCustomCardContent">
        <CardContent sx={{ textAlign: "left" }}>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          {description && (
            <Typography variant="body2">{description}</Typography>
          )}
        </CardContent>
        <CardActions>
          <Stack direction="column" spacing={1}>
            {buttons.map((button) => (
              <Button
                key={button.label}
                size="small"
                color="primary"
                href={button.link}
                endIcon={button.icon || <ArrowForwardIcon />}
                sx={{ justifyContent: "start" }}
                disableRipple={true}
              >
                {button.label}
              </Button>
            ))}
          </Stack>
        </CardActions>
      </Card>
    </Box>
  );
};

export default DocCard;
