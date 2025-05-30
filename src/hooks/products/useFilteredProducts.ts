import { getFillteredProducts } from "@/components/actions";
import { useQuery } from "@tanstack/react-query";

export const useFilteredProducts = ({
  page,
  categories,
}: {
  page: number;
  categories: string[];
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["filteredProducts", page, categories],
    queryFn: () => getFillteredProducts({ page, categories }),
    retry: false,
  });
  return {
    data: data?.data,
    isLoading,
    totalProducts: data?.count?? 0,
  };
};
