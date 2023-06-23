export function extractImageLinks(imageString) {
  if (!imageString) {
    return [];
  }

  const imageLinks = imageString.split(',').map(link => {
    const trimmedLink = link.trim();
    return { url: trimmedLink };
  });

  return imageLinks;
}
