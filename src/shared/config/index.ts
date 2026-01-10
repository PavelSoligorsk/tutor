import { type Grade, type Lesson } from '../types';

export const SITE_CONFIG = {
  name: 'Математика | Репетитор',
  description: 'Обучающий сайт по математике для учеников 5-11 классов',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
} as const;

export const GRADES: Grade[] = [
  { id: '5-6', name: '5-6 класс', slug: '5-6-klass', order: 1 },
  { id: '7', name: '7 класс', slug: '7-klass', order: 2 },
  { id: '8', name: '8 класс', slug: '8-klass', order: 3 },
  { id: '9', name: '9 класс', slug: '9-klass', order: 4 },
  { id: '10', name: '10 класс', slug: '10-klass', order: 5 },
  { id: '11', name: '11 класс', slug: '11-klass', order: 6 },
];

export const LESSONS: Lesson[] = [
  // 7 класс
  {
    id: '7-1',
    title: 'Линейные уравнения и неравенства',
    slug: 'lineynye-uravneniya-neravenstva',
    gradeId: '7',
    order: 1,
  },
  {
    id: '7-2',
    title: 'Одночлены и многочлены',
    slug: 'odnochleny-mnogochleny',
    gradeId: '7',
    order: 2,
  },
  {
    id: '7-3',
    title: 'Системы линейных уравнений',
    slug: 'sistemy-lineynykh-uravneniy',
    gradeId: '7',
    order: 3,
  },
  {
    id: '7-4',
    title: 'Системы и совокупности линейных неравенств',
    slug: 'sistemy-sovokupnosti-lineynykh-neravenstv',
    gradeId: '7',
    order: 4,
  },
  { id: '7-5', title: 'Степени', slug: 'stepeni', gradeId: '7', order: 5 },

  // 8 класс
  { id: '8-1', title: 'Квадратные корни', slug: 'kvadratnye-korni', gradeId: '8', order: 1 },
  {
    id: '8-2',
    title: 'Квадратные уравнения',
    slug: 'kvadratnye-uravneniya',
    gradeId: '8',
    order: 2,
  },
  { id: '8-3', title: 'Функции', slug: 'funktsii', gradeId: '8', order: 3 },

  // 9 класс
  {
    id: '9-1',
    title: 'Арифметическая и геометрическая прогрессии',
    slug: 'progressii',
    gradeId: '9',
    order: 1,
  },
  {
    id: '9-2',
    title: 'Дробно-рациональные уравнения',
    slug: 'drobno-ratsionalnye-uravneniya',
    gradeId: '9',
    order: 2,
  },
  {
    id: '9-3',
    title: 'Дробно-рациональные неравенства',
    slug: 'drobno-ratsionalnye-neravenstva',
    gradeId: '9',
    order: 3,
  },
  { id: '9-4', title: 'Рациональная дробь', slug: 'ratsionalnaya-drob', gradeId: '9', order: 4 },
  {
    id: '9-5',
    title: 'Системы нелинейных уравнений',
    slug: 'sistemy-nelinejnykh-uravnenij',
    gradeId: '9',
    order: 5,
  },
  { id: '9-6', title: 'Функции', slug: 'funktsii', gradeId: '9', order: 6 },

  // 10 класс
  { id: '10-1', title: 'Корень n-ой степени', slug: 'koren-n-oj-stepeni', gradeId: '10', order: 1 },
  { id: '10-2', title: 'Производная', slug: 'proizvodnaya', gradeId: '10', order: 2 },
  { id: '10-3', title: 'Тригонометрия', slug: 'trigonometriya', gradeId: '10', order: 3 },

  // 11 класс
  {
    id: '11-1',
    title: 'Обобщенное понятие степени',
    slug: 'obobshennoe-ponyatie-stepeni',
    gradeId: '11',
    order: 1,
  },
];

export function getLessonsByGrade(gradeId: string): Lesson[] {
  return LESSONS.filter((lesson) => lesson.gradeId === gradeId).sort((a, b) => a.order - b.order);
}

export function getGradeBySlug(slug: string): Grade | undefined {
  return GRADES.find((grade) => grade.slug === slug);
}

export function getLessonBySlug(gradeSlug: string, lessonSlug: string): Lesson | undefined {
  const grade = getGradeBySlug(gradeSlug);
  if (!grade) {
    return undefined;
  }
  return LESSONS.find((lesson) => lesson.gradeId === grade.id && lesson.slug === lessonSlug);
}
