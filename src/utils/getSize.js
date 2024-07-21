export const getSize = (color, sizeId) =>
  color.sizes.find((size) => size._id.toString() === sizeId.toString());
