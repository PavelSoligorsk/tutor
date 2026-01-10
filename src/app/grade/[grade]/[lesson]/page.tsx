import Link from 'next/link';
import { notFound } from 'next/navigation';

import { GRADES, LESSONS, getGradeBySlug, getLessonBySlug } from '@/shared/config';
import { getLessonBySlug as getMDXLesson } from '@/shared/lib/mdx';
import { MDXContent } from '@/shared/lib/mdx-components';
import { BottomNav } from '@/shared/ui';

import type { Metadata } from 'next';

interface LessonPageProps {
  params: Promise<{ grade: string; lesson: string }>;
}

export function generateStaticParams() {
  const params: { grade: string; lesson: string }[] = [];

  for (const grade of GRADES) {
    const lessons = LESSONS.filter((l) => l.gradeId === grade.id);
    for (const lesson of lessons) {
      params.push({
        grade: grade.slug,
        lesson: lesson.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { grade: gradeSlug, lesson: lessonSlug } = await params;
  const grade = getGradeBySlug(gradeSlug);
  const lesson = getLessonBySlug(gradeSlug, lessonSlug);

  if (!grade || !lesson) {
    return { title: 'Урок не найден' };
  }

  return {
    title: `${lesson.title} | ${grade.name}`,
    description: lesson.description ?? `Урок: ${lesson.title} для ${grade.name}`,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { grade: gradeSlug, lesson: lessonSlug } = await params;
  const grade = getGradeBySlug(gradeSlug);
  const lessonMeta = getLessonBySlug(gradeSlug, lessonSlug);

  if (!grade || !lessonMeta) {
    notFound();
  }

  // Try to get MDX content
  const mdxLesson = getMDXLesson(gradeSlug, lessonSlug);

  // Default sections for bottom nav
  const sections = mdxLesson?.meta.sections ?? [
    { id: 'theory', title: 'Теория' },
    { id: 'examples', title: 'Примеры' },
    { id: 'practice', title: 'Практика' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 pb-24">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <Link href="/" className="text-primary hover:underline">
          Главная
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link href={`/grade/${grade.slug}`} className="text-primary hover:underline">
          {grade.name}
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-600">{lessonMeta.title}</span>
      </nav>

      {/* Lesson Number Badge */}
      <div className="mb-4">
        <span className="inline-block rounded-full bg-primary px-3 py-1 text-sm font-medium text-white">
          Урок {lessonMeta.order}
        </span>
      </div>

      {/* Header */}
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-heading md:text-4xl">{lessonMeta.title}</h1>
        {lessonMeta.description && (
          <p className="text-lg text-gray-600">{lessonMeta.description}</p>
        )}
      </header>

      {/* Content */}
      <article className="rounded-xl bg-white p-6 shadow-md md:p-8">
        {mdxLesson ? (
          <MDXContent source={mdxLesson.content} />
        ) : (
          <div className="text-center text-gray-500">
            <p className="mb-4 text-lg">Контент урока ещё не добавлен.</p>
            <p className="text-sm">
              Создайте файл <code className="rounded bg-gray-100 px-2 py-1">{lessonSlug}.mdx</code>{' '}
              в папке <code className="rounded bg-gray-100 px-2 py-1">content/{gradeSlug}/</code>
            </p>
          </div>
        )}
      </article>

      {/* Bottom Navigation */}
      <BottomNav sections={sections} />
    </div>
  );
}
