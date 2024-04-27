import { getProductsByGenderAndCategory } from "@/services/products";

import SearchResults from "./SearchResults";

export interface SearchParams {
  genero: string;
  categorias: string;
}
interface Params {
  searchParams: SearchParams;
}

const BusquedaPage = async ({ searchParams }: Params) => {
  const products = await getProductsByGenderAndCategory(
    searchParams.genero as Gender,
    searchParams.categorias.split(",") as Category[]
  );
  return (
    <div>
      <SearchResults products={products as Product[]} />
    </div>
  );
};

export default BusquedaPage;
