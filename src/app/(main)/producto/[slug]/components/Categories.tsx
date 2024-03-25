import React from "react";

interface Props {
  category: string;
  gender: string;
}

const Categories = ({ category, gender }: Props) => {
  return (
    <div className="flex lg:flex-col gap-4 justify-between  shadow-3xl rounded-xl p-3 px-8 lg:p-6">
      <div>
        <h2 className="text-xl font-bold tracking-wider">Categoría</h2>
        <h2 className="text-xl tracking-wider">{category}</h2>
      </div>
      <div>
        <h2 className="text-xl font-bold tracking-wider">Genero</h2>
        <h2 className="text-xl tracking-wider">{gender}</h2>
      </div>
    </div>
  );
};

export default Categories;
