/* eslint-disable no-undef */

import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

const root = path.join(process.cwd(), 'content');

function walk(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(p));
    else if (ent.isFile() && p.endsWith('.mdx')) out.push(p);
  }
  return out;
}

const files = walk(root);
let failed = 0;

for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8');
  const { content } = matter(raw);

  try {
    await compileMDX({
      source: content,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkMath],
          rehypePlugins: [rehypeKatex],
        },
      },
    });
  } catch (e) {
    failed++;
    const message = e && typeof e === 'object' && 'message' in e ? String(e.message) : String(e);
    console.error('\nMDX FAIL:', path.relative(process.cwd(), file));
    console.error(message);
  }
}

if (failed) {
  console.error(`\nFAILED: ${failed}/${files.length}`);
  process.exit(1);
}

console.log(`OK: ${files.length} MDX files`);
