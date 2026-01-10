import Link from 'next/link';
import { notFound } from 'next/navigation';

import { LessonList } from '@/widgets';

import { GRADES, getLessonsByGrade, getGradeBySlug } from '@/shared/config';

import type { Metadata } from 'next';

function getLessonWord(count: number): string {
  if (count === 1) {
    return 'урок';
  }
  if (count < 5) {
    return 'урока';
  }
  return 'уроков';
}

interface GradePageProps {
  params: Promise<{ grade: string }>;
}

export function generateStaticParams() {
  return GRADES.map((grade) => ({
    grade: grade.slug,
  }));
}

export async function generateMetadata({ params }: GradePageProps): Promise<Metadata> {
  const { grade: gradeSlug } = await params;
  const grade = getGradeBySlug(gradeSlug);

  if (!grade) {
    return { title: 'Класс не найден' };
  }

  return {
    title: grade.name,
    description: `Уроки математики для ${grade.name}`,
  };
}

export default async function GradePage({ params }: GradePageProps) {
  const { grade: gradeSlug } = await params;
  const grade = getGradeBySlug(gradeSlug);

  if (!grade) {
    notFound();
  }

  const lessons = getLessonsByGrade(grade.id);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <Link href="/" className="text-primary hover:underline">
          Главная
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-600">{grade.name}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-heading">{grade.name}</h1>
        <p className="text-gray-600">
          {lessons.length} {getLessonWord(lessons.length)} доступно
        </p>
      </header>

      {/* Lessons List */}
      {lessons.length > 0 ? (
        <LessonList grade={grade} lessons={lessons} />
      ) : (
        <div className="rounded-lg bg-yellow-50 p-6 text-center">
          <p className="text-yellow-800">Уроки для этого класса пока не добавлены</p>
        </div>
      )}
    </div>
  );
}
