const getSlidesPerView = (width) => {
  const breakpoints = {
    0: 1.2,
    400: 2.2,
    767: 3.2,
    992: 4.2,
    1200: 6.2,
  };

  let slidesPerView = 1.2; // Default to the smallest breakpoint

  for (const breakpoint in breakpoints) {
    if (width >= breakpoint) {
      slidesPerView = breakpoints[breakpoint];
    } else {
      break;
    }
  }

  return Math.ceil(slidesPerView); // Round up to the next integer
};

export default getSlidesPerView;
