import { GridTitle, ProductGrid } from "../Shared";

import { CustomLink } from "../Ui";
import { MOCK_PRODUCT } from "@/mocks";

const MainGrid = () => {
  const productArray = Array.from({ length: 20 }, () => MOCK_PRODUCT);
  return (
    <section className="w-full max-w-wrapper flex flex-col items-center gap-15">
      <GridTitle
        subtitle="Favoritos de la temporada"
        title="Artículos más vendidos"
      />
      <ProductGrid products={productArray} />
      <CustomLink btnTitle="Ver todo" path="/todo" size="large" />
    </section>
  );
};

export default MainGrid;
