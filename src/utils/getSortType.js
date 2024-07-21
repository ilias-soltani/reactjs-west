export const sortType = [
  {
    dispaly: "Relevance",
    sort: "-colors.discount",
  },
  {
    dispaly: "Best selling",
    sort: "-sold",
  },
  {
    dispaly: "Alphabetically: A-Z",
    sort: "title",
  },
  {
    dispaly: "Alphabetically: Z-A",
    sort: "-title",
  },
  {
    dispaly: "Price: low to high",
    sort: "price",
  },
  {
    dispaly: "Price: high to low",
    sort: "-price",
  },
  {
    dispaly: "Date: old to new",
    sort: "updatedAt",
  },
  {
    dispaly: "Date: new to old",
    sort: "-updatedAt",
  },
];

export const getSortType = (display) => {
  if (!display) {
    return {
      dispaly: "Relevance",
      sort: "",
    };
  }

  const result = sortType.find(
    (item) => item.dispaly.toLowerCase() === display.toLowerCase()
  );

  if (result) {
    return result;
  } else {
    return {
      dispaly: "Relevance",
      sort: "",
    };
  }
};
