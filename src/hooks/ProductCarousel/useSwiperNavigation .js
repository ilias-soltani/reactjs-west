// hooks/useSwiperNavigation.js

import { useState, useEffect } from "react";

const useSwiperNavigation = (swiperInstance) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (swiperInstance) {
      const updateNavigation = () => {
        setIsBeginning(swiperInstance.isBeginning);
        setIsEnd(swiperInstance.isEnd);
      };

      swiperInstance.on("slideChange", updateNavigation);
      swiperInstance.on("init", updateNavigation);

      // Initial check
      updateNavigation();

      // Cleanup
      return () => {
        swiperInstance.off("slideChange", updateNavigation);
        swiperInstance.off("init", updateNavigation);
      };
    }
  }, [swiperInstance]);

  return { isBeginning, isEnd };
};

export default useSwiperNavigation;
