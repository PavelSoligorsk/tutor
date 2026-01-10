'use client';

import { cn } from '../lib/utils';

interface Section {
  id: string;
  title: string;
}

interface BottomNavProps {
  sections: Section[];
  className?: string;
}

export function BottomNav({ sections, className }: BottomNavProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const element = document.getElementById(event.target.value);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white p-4 shadow-lg',
        className
      )}
    >
      <div className="mx-auto max-w-4xl">
        <select
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          defaultValue=""
        >
          <option value="" disabled>
            Перейти к разделу...
          </option>
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.title}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
}
