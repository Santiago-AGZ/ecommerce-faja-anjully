// ProductsPage.tsx
import { useState } from "react";
import { allFajas } from "../data/initialData";
import { prepareProducts } from "../helpers";
import { ContainerFilter } from "../components/products/ContainerFilter";
import { CardProduct } from "../components/products/CardProduct";
import { PreparedProduct } from "../interfaces";
import { Pagination } from "@/components/shared/Pagination";

export const ProductsPage = () => {
  const [page, setPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLines, setSelectedLines] = useState<string[]>([]);

  const preparedProducts: PreparedProduct[] = prepareProducts(allFajas);

  const filteredProducts = preparedProducts.filter((product) => {
    const categoryName = product.category || "";
    const lineName = product.line || "";

    // Sin filtros, mostrar todo
    if (selectedCategories.length === 0) return true;

    // Si seleccionó Complementos y es complemento, mostrar
    if (
      selectedCategories.includes("Complementos") &&
      categoryName === "Complementos"
    ) {
      return true;
    }

    // Si seleccionó Fajas y es faja
    if (selectedCategories.includes("Fajas") && categoryName === "Fajas") {
      // Si no hay líneas seleccionadas, mostrar
      if (selectedLines.length === 0) return true;
      // Si hay líneas, mostrar solo si coincide la línea
      if (selectedLines.includes(lineName)) return true;

      return false;
    }

    // Si no cumple ninguna condición, no mostrar
    return false;
  });

  return (
    <>
      <h1 className="text-5xl font-semibold text-center mb-12">Productos</h1>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {/* FILTROS */}
        <ContainerFilter
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedLines={selectedLines}
          setSelectedLines={setSelectedLines}
        />

        {/* LISTADO */}
        <div className="col-span-2 lg:col-span-2 xl:col-span-4 flex flex-col gap-12">
          <div className="grid grid-cols-2 gap-3 gap-y-10 xl:grid-cols-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <CardProduct
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  colors={product.colors}
                  img={product.images[0]}
                  slug={product.slug}
                  variants={product.variants}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No se encontraron productos con los filtros aplicados.
              </p>
            )}
          </div>

          {/* PAGINACIÓN */}
          <Pagination
            totalItems={filteredProducts.length}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    </>
  );
};
