"use client";

import { useSearchParams } from "next/navigation";
import MinimalArticle from "../../layouts/MinimalArticle";
import NewspaperArticle from "../../layouts/NewspaperArticle";
import { Article } from "../../data/articles";

interface ArticlePageClientProps {
  article: Article;
}

export default function ArticlePageClient({ article }: ArticlePageClientProps) {
  const searchParams = useSearchParams();
  const layout = searchParams?.get("layout") === "newspaper" ? "newspaper" : "minimal";

  if (layout === "newspaper") {
    return <NewspaperArticle article={article} />;
  }

  return <MinimalArticle article={article} />;
}

