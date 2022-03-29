export function sanitizeTextContent(content) {
  return content.replaceAll('<', '&lt;');
}