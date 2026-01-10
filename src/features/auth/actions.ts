'use server';

import { AuthError } from 'next-auth';

import { signIn, signOut } from './auth';

export async function authenticate(
  _prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  try {
    await signIn('credentials', {
      password: formData.get('password'),
      redirectTo: '/',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Неверный пароль';
        default:
          return 'Произошла ошибка при входе';
      }
    }
    throw error;
  }
  return undefined;
}

export async function signOutAction(): Promise<void> {
  await signOut({ redirectTo: '/login' });
}
