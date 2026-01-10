import { type ReactNode } from 'react';

import { cn } from '../lib/utils';

interface ExplanationProps {
  children: ReactNode;
  className?: string;
}

export function Explanation({ children, className }: ExplanationProps) {
  return (
    <div className={cn('my-4 rounded-lg bg-warning/20 p-4 text-gray-800', className)}>
      {children}
    </div>
  );
}
