import SearchResults from "./SearchResults";
import { getProductsByGenderAndCategory } from "@/services/products";

export interface SearchParams {
  genero: string;
  categorias: string;
}

// Use Next.js built-in PageProps type
interface PageProps {
  searchParams: Promise<SearchParams>;
}

const BusquedaPage = async ({ searchParams }: PageProps) => {
  // Await searchParams since it's always a Promise in Next.js 15
  const resolvedSearchParams = await searchParams;

  const products = await getProductsByGenderAndCategory(
    resolvedSearchParams.genero as Gender,
    resolvedSearchParams.categorias.split(",") as Category[]
  );

  return (
    <div>
      <SearchResults products={products as Product[]} />
    </div>
  );
};

export default BusquedaPage;
