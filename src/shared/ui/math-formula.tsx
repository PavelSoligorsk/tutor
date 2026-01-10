'use client';

import { type ReactNode, useEffect, useRef } from 'react';

import katex from 'katex';

import { cn } from '../lib/utils';

interface MathFormulaProps {
  children: ReactNode;
  display?: boolean;
  className?: string;
}

// Извлекает текст из ReactNode (поддержка вложенных элементов)
function extractTextFromChildren(children: ReactNode): string {
  if (typeof children === 'string') {
    return children;
  }
  if (typeof children === 'number') {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join('');
  }
  if (children && typeof children === 'object' && 'props' in children) {
    const element = children as { props?: { children?: ReactNode } };
    if (element.props?.children) {
      return extractTextFromChildren(element.props.children);
    }
  }
  return '';
}

export function MathFormula({ children, display = false, className }: MathFormulaProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const formula = extractTextFromChildren(children).trim();

  useEffect(() => {
    if (containerRef.current && formula) {
      try {
        katex.render(formula, containerRef.current, {
          displayMode: display,
          throwOnError: false,
          strict: false,
        });
      } catch (error) {
        console.error('KaTeX rendering error:', error);
        containerRef.current.textContent = formula;
      }
    }
  }, [formula, display]);

  return (
    <span
      ref={containerRef}
      className={cn(display ? 'my-4 block text-center text-lg' : 'inline', className)}
    />
  );
}
