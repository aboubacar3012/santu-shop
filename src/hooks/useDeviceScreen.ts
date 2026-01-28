"use client";
import { useState, useEffect } from "react";

const useDeviceScreen = () => {
  const [screenSize, setScreenSize] = useState(getScreenSize());

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
    };

    // événement de redimensionnement
    window.addEventListener("resize", handleResize);

    // Nettoyer l'écouteur d'événement lors du démontage du composant
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

const getScreenSize = () => {
  if (typeof window === "undefined") {
    return { isDesktop: false, isTablet: false, isMobile: false };
  }
  const width = window.innerWidth;

  if (width >= 1024) {
    return { isDesktop: true, isTablet: false, isMobile: false };
  } else if (width >= 768 && width < 1024) {
    return { isDesktop: false, isTablet: true, isMobile: false };
  } else {
    return { isDesktop: false, isTablet: false, isMobile: true };
  }
};

export default useDeviceScreen;