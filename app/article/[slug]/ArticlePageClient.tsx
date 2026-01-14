"use client";

import MinimalArticle from "../../layouts/MinimalArticle";
import { Article } from "../../data/articles";

interface ArticlePageClientProps {
  article: Article;
}

export default function ArticlePageClient({ article }: ArticlePageClientProps) {
  return <MinimalArticle article={article} />;
}

