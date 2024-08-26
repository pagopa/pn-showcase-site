import { IFaqDataSection } from "src/model";
import FaqDataItemBlock, { ActiveItemProps } from "./FaqDataItemBlock";
import { Box, Typography } from "@mui/material";

function FaqDataSectionBlock(
  props: { section: IFaqDataSection } & ActiveItemProps
) {
  const { section, setActiveItem, activeItem } = props;

  return (
    <Box
      id={section.title.replace(/\s+/g, "-").toLowerCase()}
      sx={{ pb: "64px" }}
    >
      <Typography variant="h4" sx={{ pb: "48px" }} component="h4">
        {section.title}
      </Typography>
      {section.items.map((item) => (
        <FaqDataItemBlock
          item={item}
          setActiveItem={setActiveItem}
          key={item.id}
          activeItem={activeItem}
        />
      ))}
    </Box>
  );
}

export default FaqDataSectionBlock;
