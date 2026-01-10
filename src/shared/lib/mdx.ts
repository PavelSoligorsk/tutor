import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

import { slugify } from './utils';

const contentDirectory = path.join(process.cwd(), 'content');

function extractSectionsFromContent(content: string): { id: string; title: string }[] {
  const sections: { id: string; title: string }[] = [];

  const sectionTagRegex = /<(?:Section|LessonSection)\b([^>]*)>/g;
  let tagMatch: RegExpExecArray | null;
  while ((tagMatch = sectionTagRegex.exec(content))) {
    const attrs = tagMatch[1] ?? '';
    const idMatch = /id\s*=\s*["']([^"']+)["']/.exec(attrs);
    const titleMatch = /title\s*=\s*["']([^"']+)["']/.exec(attrs);

    if (titleMatch?.[1]) {
      const title = titleMatch[1];
      const id = idMatch?.[1] ?? slugify(title);
      sections.push({ id, title });
    }
  }

  if (sections.length > 0) {
    return sections;
  }

  // Fallback: extract H2 headings
  const headingRegex = /^##\s+(.+)$/gm;
  let headingMatch: RegExpExecArray | null;
  while ((headingMatch = headingRegex.exec(content))) {
    const rawTitle = headingMatch[1]?.trim() ?? '';
    if (!rawTitle) {
      continue;
    }
    const title = rawTitle.replace(/[*_`[\]~]/g, '').trim();
    const id = slugify(title);
    sections.push({ id, title });
  }

  return sections;
}

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

  const sectionsFromMeta = data.sections as LessonMeta['sections'] | undefined;
  const extracted = extractSectionsFromContent(content);
  const sections = sectionsFromMeta ?? (extracted.length > 0 ? extracted : undefined);

  const meta = { ...(data as LessonMeta), ...(sections ? { sections } : {}) };

  return {
    meta,
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
