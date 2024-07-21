export function findAvailableSize(color) {
  const availableSize = color.sizes.find((size) => size.sizeQuantity !== 0);
  return availableSize ? availableSize : null;
}
