import { useEffect } from "react";

export const Scroll = (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
  useEffect(() => {
    const handleScroll = () => setIsOpen(false);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setIsOpen]);
};