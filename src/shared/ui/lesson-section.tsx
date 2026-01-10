import { type ReactNode } from 'react';

import { cn } from '../lib/utils';

interface LessonSectionProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export function LessonSection({ id, title, children, className }: LessonSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'mb-8 rounded-lg border-l-4 border-primary bg-section p-6 shadow-sm',
        className
      )}
    >
      <h2 className="mb-4 text-xl font-bold text-heading md:text-2xl">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
