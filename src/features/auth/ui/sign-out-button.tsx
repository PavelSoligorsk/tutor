'use client';

import { Button } from '@/shared/ui';

import { signOutAction } from '../actions';

interface SignOutButtonProps {
  className?: string;
}

export function SignOutButton({ className }: SignOutButtonProps) {
  return (
    <form action={signOutAction}>
      <Button type="submit" variant="ghost" className={className}>
        Выйти
      </Button>
    </form>
  );
}
