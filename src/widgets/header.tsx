import Link from 'next/link';

import { auth, SignOutButton } from '@/features/auth';

export async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-primary hover:text-primary-dark">
          📐 Математика | Репетитор
        </Link>

        <nav className="flex items-center gap-4">
          {session?.user ? (
            <>
              <span className="text-sm text-gray-600">Привет, {session.user.name}</span>
              <SignOutButton />
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
            >
              Войти
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
