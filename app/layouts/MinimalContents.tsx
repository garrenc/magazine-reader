import Link from "next/link";
import { getAllArticles } from "../data/articles";
import LayoutSwitcher from "../components/LayoutSwitcher";

export default function MinimalContents() {
  const articles = getAllArticles();

  return (
    <>
      <LayoutSwitcher currentLayout="minimal" />
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-4 py-8">
          <h1 className="mb-8 font-heading text-3xl font-bold text-foreground">
            Содержание
          </h1>
          
          <nav>
            <ul className="space-y-4">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/article/${article.slug}?layout=minimal`}
                    className="block rounded-lg border border-border bg-background p-4 hover:bg-muted/10"
                  >
                    <h2 className="mb-2 font-heading text-xl font-bold text-foreground">
                      {article.title}
                    </h2>
                    <p className="text-sm text-muted">{article.author}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="mt-8">
            <Link
              href="/?layout=minimal"
              className="text-muted hover:text-foreground"
            >
              ← На главную
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

