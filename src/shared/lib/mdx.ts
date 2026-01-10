import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface LessonMeta {
  title: string;
  description?: string;
  grade: string;
  order: number;
  sections?: { id: string; title: string }[];
}

export interface LessonContent {
  meta: LessonMeta;
  content: string;
  slug: string;
}

export function getLessonSlugs(grade: string): string[] {
  const gradeDir = path.join(contentDirectory, grade);

  if (!fs.existsSync(gradeDir)) {
    return [];
  }

  return fs
    .readdirSync(gradeDir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace('.mdx', ''));
}

export function getLessonBySlug(grade: string, slug: string): LessonContent | null {
  const filePath = path.join(contentDirectory, grade, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    meta: data as LessonMeta,
    content,
    slug,
  };
}

export function getAllLessons(): LessonContent[] {
  const grades = ['5-6-klass', '7-klass', '8-klass', '9-klass', '10-klass', '11-klass'];
  const lessons: LessonContent[] = [];

  for (const grade of grades) {
    const slugs = getLessonSlugs(grade);

    for (const slug of slugs) {
      const lesson = getLessonBySlug(grade, slug);
      if (lesson) {
        lessons.push(lesson);
      }
    }
  }

  return lessons.sort((a, b) => a.meta.order - b.meta.order);
}

export function getLessonsByGrade(grade: string): LessonContent[] {
  const slugs = getLessonSlugs(grade);
  const lessons: LessonContent[] = [];

  for (const slug of slugs) {
    const lesson = getLessonBySlug(grade, slug);
    if (lesson) {
      lessons.push(lesson);
    }
  }

  return lessons.sort((a, b) => a.meta.order - b.meta.order);
}
