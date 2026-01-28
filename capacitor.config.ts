import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.cloudhero.app",
  appName: "CloudHero",
  // webDir: "out",
  backgroundColor: "#ffffff",
  server: {
    url: "https://cloudhero-frontend.vercel.app/learning/",
    // url: "http://192.168.1.23:3001", // now
  },
  ios: {
    //contentInset: 'always', // 'automatic' | 'scrollableAxes' | 'never' | 'always'
    backgroundColor: "#fff",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      launchFadeOutDuration: 2000,
      backgroundColor: "#fff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "small",
      iosSpinnerStyle: "small",
      spinnerColor: "#999",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true,
    },
    
  },
};

export default config;
