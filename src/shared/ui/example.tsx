import { type ReactNode } from 'react';

import { cn } from '../lib/utils';

interface ExampleProps {
  title?: string;
  children: ReactNode;
  isHard?: boolean;
  /** Поддержка legacy-пропа из контента: <Example variant="hard"> */
  variant?: string;
  className?: string;
}

export function Example({ title, children, isHard, variant, className }: ExampleProps) {
  const hard = isHard ?? variant === 'hard';
  const resolvedTitle = title ?? (hard ? 'Сложный пример' : 'Пример');

  return (
    <div
      className={cn(
        'my-5 rounded-lg border-l-4 bg-blue-50 p-5',
        hard ? 'border-danger' : 'border-success',
        className
      )}
    >
      <div className={cn('mb-2 text-lg font-bold', hard ? 'text-danger' : 'text-success')}>
        {resolvedTitle}
      </div>
      <div className="text-gray-800">{children}</div>
    </div>
  );
}
