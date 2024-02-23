import { Card } from "@mui/material";

type Props = {
  className?: string;
  cardClass?: string;
  children: React.ReactNode;
};
const CardWrapper = ({
  className,
  cardClass,
  children,
}: Props): JSX.Element => {
  return (
  <Card sx={{height: '100%'}}>
   {children}
  </Card>
  );
};

export default CardWrapper;
