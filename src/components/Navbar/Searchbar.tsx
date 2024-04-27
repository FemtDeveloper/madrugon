"use client";
import { useMutation } from "@tanstack/react-query";
import { debounce } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useMemo, ChangeEvent } from "react";

import { getProductsBySearchNavbar } from "@/services/products";


import { SearchIcon } from "../Icons";


const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    mutate: searchProducts,
    data: products,
    isError,
    error,
  } = useMutation({
    mutationFn: () => getProductsBySearchNavbar(searchTerm),
  });

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  useEffect(() => {
    const handler = debounce(() => {
      if (searchTerm) {
        searchProducts();
      }
    }, 2000);

    handler();

    return handler.cancel;
  }, [searchTerm, searchProducts]);

  const productResults = useMemo(() => {
    return products?.length && searchTerm.length > 0 ? products : [];
  }, [products, searchTerm]);

  return (
    <div className="relative searchbar border border-neutral-300 w-full rounded-lg my-3 max-w-[193px] sm:max-w-full lg:max-w-[520px] h-8 lg:h-14 p-2 lg:p-4 flex items-center gap-3">
      <SearchIcon />
      <input
        type="text"
        placeholder="Buscar productos..."
        spellCheck={false}
        value={searchTerm}
        onChange={handleSearchChange}
        className="l1 lg:b1 focus:outline-none max-w-36 lg:max-w-max"
      />
      {isError && <div>Error: {error?.message}</div>}
      {productResults.length > 0 && searchTerm.length > 0 && (
        <div className="absolute top-14 w-full bg-white border border-neutral-200 rounded-xl shadow-2xl py-4 px-4 left-0">
          <ul className="flex flex-col gap-3">
            {productResults.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/producto/${product.slug}`}
                  className="b1 flex justify-between items-center"
                  onClick={() => setSearchTerm("")}
                >
                  <p className="hover:scale-105 duration-200">{product.name}</p>
                  {product.images && (
                    <Image
                      src={product.images[0]}
                      width={100}
                      height={100}
                      quality={100}
                      alt="thumbnail"
                      className="h-14 w-14 object-cover rounded-md"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
