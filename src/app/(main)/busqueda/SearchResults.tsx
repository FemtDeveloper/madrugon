import { useSearchParams } from "next/navigation";

const SearchResults = () => {
  const searchParams = useSearchParams();

  const categories = searchParams.get("categorias")?.split(",");
  const gender = searchParams.get("genero");
  console.log({ categories, gender });
  return <div></div>;
};

export default SearchResults;