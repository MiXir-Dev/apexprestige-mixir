import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "auto" }); 
        }, 0);
      });
    };

    scrollToTop();
  }, [pathname]);

  return null;
};

export default ScrollToTop;
