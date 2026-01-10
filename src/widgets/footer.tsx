export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50 py-6">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} Математика | Репетитор</p>
        <p className="mt-2">Обучающий сайт по математике для учеников 5-11 классов</p>
      </div>
    </footer>
  );
}
