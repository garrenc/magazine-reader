import Link from "next/link";
import LayoutSwitcher from "../components/LayoutSwitcher";
import ArticleImage from "../components/ArticleImage";
import { getAllArticles } from "../data/articles";

export default function NewspaperHome() {
  const articles = getAllArticles();
  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <>
      <LayoutSwitcher currentLayout="newspaper" />
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
          {/* Featured Article */}
          {featuredArticle && (
            <div className="mb-12 grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <Link href={`/article/${featuredArticle.slug}?layout=newspaper`}>
                  <div className="mb-4 aspect-video w-full overflow-hidden rounded-lg bg-muted/20 relative">
                    {featuredArticle.heroImage ? (
                      <ArticleImage src={featuredArticle.heroImage} alt={featuredArticle.title} />
                    ) : (
                      <div className="flex h-full items-center justify-center text-muted">
                        [Изображение]
                      </div>
                    )}
                  </div>
                </Link>
                <Link href={`/article/${featuredArticle.slug}?layout=newspaper`}>
                  <h1 className="mb-2 font-heading text-3xl font-bold leading-tight text-foreground hover:text-muted">
                    {featuredArticle.title}
                  </h1>
                </Link>
                <p className="mb-4 text-sm text-muted">{featuredArticle.author}</p>
                <p className="text-foreground line-clamp-3">
                  {featuredArticle.content.replace(/<[^>]*>/g, "").substring(0, 200)}...
                </p>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                <div>
                  <h2 className="mb-4 font-heading text-xl font-bold text-foreground border-b border-border pb-2">
                    Последние новости
                  </h2>
                  <ul className="space-y-4">
                    {otherArticles.map((article) => (
                      <li key={article.slug}>
                        <Link
                          href={`/article/${article.slug}?layout=newspaper`}
                          className="block group"
                        >
                          <h3 className="mb-1 font-heading text-base font-bold text-foreground group-hover:text-muted">
                            {article.title}
                          </h3>
                          <p className="text-xs text-muted">{article.author}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Articles Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {otherArticles.map((article) => (
              <article key={article.slug} className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/article/${article.slug}?layout=newspaper`}>
                  <div className="aspect-video w-full overflow-hidden bg-muted/20 relative">
                    {article.heroImage ? (
                      <ArticleImage src={article.heroImage} alt={article.title} />
                    ) : (
                      <div className="flex h-full items-center justify-center text-muted text-sm">
                        [Изображение]
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/article/${article.slug}?layout=newspaper`}>
                    <h2 className="mb-2 font-heading text-lg font-bold text-foreground hover:text-muted">
                      {article.title}
                    </h2>
                  </Link>
                  <p className="mb-2 text-xs text-muted">{article.author}</p>
                  <p className="text-sm text-foreground line-clamp-2">
                    {article.content.replace(/<[^>]*>/g, "").substring(0, 150)}...
                  </p>
                </div>
              </article>
            ))}
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

