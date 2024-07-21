function getColorImages(color) {
  const images = [];

  if (color) {
    // Add the cover image
    if (color.coverImage) {
      images.push(color.coverImage);
    }

    // Add the hover image if it exists
    if (color.hoverImage) {
      images.push(color.hoverImage);
    }

    // Add the other images
    if (Array.isArray(color.images) && color.images.length > 0) {
      images.push(...color.images);
    }
  }

  return images;
}

export default getColorImages;
