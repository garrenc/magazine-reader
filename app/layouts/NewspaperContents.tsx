import Link from "next/link";
import { getAllArticles } from "../data/articles";
import LayoutSwitcher from "../components/LayoutSwitcher";

export default function NewspaperContents() {
  const articles = getAllArticles();

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
                <Link href="/contents?layout=newspaper" className="text-sm font-medium text-foreground hover:text-muted border-b-2 border-foreground pb-1">
                  Все статьи
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-7xl px-4 py-8">
          <h1 className="mb-8 font-heading text-4xl font-bold text-foreground border-b border-border pb-4">
            Все статьи
          </h1>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <article key={article.slug} className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/article/${article.slug}?layout=newspaper`}>
                  <div className="aspect-video w-full overflow-hidden bg-muted/20">
                    <div className="flex h-full items-center justify-center text-muted text-sm">
                      {article.heroImage ? "[Главное изображение]" : "[Изображение]"}
                    </div>
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/article/${article.slug}?layout=newspaper`}>
                    <h2 className="mb-2 font-heading text-lg font-bold text-foreground hover:text-muted">
                      {article.title}
                    </h2>
                  </Link>
                  <p className="mb-2 text-xs text-muted">{article.author}</p>
                  <p className="text-sm text-foreground line-clamp-3">
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

