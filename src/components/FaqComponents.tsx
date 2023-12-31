import { Typography } from "@mui/material";

/*
 * Components defined in order to avoid repeating the style definitions
 * for each FAQ item that must be defined using JSX.
 */
export function FaqParagraph(props: {
  children: string | JSX.Element;
  ariaLabel: string;
  flat?: boolean;
}) {
  const mustAppendBottomSpace = props.flat == null || !props.flat;
  return (
    <Typography
      variant="body2"
      component="div"
      sx={mustAppendBottomSpace ? { mb: "12px" } : {}}
      tabIndex={0}
      aria-label={props.ariaLabel}
    >
      {props.children}
    </Typography>
  );
}

export function FaqTextSection(props: {
  children: string | JSX.Element;
  ariaLabel: string;
  noSpaceAfter?: boolean;
}) {
  const mustAppendRightMargin =
    props.noSpaceAfter == null || !props.noSpaceAfter;
  return (
    <Typography
      variant="body2"
      component="span"
      sx={mustAppendRightMargin ? { mr: "4px" } : {}}
      tabIndex={0}
      aria-label={props.ariaLabel}
    >
      {props.children}
    </Typography>
  );
}

export function FaqLink(props: {
  children: string | JSX.Element;
  href?: string;
  noSpaceAfter?: boolean;
}) {
  const mustAppendRightMargin =
    props.noSpaceAfter == null || !props.noSpaceAfter;
  return (
    <Typography
      variant="body2"
      component="span"
      sx={mustAppendRightMargin ? { mr: "4px" } : {}}
    >
      <a href={props.href}>{props.children}</a>
    </Typography>
  );
}
