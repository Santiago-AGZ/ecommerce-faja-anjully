import { getRandomProducts, getRecentProducts } from "@/components/actions";
import { useQueries } from "@tanstack/react-query";

export const useHomeProducts = () => {
    // Utilizar useQueries para realizar múltiples consultas
  // a la vez y obtener productos recientes y populares
  const results = useQueries({
    queries: [
      {
        queryKey: ["recentProducts"],
        queryFn: getRecentProducts,
      },
      {
        queryKey: ["popularProducts"],
        queryFn: getRandomProducts,
      },
    ],
  });

  // Desestructurar los resultados de las consultas
  const [recentProductsResult, popularProductsResult] = results; // [resultadoQuery1, resultadoQuery2]

  // Combinar los estados de las consultas
  const isLoading =
    recentProductsResult.isLoading || popularProductsResult.isLoading;
  const isError = recentProductsResult.isError || popularProductsResult.isError;

  return {
    // Retornar los datos de productos recientes y populares
    recentProducts: recentProductsResult.data || [],
    popularProducts: popularProductsResult.data || [],
    isLoading,
    isError,
  };
};
