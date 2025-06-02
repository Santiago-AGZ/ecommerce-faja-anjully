import { getFilteredProducts } from '@/components/actions';
import { useQuery } from '@tanstack/react-query';


export const useFilteredProducts = ({
	page,
	lines,
}: {
	page: number;
	lines: string[];
}) => {
	const { data, isLoading } = useQuery({
		queryKey: ['filteredProducts', page, lines],
		queryFn: () => getFilteredProducts({ page, lines }),
		retry: false,
	});

	return {
		data: data?.data,
		isLoading,
		totalProducts: data?.count ?? 0,
	};
};