import { type ReactNode } from 'react';

import { cn } from '../lib/utils';

interface ExampleProps {
  title: string;
  children: ReactNode;
  isHard?: boolean;
  className?: string;
}

export function Example({ title, children, isHard = false, className }: ExampleProps) {
  return (
    <div
      className={cn(
        'my-5 rounded-lg border-l-4 bg-blue-50 p-5',
        isHard ? 'border-danger' : 'border-success',
        className
      )}
    >
      <div className={cn('mb-2 text-lg font-bold', isHard ? 'text-danger' : 'text-success')}>
        {title}
      </div>
      <div className="text-gray-800">{children}</div>
    </div>
  );
}
