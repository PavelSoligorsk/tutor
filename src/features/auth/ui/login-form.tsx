'use client';

import { useActionState } from 'react';

import { Button, Input } from '@/shared/ui';

import { authenticate } from '../actions';

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-4">
        <Input
          id="password"
          type="password"
          name="password"
          label="Пароль"
          placeholder="Введите пароль"
          required
          disabled={isPending}
        />
      </div>

      {errorMessage && (
        <div className="rounded-lg bg-danger/10 p-3 text-center text-sm text-danger">
          {errorMessage}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Вход...' : 'Войти'}
      </Button>
    </form>
  );
}
