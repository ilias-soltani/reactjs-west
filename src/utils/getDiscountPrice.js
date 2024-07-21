const getDiscountPrice = (price, discount) => {
  return price - price * (discount / 100);
};

export default getDiscountPrice;
