"use client";

interface CoverImageProps {
  src: string;
  alt: string;
}

export default function CoverImage({ src, alt }: CoverImageProps) {
  return (
    <div className="mb-8 aspect-[3/4] w-full overflow-hidden rounded-lg bg-muted/20 relative">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent && !parent.querySelector('.fallback')) {
            const fallback = document.createElement('div');
            fallback.className = 'fallback flex h-full items-center justify-center text-muted';
            fallback.textContent = 'Обложка журнала';
            parent.appendChild(fallback);
          }
        }}
      />
    </div>
  );
}

