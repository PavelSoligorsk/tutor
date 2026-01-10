import { type ReactNode, isValidElement, type ReactElement } from 'react';

import { compileMDX, type MDXRemoteProps } from 'next-mdx-remote/rsc';
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

import { remarkImageLinks } from './remark-image-links';
import { slugify } from './utils';

interface MdxImgProps {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

function parseOptionalNumber(value: unknown): number | undefined {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : undefined;
  }

  if (typeof value === 'string') {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
}

function getPlainText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getPlainText).join('');
  }
  if (isValidElement(node)) {
    const element = node as ReactElement;
    const maybeProps = element as unknown as { props?: { children?: ReactNode } };
    return getPlainText(maybeProps.props?.children);
  }
  return '';
}

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
  // Markdown/HTML изображения: ![alt](src) и <img src="..." />
  img: ({ src, alt, width, height, className }: MdxImgProps) => {
    if (!src) {
      return null;
    }

    const parsedWidth = parseOptionalNumber(width);
    const parsedHeight = parseOptionalNumber(height);

    return (
      <ImageContainer
        src={src}
        alt={alt ?? ''}
        width={parsedWidth}
        height={parsedHeight}
        className={className}
      />
    );
  },
  // HTML элементы с кастомными стилями
  h1: ({
    children,
    id,
    ...props
  }: { children: ReactNode; id?: string } & React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = getPlainText(children);
    const computedId = id ?? slugify(text);
    return (
      <h1 id={computedId} {...props} className="mb-6 text-3xl font-bold text-heading">
        {children}
      </h1>
    );
  },
  h2: ({
    children,
    id,
    ...props
  }: { children: ReactNode; id?: string } & React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = getPlainText(children);
    const computedId = id ?? slugify(text);
    return (
      <h2 id={computedId} {...props} className="mb-4 mt-8 text-2xl font-bold text-heading">
        {children}
      </h2>
    );
  },
  h3: ({
    children,
    id,
    ...props
  }: { children: ReactNode; id?: string } & React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = getPlainText(children);
    const computedId = id ?? slugify(text);
    return (
      <h3 id={computedId} {...props} className="mb-3 mt-6 text-xl font-semibold text-heading">
        {children}
      </h3>
    );
  },

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

export async function MDXContent({ source }: MDXContentProps) {
  const options: MDXRemoteProps['options'] = {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath, remarkImageLinks],
      rehypePlugins: [rehypeKatex],
    },
  };

  try {
    const { content } = await compileMDX({
      source,
      components,
      options,
    });

    return <div className="mdx-content">{content}</div>;
  } catch (error) {
    // Не валим весь рендер страницы из-за опечатки в MDX.
    let details: string | null = null;

    if (error instanceof Error) {
      // Для ошибок JS — показываем сообщение и логируем сам Error.
      if (process.env.NODE_ENV !== 'production') {
        details = error.message;
      }
      console.error('[MDX] compile error:', error);
    } else {
      const errorText = String(error);
      if (process.env.NODE_ENV !== 'production') {
        details = errorText;
      }
      console.error('[MDX] compile error:', errorText);
    }

    return (
      <div className="mdx-content">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          <div className="mb-1 font-semibold">Не удалось отобразить урок</div>
          <div className="text-red-800">
            В контенте урока есть ошибка разметки MDX. Исправьте файл в папке{' '}
            <code className="rounded bg-white/60 px-1 py-0.5">content/</code>.
          </div>
          {details && (
            <pre className="mt-3 whitespace-pre-wrap rounded bg-white/60 p-3 text-xs text-red-950">
              {details}
            </pre>
          )}
        </div>
      </div>
    );
  }
}
