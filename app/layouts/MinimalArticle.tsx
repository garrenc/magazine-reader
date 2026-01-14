import ProgressIndicator from "../components/ProgressIndicator";
import LayoutSwitcher from "../components/LayoutSwitcher";
import ArticleHeader from "../components/ArticleHeader";
import ArticleImage from "../components/ArticleImage";
import { Article } from "../data/articles";

interface MinimalArticleProps {
  article: Article;
}

export default function MinimalArticle({ article }: MinimalArticleProps) {
  return (
    <>
      <LayoutSwitcher currentLayout="minimal" />
      <ProgressIndicator />
      <ArticleHeader title={article.title} author={article.author} />
      
      <article className="min-h-screen bg-background">
        <div className="mx-auto max-w-[680px] px-4 py-8">
          <header className="mb-8 pt-4">
            <h1 className="mb-4 font-heading text-3xl font-bold leading-tight text-foreground">
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
        </div>
      </article>
    </>
  );
}

