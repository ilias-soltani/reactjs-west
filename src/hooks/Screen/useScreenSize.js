import { useState, useEffect } from "react";

const useScreenSize = () => {
  const getScreenSize = () => {
    const width = window.innerWidth;
    if (width <= 767) return "small";
    if (width <= 992) return "medium";
    return "large";
  };

  const [screenSize, setScreenSize] = useState(getScreenSize());

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
};

export default useScreenSize;
