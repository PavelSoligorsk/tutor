import { type NextRequest, NextResponse } from 'next/server';

import { GRADES, LESSONS } from '@/shared/config';

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Parse code like "7-1", "8-3", "10-2"
  const match = /^(\d{1,2})-(\d{1,2})$/.exec(code);

  if (!match) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const gradeNum = match[1];
  const lessonNum = parseInt(match[2] ?? '1', 10);

  // Find grade
  const grade = GRADES.find((g) => g.id === gradeNum || g.id === `${gradeNum}`);
  if (!grade) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Find lesson by order
  const lesson = LESSONS.find((l) => l.gradeId === grade.id && l.order === lessonNum);

  if (!lesson) {
    // Redirect to grade page if lesson not found
    return NextResponse.redirect(new URL(`/grade/${grade.slug}`, request.url));
  }

  return NextResponse.redirect(new URL(`/grade/${grade.slug}/${lesson.slug}`, request.url));
}
