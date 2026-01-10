const fs = require('fs');

function slugify(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

const content = fs.readFileSync('content/9-klass/funktsii.mdx', 'utf8');

function extractSectionsFromContent(content) {
  const sections = [];

  const sectionTagRegex = /<(?:Section|LessonSection)\b([^>]*)>/g;
  let tagMatch;
  while ((tagMatch = sectionTagRegex.exec(content))) {
    const attrs = tagMatch[1] || '';
    const idMatch = /id\s*=\s*["']([^"']+)["']/.exec(attrs);
    const titleMatch = /title\s*=\s*["']([^"']+)["']/.exec(attrs);

    if (titleMatch && titleMatch[1]) {
      const title = titleMatch[1];
      const id = (idMatch && idMatch[1]) ? idMatch[1] : slugify(title);
      sections.push({ id, title });
    }
  }

  if (sections.length > 0) {
    return sections;
  }

  const headingRegex = /^##\s+(.+)$/gm;
  let headingMatch;
  while ((headingMatch = headingRegex.exec(content))) {
    const rawTitle = (headingMatch[1] || '').trim();
    if (!rawTitle) continue;
    const title = rawTitle.replace(/[*_`[\]~]/g, '').trim();
    const id = slugify(title);
    sections.push({ id, title });
  }

  return sections;
}

console.log(JSON.stringify(extractSectionsFromContent(content), null, 2));
