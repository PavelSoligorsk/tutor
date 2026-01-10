import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[\p{L}\p{N}]+/gu, (m) => m) // keep letters and numbers
    .replace(/[^\p{L}\p{N}]+/gu, '-') // replace non letter/digits with hyphen
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}
