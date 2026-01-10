# Tutor

## Структура проекта

```text
src/
├── app/                    # Next.js App Router
│   ├── api/                # API Routes
│   ├── grade/[grade]/      # Страницы классов
│   ├── login/              # Страница входа
│   └── page.tsx            # Главная страница
├── features/               # Фичи (FSD)
│   └── auth/               # Аутентификация
├── widgets/                # Виджеты (FSD)
│   ├── header.tsx
│   ├── footer.tsx
│   └── ...
├── shared/                 # Общий код (FSD)
│   ├── ui/                 # UI компоненты
│   ├── lib/                # Утилиты
│   ├── config/             # Конфигурация
│   └── types/              # Типы
└── proxy.ts                # Proxy (ex-middleware) для защиты роутов

content/                    # MDX контент уроков
├── 7-klass/
├── 8-klass/
└── ...
```

## Установка

```bash
# Клонирование
git clone <repo>
cd tutor

# Установка зависимостей
bun install

# Копирование env
cp .env.example .env.local

# Запуск dev сервера
bun run dev
```

## Скрипты

| Команда             | Описание                  |
| ------------------- | ------------------------- |
| `bun run dev`       | Запуск dev сервера        |
| `bun run build`     | Сборка для production     |
| `bun run start`     | Запуск production сервера |
| `bun run lint`      | Проверка ESLint           |
| `bun run lint:fix`  | Исправление ESLint ошибок |
| `bun run format`    | Форматирование Prettier   |
| `bun run typecheck` | Проверка типов TypeScript |

## Добавление контента

Контент уроков хранится в папке `content/` в формате MDX.

### Структура MDX файла

```mdx
---
title: Название урока
description: Описание урока
grade: 7-klass
order: 1
sections:
  - id: theory
    title: Теория
  - id: examples
    title: Примеры
---

<Section id="theory" title="Теория">

<Def title="Определение">Текст определения с формулой: $ax^2 + bx + c = 0$</Def>

<Ex title="Пример 1">Решение примера...</Ex>

<Ex title="Сложный пример" isHard>
  Решение сложного примера...
</Ex>

</Section>
```

### Доступные компоненты

- `<Section>` - секция урока
- `<Def>` / `<Definition>` - определение
- `<Ex>` / `<Example>` - пример (с `isHard` для сложных)
- `<Explanation>` - пояснение
- `<Img>` / `<ImageContainer>` - изображение

### Математические формулы

- Inline: `$формула$`
- Block: `$$формула$$`

## Аутентификация

Используются пароли из оригинального проекта. Для добавления новых паролей отредактируйте файл `src/features/auth/auth.config.ts`.
