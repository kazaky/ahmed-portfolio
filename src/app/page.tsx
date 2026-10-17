import { site } from "@content/site";
import { workEntries } from "@content/work";
import { PortfolioHome } from "@/components/PortfolioHome";

export default function Home() {
  return <PortfolioHome site={site} work={workEntries} />;
}
