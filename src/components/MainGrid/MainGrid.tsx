import { StarIcon } from "../Icons";
import { GridTitle, ProductGrid } from "../Shared";
import { CustomLink } from "../Ui";

const MainGrid = () => {
  return (
    <section className="w-full max-w-wrapper flex flex-col items-center gap-15">
      <GridTitle
        subtitle="Favoritos de la temporada"
        title="Artículos más vendidos"
      />
      <ProductGrid />
      <CustomLink btnTitle="Ver todo" path="/todo" size="large" />
    </section>
  );
};

export default MainGrid;
