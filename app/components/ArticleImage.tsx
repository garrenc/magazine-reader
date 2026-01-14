"use client";

interface ArticleImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ArticleImage({ src, alt, className = "w-full h-full object-cover" }: ArticleImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.parentElement?.classList.add('hidden');
      }}
    />
  );
}

