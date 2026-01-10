import { type ReactNode } from 'react';

import { cn } from '../lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  href?: string;
}

export function Card({ children, className, href }: CardProps) {
  const cardClasses = cn(
    'block rounded-xl bg-white p-6 shadow-md transition-all duration-200',
    href && 'hover:shadow-lg hover:-translate-y-1 cursor-pointer',
    className
  );

  if (href) {
    return (
      <a href={href} className={cardClasses}>
        {children}
      </a>
    );
  }

  return <div className={cardClasses}>{children}</div>;
}
