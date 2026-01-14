"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setShowPrompt(false);
      setDeferredPrompt(null);
    }
  };

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md rounded-lg border border-border bg-background p-4 shadow-lg md:left-auto">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <h3 className="mb-1 font-heading text-sm font-bold text-foreground">
            Установить приложение
          </h3>
          <p className="text-xs text-muted">
            Добавьте МедиаБосс на главный экран для быстрого доступа
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setShowPrompt(false);
            }}
            className="text-sm text-muted hover:text-foreground"
            aria-label="Закрыть"
          >
            ✕
          </button>
          <button
            onClick={handleInstall}
            className="rounded bg-foreground px-3 py-1.5 text-sm font-medium text-background hover:opacity-90"
            aria-label="Установить"
          >
            Установить
          </button>
        </div>
      </div>
    </div>
  );
}

