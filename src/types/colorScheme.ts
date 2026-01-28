// tailwindcss gradients safelist: 
// bg-gradient-to-r from-green-600 to-green-700 from-orange-600 to-orange-700 from-blue-600 to-blue-700 from-red-600 to-red-700 from-purple-600 to-purple-700 from-pink-600 to-pink-700 from-yellow-600 to-yellow-700 from-teal-600 to-teal-700 from-indigo-600 to-indigo-700 from-gray-600 to-gray-700 from-gray-900 to-gray-800 from-gray-100 to-gray-300

export type ColorScheme = 'blue' | 'orange' | 'green' | 'red' | 'purple' | 'pink' | 'yellow' | 'teal' | 'indigo' | 'gray' | 'black';

export const getColorClasses = (colorScheme: ColorScheme) => {
  switch (colorScheme) {
    case 'orange':
      return {
        gradient: "from-orange-600 to-orange-700",
        badge: "bg-orange-100 text-orange-800", // improved contrast
        iconBg: "bg-orange-800/40",
        accentColorText: "text-orange-600",
        accentColorBg: "bg-orange-50",
        accentGradient: "from-orange-500 to-orange-600",
        activeItemGradient: "from-orange-50 to-orange-100",
        activeItemText: "text-orange-700",
        activeItemBg: "bg-orange-600",
        focusRing: "focus:ring-orange-400",
        bg: 'bg-orange-500 hover:bg-orange-600',
        link: 'text-orange-600',
        blockquote: 'bg-orange-50 border-orange-500',
        text: "text-orange-600",
        bgHover: "hover:bg-orange-300",
        bgAlt: "bg-orange-200"
      };
    case 'green':
      return {
        gradient: "from-green-600 to-green-700",
        badge: "bg-green-100 text-green-800", // improved contrast
        iconBg: "bg-green-800/40",
        accentColorText: "text-green-600",
        accentColorBg: "bg-green-50",
        accentGradient: "from-green-500 to-green-600",
        activeItemGradient: "from-green-50 to-green-100",
        activeItemText: "text-green-700",
        activeItemBg: "bg-green-600",
        focusRing: "focus:ring-green-400",
        bg: 'bg-green-500 hover:bg-green-600',
        link: 'text-green-600',
        blockquote: 'bg-green-50 border-green-500',
        text: "text-green-600",
        bgHover: "hover:bg-green-300",
        bgAlt: "bg-green-200"
      };
    case 'red':
      return {
        gradient: "from-red-600 to-red-700",
        badge: "bg-red-100 text-red-800", // improved contrast
        iconBg: "bg-red-800/40",
        accentColorText: "text-red-600",
        accentColorBg: "bg-red-50",
        accentGradient: "from-red-500 to-red-600",
        activeItemGradient: "from-red-50 to-red-100",
        activeItemText: "text-red-700",
        activeItemBg: "bg-red-600",
        focusRing: "focus:ring-red-400",
        bg: 'bg-red-500 hover:bg-red-600',
        link: 'text-red-600',
        blockquote: 'bg-red-50 border-red-500',
        text: "text-red-600",
        bgHover: "hover:bg-red-300",
        bgAlt: "bg-red-200"
      };
    case 'purple':
      return {
        gradient: "from-purple-600 to-purple-700",
        badge: "bg-purple-100 text-purple-800", // improved contrast
        iconBg: "bg-purple-800/40",
        accentColorText: "text-purple-600",
        accentColorBg: "bg-purple-50",
        accentGradient: "from-purple-500 to-purple-600",
        activeItemGradient: "from-purple-50 to-purple-100",
        activeItemText: "text-purple-700",
        activeItemBg: "bg-purple-600",
        focusRing: "focus:ring-purple-400",
        bg: 'bg-purple-500 hover:bg-purple-600',
        link: 'text-purple-600',
        blockquote: 'bg-purple-50 border-purple-500',
        text: "text-purple-600",
        bgHover: "hover:bg-purple-300",
        bgAlt: "bg-purple-200"
      };
    case 'blue':
      return {
        gradient: "from-blue-600 to-blue-700",
        badge: "bg-blue-100 text-blue-800", // improved contrast
        iconBg: "bg-blue-800/40",
        accentColorText: "text-blue-600",
        accentColorBg: "bg-blue-50",
        accentGradient: "from-blue-500 to-blue-600",
        activeItemGradient: "from-blue-50 to-blue-100",
        activeItemText: "text-blue-700",
        activeItemBg: "bg-blue-600",
        focusRing: "focus:ring-blue-400",
        bg: 'bg-blue-500 hover:bg-blue-600',
        link: 'text-blue-600',
        blockquote: 'bg-blue-50 border-blue-500',
        text: "text-blue-600",
        bgHover: "hover:bg-blue-300",
        bgAlt: "bg-blue-200"
      };
    case 'pink':
      return {
        gradient: "from-pink-600 to-pink-700",
        badge: "bg-pink-100 text-pink-800", // improved contrast
        iconBg: "bg-pink-800/40",
        accentColorText: "text-pink-600",
        accentColorBg: "bg-pink-50",
        accentGradient: "from-pink-500 to-pink-600",
        activeItemGradient: "from-pink-50 to-pink-100",
        activeItemText: "text-pink-700",
        activeItemBg: "bg-pink-600",
        focusRing: "focus:ring-pink-400",
        bg: 'bg-pink-500 hover:bg-pink-600',
        link: 'text-pink-600',
        blockquote: 'bg-pink-50 border-pink-500',
        text: "text-pink-600",
        bgHover: "hover:bg-pink-300",
        bgAlt: "bg-pink-200"
      };
    case 'yellow':
      return {
        gradient: "from-yellow-600 to-yellow-700",
        badge: "bg-yellow-100 text-yellow-800", // improved contrast
        iconBg: "bg-yellow-800/40",
        accentColorText: "text-yellow-600",
        accentColorBg: "bg-yellow-50",
        accentGradient: "from-yellow-500 to-yellow-600",
        activeItemGradient: "from-yellow-50 to-yellow-100",
        activeItemText: "text-yellow-700",
        activeItemBg: "bg-yellow-600",
        focusRing: "focus:ring-yellow-400",
        bg: 'bg-yellow-500 hover:bg-yellow-600',
        link: 'text-yellow-600',
        blockquote: 'bg-yellow-50 border-yellow-500',
        text: "text-yellow-600",
        bgHover: "hover:bg-yellow-300",
        bgAlt: "bg-yellow-200"
      };
    case 'teal':
      return {
        gradient: "from-teal-600 to-teal-700",
        badge: "bg-teal-100 text-teal-800", // improved contrast
        iconBg: "bg-teal-800/40",
        accentColorText: "text-teal-600",
        accentColorBg: "bg-teal-50",
        accentGradient: "from-teal-500 to-teal-600",
        activeItemGradient: "from-teal-50 to-teal-100",
        activeItemText: "text-teal-700",
        activeItemBg: "bg-teal-600",
        focusRing: "focus:ring-teal-400",
        bg: 'bg-teal-500 hover:bg-teal-600',
        link: 'text-teal-600',
        blockquote: 'bg-teal-50 border-teal-500',
        text: "text-teal-600",
        bgHover: "hover:bg-teal-300",
        bgAlt: "bg-teal-200"
      };
    case 'indigo':
      return {
        gradient: "from-indigo-600 to-indigo-700",
        badge: "bg-indigo-100 text-indigo-800", // improved contrast
        iconBg: "bg-indigo-800/40",
        accentColorText: "text-indigo-600",
        accentColorBg: "bg-indigo-50",
        accentGradient: "from-indigo-500 to-indigo-600",
        activeItemGradient: "from-indigo-50 to-indigo-100",
        activeItemText: "text-indigo-700",
        activeItemBg: "bg-indigo-600",
        focusRing: "focus:ring-indigo-400",
        bg: 'bg-indigo-500 hover:bg-indigo-600',
        link: 'text-indigo-600',
        blockquote: 'bg-indigo-50 border-indigo-500',
        text: "text-indigo-600",
        bgHover: "hover:bg-indigo-300",
        bgAlt: "bg-indigo-200"
      };
    case 'gray':
      return {
        gradient: "from-gray-600 to-gray-700",
        badge: "bg-gray-200 text-gray-800", // improved contrast
        iconBg: "bg-gray-800/40",
        accentColorText: "text-gray-600",
        accentColorBg: "bg-gray-50",
        accentGradient: "from-gray-500 to-gray-600",
        activeItemGradient: "from-gray-50 to-gray-100",
        activeItemText: "text-gray-700",
        activeItemBg: "bg-gray-600",
        focusRing: "focus:ring-gray-400",
        bg: 'bg-gray-500 hover:bg-gray-600',
        link: 'text-gray-600',
        blockquote: 'bg-gray-50 border-gray-500',
        text: "text-gray-600",
        bgHover: "hover:bg-gray-300",
        bgAlt: "bg-gray-200"
      };
    case 'black':
      return {
        gradient: "from-gray-900 to-gray-800",
        badge: "bg-gray-900 text-white", // improved contrast
        iconBg: "bg-black/40",
        accentColorText: "text-black",
        accentColorBg: "bg-gray-100",
        accentGradient: "from-gray-800 to-black",
        activeItemGradient: "from-gray-100 to-gray-200",
        activeItemText: "text-black",
        activeItemBg: "bg-black",
        focusRing: "focus:ring-gray-700",
        bg: 'bg-black hover:bg-gray-800',
        link: 'text-black',
        blockquote: 'bg-gray-100 border-black',
        text: "text-black",
        bgHover: "hover:bg-gray-700",
        bgAlt: "bg-gray-800"
      };
    default:
      return {
        gradient: "from-blue-600 to-indigo-700",
        badge: "bg-blue-900/30 text-blue-100",
        iconBg: "bg-blue-800/40",
        accentColorText: "text-blue-600",
        accentColorBg: "bg-blue-50",
        accentGradient: "from-blue-500 to-blue-600",
        activeItemGradient: "from-blue-50 to-blue-100",
        activeItemText: "text-blue-700",
        activeItemBg: "bg-blue-600",
        focusRing: "focus:ring-blue-400",
        bg: 'bg-blue-500 hover:bg-blue-600',
        link: 'text-blue-600',
        blockquote: 'bg-blue-50 border-blue-500',
        text: "text-blue-600",
        bgHover: "hover:bg-blue-300",
        bgAlt: "bg-blue-200"
      };
  }
};

// Get progress bar color based on color scheme
export const getProgressBarColor = (colorScheme: ColorScheme) => {
  switch (colorScheme) {
    case 'orange':
      return 'bg-orange-500';
    case 'green':
      return 'bg-green-500';
    case 'red':
      return 'bg-red-500';
    case 'purple':
      return 'bg-purple-500';
    case 'pink':
      return 'bg-pink-500';
    case 'yellow':
      return 'bg-yellow-500';
    case 'teal':
      return 'bg-teal-500';
    case 'indigo':
      return 'bg-indigo-500';
    case 'gray':
      return 'bg-gray-500';
    case 'black':
      return 'bg-black-500';
    case 'blue':
    default:
      return 'bg-blue-500';
  }
};

// Color schemes
export const colorSets: Record<ColorScheme, string[]> = {
  blue:    ['#3B82F6', '#2563EB', '#1D4ED8', '#60A5FA', '#93C5FD'],
  orange:  ['#F97316', '#EA580C', '#C2410C', '#FB923C', '#FDBA74'],
  green:   ['#22C55E', '#16A34A', '#15803D', '#4ADE80', '#86EFAC'],
  red:     ['#EF4444', '#DC2626', '#B91C1C', '#F87171', '#FCA5A5'],
  purple:  ['#A855F7', '#9333EA', '#7E22CE', '#C084FC', '#D8B4FE'],
  pink:    ['#EC4899', '#DB2777', '#BE185D', '#F472B6', '#F9A8D4'],
  yellow:  ['#EAB308', '#CA8A04', '#A16207', '#FACC15', '#FDE68A'],
  teal:    ['#14B8A6', '#0D9488', '#115E59', '#2DD4BF', '#5EEAD4'],
  indigo:  ['#6366F1', '#4F46E5', '#3730A3', '#818CF8', '#A5B4FC'],
  gray:    ['#6B7280', '#4B5563', '#374151', '#9CA3AF', '#D1D5DB'],
  black:   ['#000000', '#1F2937', '#111827', '#374151', '#6B7280'],
};