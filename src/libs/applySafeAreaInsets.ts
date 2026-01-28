import { SafeArea } from "capacitor-plugin-safe-area";
import { Capacitor } from "@capacitor/core";

const applySafeAreaInsets = async () => {
  try {
    // Vérifier si nous sommes sur une plateforme native
    if (!Capacitor.isNativePlatform()) {
      console.log(
        "Not running on a native platform, skipping safe area insets"
      );
      // Pour les tests en développement web, on peut définir des valeurs par défaut
      if (process.env.NODE_ENV === "development") {
        document.documentElement.style.setProperty(
          "--safe-area-inset-top",
          "20px"
        );
        document.documentElement.style.setProperty(
          "--safe-area-inset-bottom",
          "20px"
        );
        document.documentElement.style.setProperty(
          "--safe-area-inset-left",
          "0px"
        );
        document.documentElement.style.setProperty(
          "--safe-area-inset-right",
          "0px"
        );
      }
      return;
    }

    // S'assurer que le plugin est disponible
    if (!SafeArea) {
      console.error("SafeArea plugin is not available");
      return;
    }

    const safeAreaData = await SafeArea.getSafeAreaInsets();
    const { insets } = safeAreaData;

    console.log("Safe area insets:", insets);

    for (const [key, value] of Object.entries(insets)) {
      document.documentElement.style.setProperty(
        `--safe-area-inset-${key}`,
        `${value}px`
      );
    }
  } catch (error) {
    console.error("Error applying safe area insets:", error);
  }
};

export default applySafeAreaInsets;
