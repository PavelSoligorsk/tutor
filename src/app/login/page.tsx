import { LoginForm } from '@/features/auth';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Вход',
  description: 'Войдите для доступа к урокам',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-xl bg-white p-8 shadow-lg">
          <div className="mb-6 text-center">
            <h1 className="mb-2 text-2xl font-bold text-heading">🔐 Вход в систему</h1>
            <p className="text-gray-600">Введите пароль для доступа к урокам</p>
          </div>

          <LoginForm />

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Пароль предоставляется репетитором</p>
          </div>
        </div>
      </div>
    </div>
  );
}
