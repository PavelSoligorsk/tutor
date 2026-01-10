import { type ReactNode } from 'react';

import { cn } from '../lib/utils';

interface DefinitionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Definition({ title = 'Определение', children, className }: DefinitionProps) {
  return (
    <div className={cn('my-5 rounded-lg bg-definition p-5', className)}>
      <div className="mb-2 text-lg font-bold text-primary-dark">{title}</div>
      <div className="text-gray-800">{children}</div>
    </div>
  );
}
