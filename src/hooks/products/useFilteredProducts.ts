import { useQuery } from '@tanstack/react-query';
import { getFilteredProducts } from '@/actions';
import { Product } from '@/interfaces'; // Asegúrate de que la ruta sea correcta

interface FilteredProductsResponse {
	data: Product[];
	count: number | null;
}

export const useFilteredProducts = ({
	page = 1,
	filters,
}: {
	page: number;
	filters: {
		lines: string[];
		compressionLevels: string[];
		categories: string[];
	};
}) => {
	return useQuery<FilteredProductsResponse, Error>({
		queryKey: ['filtered-products', page, filters],
		queryFn: () => getFilteredProducts({ page, filters }),
	});
};