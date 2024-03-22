import { ProductGrid } from "../Shared";

const MainGrid = () => {
  return (
    <section className="w-full max-w-wrapper flex flex-col items-center gap-15">
      <div className="titleContainer flex flex-col gap-1">
        <p className="b2 text-p-1 text-center">FAVORITOS DE LA TEMPORADA</p>
        <h2 className="text-title text-4xl text-center">
          Artículos más vendidos
        </h2>
      </div>
      <ProductGrid />
    </section>
  );
};

export default MainGrid;
