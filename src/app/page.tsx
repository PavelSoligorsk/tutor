import { auth } from '@/features/auth';

import { GradeCard } from '@/widgets';

import { GRADES, getLessonsByGrade } from '@/shared/config';

export default async function HomePage() {
  const session = await auth();
  const isAuthenticated = !!session?.user;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-heading md:text-5xl">
          📐 Математика | Репетитор
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Добро пожаловать на обучающий сайт по математике! Выберите класс, чтобы начать изучение
          материала.
        </p>
      </section>

      {/* Quick Navigation */}
      {isAuthenticated && (
        <section className="mb-8">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold text-heading">🚀 Быстрый переход</h2>
            <p className="mb-4 text-sm text-gray-600">
              Введите код урока (например: 7-1, 8-3, 10-2) для быстрого перехода
            </p>
            <QuickNavForm />
          </div>
        </section>
      )}

      {/* Grades Grid */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-heading">Выберите класс</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {GRADES.map((grade) => {
            const lessons = getLessonsByGrade(grade.id);
            return (
              <GradeCard
                key={grade.id}
                grade={grade}
                lessonsCount={lessons.length}
                isLocked={!isAuthenticated}
              />
            );
          })}
        </div>
      </section>

      {/* Info Section */}
      {!isAuthenticated && (
        <section className="mt-12 rounded-lg bg-primary/10 p-6 text-center">
          <h2 className="mb-2 text-xl font-bold text-heading">🔐 Требуется авторизация</h2>
          <p className="text-gray-600">
            Для доступа к урокам необходимо войти в систему. Введите пароль на странице входа.
          </p>
        </section>
      )}
    </div>
  );
}

function QuickNavForm() {
  return (
    <form action="/api/quick-nav" method="GET" className="flex gap-4">
      <input
        type="text"
        name="code"
        placeholder="Например: 7-1"
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        pattern="^\d{1,2}-\d{1,2}$"
      />
      <button
        type="submit"
        className="rounded-lg bg-primary px-6 py-2 font-medium text-white hover:bg-primary-dark"
      >
        Перейти
      </button>
    </form>
  );
}
