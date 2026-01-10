import Link from 'next/link';

import { type Grade, type Lesson } from '@/shared/types';

interface LessonListProps {
  grade: Grade;
  lessons: Lesson[];
}

export function LessonList({ grade, lessons }: LessonListProps) {
  return (
    <div className="space-y-3">
      {lessons.map((lesson, index) => (
        <Link
          key={lesson.id}
          href={`/grade/${grade.slug}/${lesson.slug}`}
          className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-primary hover:shadow-md"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
            {index + 1}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-heading">{lesson.title}</h3>
            {lesson.description && (
              <p className="mt-1 text-sm text-gray-600">{lesson.description}</p>
            )}
          </div>
          <span className="text-gray-400">→</span>
        </Link>
      ))}
    </div>
  );
}
