import Link from "next/link";
import CoverImage from "../components/CoverImage";
import { getCoverImage, getIssueTitle } from "../data/issue-config";

export default function MinimalHome() {
  const coverImage = getCoverImage();
  const issueTitle = getIssueTitle();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-md text-center">
          {coverImage ? (
            <CoverImage src={coverImage} alt="Обложка журнала" />
          ) : (
            <div className="mb-8 aspect-[3/4] w-full overflow-hidden rounded-lg bg-muted/20 flex items-center justify-center text-muted">
              Обложка журнала
            </div>
          )}
          
          <h1 className="mb-4 font-heading text-3xl font-bold text-foreground">
            {issueTitle}
          </h1>
          
          <p className="mb-8 text-muted">
            Цифровая версия журнала
          </p>
          
          <Link
            href="/contents"
            className="inline-block w-full rounded-lg bg-foreground px-6 py-4 text-center font-medium text-background"
          >
          Читать выпуск
        </Link>
      </div>
    </div>
  );
}

