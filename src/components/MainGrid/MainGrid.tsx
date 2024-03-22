import { StarIcon } from "../Icons";
import { ProductGrid } from "../Shared";
import { CustomLink } from "../Ui";

const MainGrid = () => {
  return (
    <section className="w-full max-w-wrapper flex flex-col items-center gap-15">
      <div className="titleContainer flex flex-col gap-1">
        <p className="l1 lg:b2 text-p-1 text-center">
          FAVORITOS DE LA TEMPORADA
        </p>
        <div className="flex gap-2 items-center">
          <StarIcon />
          <h2 className="h3 text-title  lg:text-4xl text-center">
            Artículos más vendidos
          </h2>
          <StarIcon />
        </div>
      </div>
      <ProductGrid />
      <CustomLink btnTitle="Ver todo" path="/todo" variant="large" />
    </section>
  );
};

export default MainGrid;
