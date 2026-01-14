"use client";

interface ArticleHeaderProps {
  title: string;
  author: string;
  date?: string;
}

export default function ArticleHeader({ title, author, date }: ArticleHeaderProps) {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="mx-auto max-w-[680px] px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Левая часть - навигация назад */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-sm text-muted hover:text-foreground"
            aria-label="Назад"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span className="hidden sm:inline">Назад</span>
          </button>

          {/* Правая часть - кнопки действий */}
          <div className="flex items-center gap-2">
            {/* Кнопка поделиться */}
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: title,
                    text: `Читайте: ${title}`,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Ссылка скопирована в буфер обмена');
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted hover:text-foreground rounded-lg hover:bg-muted/20"
              aria-label="Поделиться"
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              <span className="hidden sm:inline">Поделиться</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

