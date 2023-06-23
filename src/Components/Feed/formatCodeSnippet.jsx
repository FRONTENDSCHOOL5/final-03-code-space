const MAX_LINES = 5;
const MAX_CHARS_PER_LINE = 35;
const ELLIPSIS = '...';

export const formatCodeSnippet = code => {
  const lines = code.split('\n');
  let truncatedCode = lines.slice(0, MAX_LINES).join('\n');

  if (lines.length > MAX_LINES) {
    const remainingLinesCount = lines.length - MAX_LINES;
    const remainingCharsCount = lines[MAX_LINES].length;

    if (remainingCharsCount > MAX_CHARS_PER_LINE) {
      truncatedCode += '\n' + lines[MAX_LINES].slice(0, MAX_CHARS_PER_LINE) + ELLIPSIS;
    } else {
      truncatedCode += '\n' + lines[MAX_LINES];
    }

    if (remainingLinesCount > 1) {
      truncatedCode += '\n' + ELLIPSIS;
    }
  }

  return truncatedCode;
};
