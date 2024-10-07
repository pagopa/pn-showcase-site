import { Typography } from "@mui/material";
import { FaqDescription } from "../../model";

/**
 * A separate component to deal with the polymorphism allowed in the definition of a FAQ item description.
 * Cfr. the definition of the type FaqDescription.
 */
function FaqDescriptionBlock(props: Readonly<{ description: FaqDescription }>) {
  const { description } = props;

  if (typeof description === "string") {
    return <Typography variant="body2">{description}</Typography>;
  } else if (Array.isArray(description)) {
    // in fact the wrapping Fragment is just to have JSX.Element as single return type for FaqDescriptionBlock
    return (
      <>
        {description.map((text, ix) => {
          const isLastChild = ix === description.length - 1;
          return (
            <Typography
              variant="body2"
              key={ix}
              sx={isLastChild ? {} : { mb: "12px" }}
            >
              {text}
            </Typography>
          );
        })}
      </>
    );
  }
  return description;
}

export default FaqDescriptionBlock;
