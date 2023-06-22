export function extractImageLinks(imageString) {
  if (!imageString) {
    return [];
  }

  const imageLinks = imageString.split(',').map(link => link.trim());
  return imageLinks;
}
