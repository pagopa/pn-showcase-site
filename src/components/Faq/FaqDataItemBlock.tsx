import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { IFaqDataItem } from "../../model";
import FaqDescriptionBlock from "./FaqDescriptionBlock";

type SetActiveItemFunction = (
  itemId: string
) => (_: any, isExpanded: boolean) => void;

export type ActiveItemProps = {
  setActiveItem: SetActiveItemFunction;
  activeItem: string | null;
};

// recall: the FAQ contains many sections, each section contains many items.
// A separate component is defined to render each level in this hierarchy.
function FaqDataItemBlock(props: { item: IFaqDataItem } & ActiveItemProps) {
  const { item, setActiveItem, activeItem } = props;

  return (
    <Box id={item.id} sx={{ mb: "16px" }}>
      <Accordion
        onChange={setActiveItem(item.id)}
        expanded={item.id === activeItem}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {item.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ mr: 4, textAlign: "justify" }}>
            <FaqDescriptionBlock description={item.description} />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default FaqDataItemBlock;
