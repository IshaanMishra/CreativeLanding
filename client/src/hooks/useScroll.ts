import { useState, useEffect } from "react";

export default function useScroll(threshold: number = 0): number {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll percentage relative to viewport height
      const percent = window.scrollY / window.innerHeight;
      setScrollPercent(percent);
    };

    // Add passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrollPercent;
}