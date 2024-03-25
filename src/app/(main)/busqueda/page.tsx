"use client";
import { useSearchParams } from "next/navigation";

const BusquedaPage = () => {
  const searchParams = useSearchParams();

  const categories = searchParams.get("filtros")?.split(",");
  const gender = searchParams.get("genero");
  console.log({ categories, gender });

  return (
    <div>
      <h1 className="h2">Categorias filtradas</h1>
    </div>
  );
};

export default BusquedaPage;
