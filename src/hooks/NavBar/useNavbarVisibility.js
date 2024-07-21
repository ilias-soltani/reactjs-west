import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useNavbarVisibility = () => {
  const location = useLocation();
  const isCostume = ["/", "/collections"].includes(location.pathname);
  const nav = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (isCostume) {
      const handleScroll = () => {
        if (active && window.scrollY < 500 && window.scrollY > 300) {
          nav.current?.classList.add("hide");
        } else if (window.scrollY > 500) {
          setActive(true);
          nav.current?.classList.remove("hide");
        } else if (window.scrollY < 300) {
          setActive(false);
          nav.current?.classList.remove("hide");
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [active, isCostume]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (nav.current) {
        if (scrollY < 22) {
          nav.current.style.top = `${22 - scrollY}px`;
        } else {
          nav.current.style.top = `0px`;
        }
      }
    };

    setActive(false);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isCostume]);

  return { nav, active, isCostume };
};

export default useNavbarVisibility;
