import { type ReactNode } from 'react';

import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import {
  Definition,
  Example,
  Explanation,
  ImageContainer,
  LessonSection,
  MathFormula,
} from '@/shared/ui';

const components = {
  LessonSection,
  Definition,
  Example,
  Explanation,
  MathFormula,
  ImageContainer,
  // Alias для простоты использования
  Math: MathFormula,
  Section: LessonSection,
  Def: Definition,
  Ex: Example,
  Img: ImageContainer,
  // HTML элементы с кастомными стилями
  h1: ({ children }: { children: ReactNode }) => (
    <h1 className="mb-6 text-3xl font-bold text-heading">{children}</h1>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <h2 className="mb-4 mt-8 text-2xl font-bold text-heading">{children}</h2>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <h3 className="mb-3 mt-6 text-xl font-semibold text-heading">{children}</h3>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="my-4 leading-relaxed text-gray-700">{children}</p>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="my-4 list-disc space-y-2 pl-6 text-gray-700">{children}</ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="my-4 list-decimal space-y-2 pl-6 text-gray-700">{children}</ol>
  ),
  li: ({ children }: { children: ReactNode }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }: { children: ReactNode }) => (
    <strong className="font-bold text-heading">{children}</strong>
  ),
  em: ({ children }: { children: ReactNode }) => (
    <em className="italic text-primary">{children}</em>
  ),
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="my-4 border-l-4 border-primary bg-blue-50 py-2 pl-4 italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-gray-200" />,
  // Table components
  table: ({ children }: { children: ReactNode }) => (
    <div className="my-4 overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200">{children}</table>
    </div>
  ),
  thead: ({ children }: { children: ReactNode }) => (
    <thead className="bg-gray-100">{children}</thead>
  ),
  tbody: ({ children }: { children: ReactNode }) => <tbody>{children}</tbody>,
  tr: ({ children }: { children: ReactNode }) => (
    <tr className="border-b border-gray-200">{children}</tr>
  ),
  th: ({ children }: { children: ReactNode }) => (
    <th className="border border-gray-200 bg-gray-100 px-4 py-2 text-left font-semibold">
      {children}
    </th>
  ),
  td: ({ children }: { children: ReactNode }) => (
    <td className="border border-gray-200 px-4 py-2">{children}</td>
  ),
};

interface MDXContentProps {
  source: string;
}

export function MDXContent({ source }: MDXContentProps) {
  const options: MDXRemoteProps['options'] = {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [rehypeKatex],
    },
  };

  return (
    <div className="mdx-content">
      <MDXRemote source={source} components={components} options={options} />
    </div>
  );
}
