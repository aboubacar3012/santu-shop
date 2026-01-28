// Type for course type
export type CourseType = "course" | "labs" | "quiz";

// Type for lesson
export type Lesson = {
  id: number;
  title: string;
  slug: string;
  description: string;
  duration: number;
};

// Type for course
export type Course = {
  id: number;
  title: string;
  slug: string;
  description: string;
  level: string[]; // Dans les données réelles, level est toujours un tableau de strings
  duration: number;
  icon: string; // Dans les données réelles, icon est une string (emoji), pas un React.ReactNode
  categories: string[];
  popularity: number;
  updatedAt: string;
  type: CourseType;
  // Propriétés optionnelles pour roadmap compatibility
  tags?: string[];
  link?: string;
  imageUrl?: string;
  lessons?: Lesson[];
};
