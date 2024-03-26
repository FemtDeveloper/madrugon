"use client";
import { Suspense } from "react";
import SearchResults from "./SearchResults";

const BusquedaPage = () => {
  return (
    <div>
      <Suspense>
        <SearchResults />
      </Suspense>
    </div>
  );
};

export default BusquedaPage;
