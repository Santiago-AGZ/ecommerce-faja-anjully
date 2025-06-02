import { getFilteredProducts } from '@/components/actions';
import { useQuery } from '@tanstack/react-query';


export const useFilteredProducts = ({
	page,
	lines,
	limit = 12, // valor por defecto
}: {
	page: number;
	lines: string[];
	limit?: number;
}) => {
	const { data, isLoading } = useQuery({
		queryKey: ['filteredProducts', page, lines, limit],
		queryFn: () => getFilteredProducts({ page, lines, limit }),
		retry: false,
	});

	return {
		data: data?.data,
		isLoading,
		totalProducts: data?.count ?? 0,
	};
};