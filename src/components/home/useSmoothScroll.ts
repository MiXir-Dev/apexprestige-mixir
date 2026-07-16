import { useEffect } from "react";

const scrollToHash = () => {
  const hash = window.location.hash;
  if (!hash) return;

  const element = document.querySelector(hash);
  if (!element) return;

  setTimeout(() => {
    element.scrollIntoView({ behavior: "smooth" });
  }, 100);
};

export const useSmoothScroll = () => {
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target || target.tagName !== "A") return;

      const href = target.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const id = href.substring(1);
      const element = document.getElementById(id);
      if (!element) return;

      event.preventDefault();
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    document.addEventListener("click", handleAnchorClick);
    scrollToHash();

    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);
};
