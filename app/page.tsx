import MinimalHome from "./layouts/MinimalHome";
import NewspaperHome from "./layouts/NewspaperHome";

interface HomeProps {
  searchParams: { layout?: string };
}

export default function Home({ searchParams }: HomeProps) {
  const layout = searchParams?.layout === "newspaper" ? "newspaper" : "minimal";

  if (layout === "newspaper") {
    return <NewspaperHome />;
  }

  return <MinimalHome />;
}
