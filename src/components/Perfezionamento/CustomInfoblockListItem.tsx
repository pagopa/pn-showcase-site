import { ListItem, Typography } from "@mui/material";

interface CustomInfoblockListItemProps {
  title: string;
  content: string;
}

const CustomInfoblockListItem: React.FC<CustomInfoblockListItemProps> = ({
  title,
  content,
}) => {
  return (
    <ListItem sx={{ display: "list-item", pl: 0, pt: 0, pb: 0.5 }}>
      <Typography variant="body2">
        <b>{title}</b>
        {content}
      </Typography>
    </ListItem>
  );
};

export default CustomInfoblockListItem;
