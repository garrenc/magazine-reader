import Link from "next/link";
import ProgressIndicator from "../components/ProgressIndicator";
import ArticleHeader from "../components/ArticleHeader";
import LayoutSwitcher from "../components/LayoutSwitcher";
import ArticleImage from "../components/ArticleImage";
import { Article, getAllArticles } from "../data/articles";

interface NewspaperArticleProps {
  article: Article;
}

export default function NewspaperArticle({ article }: NewspaperArticleProps) {
  const allArticles = getAllArticles();
  const relatedArticles = allArticles.filter(a => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <LayoutSwitcher currentLayout="newspaper" />
      <ProgressIndicator />
      <ArticleHeader title={article.title} author={article.author} />
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/?layout=newspaper" className="font-heading text-2xl font-bold text-foreground">
                МедиаБосс
              </Link>
              <nav className="hidden md:flex gap-6">
                <Link href="/?layout=newspaper" className="text-sm font-medium text-foreground hover:text-muted">
                  Главная
                </Link>
                <Link href="/contents?layout=newspaper" className="text-sm font-medium text-foreground hover:text-muted">
                  Все статьи
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Article Content */}
            <article className="lg:col-span-2">
              <header className="mb-8">
                <h1 className="mb-4 font-heading text-4xl font-bold leading-tight text-foreground">
                  {article.title}
                </h1>
                <p className="text-muted">{article.author}</p>
              </header>

              {article.heroImage && (
                <div className="mb-8 aspect-video w-full overflow-hidden rounded-lg bg-muted/20 relative">
                  <ArticleImage src={article.heroImage} alt={article.title} />
                </div>
              )}

              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                  <div>
                    <h2 className="mb-4 font-heading text-xl font-bold text-foreground border-b border-border pb-2">
                      Похожие статьи
                    </h2>
                    <ul className="space-y-4">
                      {relatedArticles.map((relatedArticle) => (
                        <li key={relatedArticle.slug}>
                          <Link
                            href={`/article/${relatedArticle.slug}?layout=newspaper`}
                            className="block group"
                          >
                            <h3 className="mb-1 font-heading text-base font-bold text-foreground group-hover:text-muted">
                              {relatedArticle.title}
                            </h3>
                            <p className="text-xs text-muted">{relatedArticle.author}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Newsletter/Subscribe Section */}
                <div className="border border-border rounded-lg p-6 bg-muted/5">
                  <h3 className="mb-2 font-heading text-lg font-bold text-foreground">
                    Подписка
                  </h3>
                  <p className="mb-4 text-sm text-muted">
                    Получайте последние статьи прямо на почту
                  </p>
                  <button className="w-full rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90">
                    Подписаться
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 border-t border-border bg-muted/5">
          <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="text-center text-sm text-muted">
              <p>© 2024 МедиаБосс. Все права защищены.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

