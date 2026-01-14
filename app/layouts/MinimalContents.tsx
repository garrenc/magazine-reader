import Link from "next/link";
import { getAllArticles } from "../data/articles";
import ArticleImage from "../components/ArticleImage";

export default function MinimalContents() {
  const articles = getAllArticles();

  return (
    <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-4 py-8">
          <h1 className="mb-8 font-heading text-3xl font-bold text-foreground">
            Содержание
          </h1>
          
          <nav>
            <ul className="space-y-6">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/article/${article.slug}`}
                    className="block rounded-lg border border-border bg-background overflow-hidden hover:bg-muted/10 transition-colors"
                  >
                    {article.heroImage && (
                      <div className="w-full aspect-[16/9] overflow-hidden bg-muted/20">
                        <ArticleImage 
                          src={article.heroImage} 
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h2 className="mb-2 font-heading text-xl font-bold text-foreground">
                        {article.title}
                      </h2>
                      <p className="text-sm text-muted">{article.author}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="mt-8">
            <Link
              href="/"
              className="text-muted hover:text-foreground"
            >
              ← На главную
            </Link>
          </div>
        </div>
      </div>
  );
}

