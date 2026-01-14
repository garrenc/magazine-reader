import Link from "next/link";
import { getAllArticles } from "../data/articles";
import LayoutSwitcher from "../components/LayoutSwitcher";
import MinimalContents from "../layouts/MinimalContents";
import NewspaperContents from "../layouts/NewspaperContents";

interface ContentsPageProps {
  searchParams: { layout?: string };
}

export default function ContentsPage({ searchParams }: ContentsPageProps) {
  const layout = searchParams?.layout === "newspaper" ? "newspaper" : "minimal";

  if (layout === "newspaper") {
    return <NewspaperContents />;
  }

  return <MinimalContents />;
}


