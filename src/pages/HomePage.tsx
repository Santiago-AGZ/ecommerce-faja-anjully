import { useHomeProducts } from "@/hooks";
import { FeatureGrid } from "../components/home/FeatureGrid";
import { ProductGridSkeleton } from "@/components/skeletons/ProductGridSkeleton";
import { ProductGrid } from "@/components/home/ProductGrid";
import { prepareProducts } from "@/helpers";
import { popupularProducts } from "@/data/initialData";

export const HomePage = () => {
  const { isLoading } = useHomeProducts();

  const preparedPopularProducts = prepareProducts(popupularProducts);
  return (
    <div>
      <FeatureGrid />

      {isLoading ? (
        <ProductGridSkeleton numberOfProducts={4} />
      ) : (
        <ProductGrid
          title="Productos Destacados"
          products={preparedPopularProducts}
        />
      )}
    </div>
  );
};
