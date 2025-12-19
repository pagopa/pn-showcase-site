/**
 * Parses a translation string containing simple HTML-like tags into React elements.
 * @param text - The translation string to parse
 * @returns A React node with the parsed content
 */
export function parseTranslation(text: string): React.ReactNode {
  if (!text) return null;

  const tagRegex = /<(\w+)>(.*?)<\/\1>|<br\s*\/?>/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = tagRegex.exec(text)) !== null) {
    // Add text before the tag
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    // Handle self-closing tags like <br>
    if (match[0].startsWith("<br")) {
      parts.push(<br key={key++} />);
    } else {
      const tag = match[1];
      const content = match[2];

      // Recursively parse nested tags
      const children = parseTranslation(content);

      // Map tags to React elements
      switch (tag) {
        case "strong":
        case "b":
          parts.push(<strong key={key++}>{children}</strong>);
          break;
        case "em":
        case "i":
          parts.push(<em key={key++}>{children}</em>);
          break;
        case "u":
          parts.push(<u key={key++}>{children}</u>);
          break;
        default:
          // For unknown tags, just render the content
          parts.push(<span key={key++}>{children}</span>);
      }
    }

    lastIndex = tagRegex.lastIndex;
  }

  // Add remaining text after the last tag
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length === 0 ? text : parts;
}
