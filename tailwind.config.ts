import type { Config } from "tailwindcss";
// @ts-expect-error: error
import safeAreaPlugin from "tailwindcss-safe-area-capacitor";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Safelist for gradient backgrounds
    "bg-gradient-to-r",
    "from-green-600", "to-green-700",
    "from-orange-600", "to-orange-700",
    "from-blue-600", "to-blue-700",
    "from-red-600", "to-red-700",
    "from-purple-600", "to-purple-700",
    "from-pink-600", "to-pink-700",
    "from-yellow-600", "to-yellow-700",
    "from-teal-600", "to-teal-700",
    "from-indigo-600", "to-indigo-700",
    "from-gray-600", "to-gray-700",
    "from-gray-900", "to-gray-800",
    "from-gray-100", "to-gray-300",

    // Safelist for solid colors
    'bg-orange-500', 'hover:bg-orange-600',
    'bg-green-500', 'hover:bg-green-600',
    'bg-red-500', 'hover:bg-red-600',
    'bg-purple-500', 'hover:bg-purple-600',
    'bg-blue-500', 'hover:bg-blue-600',
    'bg-pink-500', 'hover:bg-pink-600',
    'bg-yellow-500', 'hover:bg-yellow-600',
    'bg-teal-500', 'hover:bg-teal-600',
    'bg-indigo-500', 'hover:bg-indigo-600',
    'bg-gray-500', 'hover:bg-gray-600',
    'bg-black', 'hover:bg-gray-800',
    'bg-orange-200', 'bg-green-200', 'bg-red-200', 'bg-purple-200', 'bg-blue-200', 'bg-pink-200', 'bg-yellow-200', 'bg-teal-200', 'bg-indigo-200', 'bg-gray-200', 'bg-gray-800',
    'hover:bg-orange-300', 'hover:bg-green-300', 'hover:bg-red-300', 'hover:bg-purple-300', 'hover:bg-blue-300', 'hover:bg-pink-300', 'hover:bg-yellow-300', 'hover:bg-teal-300', 'hover:bg-indigo-300', 'hover:bg-gray-300', 'hover:bg-gray-700'
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [safeAreaPlugin],
};
export default config;
