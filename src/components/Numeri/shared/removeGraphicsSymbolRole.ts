// Function to remove the role="graphics-symbol" attribute from path elements
// This resolves accessibility issues with VoiceOver on iOS
export const removeGraphicsSymbolRole = (
  chartContent: React.RefObject<HTMLDivElement>
) => {
  if (!chartContent.current) return;

  const paths = chartContent.current.querySelectorAll(
    'path[role="graphics-symbol"]'
  );
  paths.forEach((path) => {
    path.removeAttribute("role");
  });
};
