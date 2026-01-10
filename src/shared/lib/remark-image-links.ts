interface MdxNodeBase {
  type?: string;
}

interface MdxParentNode extends MdxNodeBase {
  children?: MdxNode[];
}

interface MdxParagraphNode extends MdxParentNode {
  type: 'paragraph';
  children: MdxNode[];
}

interface MdxLinkNode extends MdxParentNode {
  type: 'link';
  url: string;
  title?: string | null;
  children: MdxNode[];
}

interface MdxTextNode extends MdxNodeBase {
  type: 'text';
  value: string;
}

interface MdxImageNode extends MdxNodeBase {
  type: 'image';
  url: string;
  alt?: string;
  title?: string | null;
}

type MdxNode = MdxParagraphNode | MdxLinkNode | MdxTextNode | MdxImageNode | MdxParentNode;

function isImageUrl(rawUrl: string): boolean {
  const url = rawUrl.trim();
  if (!url) {
    return false;
  }

  // Inline images like data:image/png;base64,...
  if (url.startsWith('data:image/')) {
    return true;
  }

  const withoutHash = url.split('#')[0] ?? '';
  const withoutQuery = (withoutHash.split('?')[0] ?? '').toLowerCase();

  return /\.(png|jpe?g|gif|webp|avif|svg)$/.test(withoutQuery);
}

function walk(node: MdxNode, fn: (node: MdxNode) => void) {
  fn(node);
  if (!('children' in node) || !Array.isArray(node.children)) {
    return;
  }
  for (const child of node.children) {
    walk(child, fn);
  }
}

function isParagraphNode(node: MdxNode): node is MdxParagraphNode {
  return node.type === 'paragraph' && Array.isArray((node as MdxParentNode).children);
}

function isLinkNode(node: MdxNode): node is MdxLinkNode {
  return (
    node.type === 'link' &&
    typeof (node as MdxLinkNode).url === 'string' &&
    Array.isArray((node as MdxParentNode).children)
  );
}

function getSingleTextChildValue(node: MdxParentNode): string | null {
  if (!Array.isArray(node.children) || node.children.length !== 1) {
    return null;
  }

  const only = node.children[0];
  if (only?.type !== 'text') {
    return null;
  }

  return typeof (only as MdxTextNode).value === 'string' ? (only as MdxTextNode).value : null;
}

/**
 * Remark plugin: превращает standalone-ссылки на изображения в настоящие картинки.
 *
 * Пример:
 * - https://site.com/a.png           -> <img src="..." />
 * - [описание](https://.../a.jpg)    -> <img alt="описание" src="..." />  (если ссылка стоит отдельным абзацем)
 */
export function remarkImageLinks() {
  return (tree: MdxNode) => {
    walk(tree, (node) => {
      if (!isParagraphNode(node)) {
        return;
      }
      if (node.children.length !== 1) {
        return;
      }

      const only = node.children[0];
      if (!only || !isLinkNode(only)) {
        return;
      }

      const { url } = only;
      if (!isImageUrl(url)) {
        return;
      }

      const title = typeof only.title === 'string' ? only.title : null;

      const linkText = getSingleTextChildValue(only) ?? '';

      // Для автоссылок alt обычно равен самому URL — это не очень красиво.
      const alt = linkText && linkText !== url ? linkText : '';

      node.children = [
        {
          type: 'image',
          url,
          alt,
          title,
        } satisfies MdxImageNode,
      ];
    });
  };
}
