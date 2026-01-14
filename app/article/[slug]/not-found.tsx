import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <h1 className="mb-4 font-heading text-3xl font-bold text-foreground">
        Статья не найдена
      </h1>
      <p className="mb-8 text-muted">
        Запрошенная статья не существует.
      </p>
      <Link
        href="/contents"
        className="text-foreground underline"
      >
        Вернуться к содержанию
      </Link>
    </div>
  );
}


