import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getArticleBySlug, getAllArticles } from "../../data/articles";
import ArticlePageClient from "./ArticlePageClient";

interface ArticlePageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export const dynamicParams = false;
export const dynamic = "error";

export default async function ArticlePage({ params }: ArticlePageProps) {
  // Обрабатываем params как Promise или обычный объект
  const resolvedParams = params instanceof Promise ? await params : params;
  const { slug } = resolvedParams;
  
  // Получаем все статьи для отладки
  const allArticles = getAllArticles();
  const article = getArticleBySlug(slug);

  // Если статья не найдена, показываем 404
  if (!article) {
    // В dev режиме можно вывести отладочную информацию
    if (process.env.NODE_ENV === 'development') {
      console.log('Статья не найдена. Slug:', slug);
      console.log('Доступные slugs:', allArticles.map(a => a.slug));
    }
    notFound();
  }

  // Передаем управление клиентскому компоненту для обработки searchParams
  // Обертываем в Suspense, так как useSearchParams требует это
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ArticlePageClient article={article} />
    </Suspense>
  );
}

