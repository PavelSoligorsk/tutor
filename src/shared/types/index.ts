export interface Grade {
  id: string;
  name: string;
  slug: string;
  order: number;
}

export interface Lesson {
  id: string;
  title: string;
  slug: string;
  gradeId: string;
  order: number;
  description?: string;
}

export interface LessonSection {
  id: string;
  title: string;
  content: string;
}

export interface User {
  id: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
}
