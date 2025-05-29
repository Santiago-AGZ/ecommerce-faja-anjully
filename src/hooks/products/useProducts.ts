	import { getproducts } from '@/components/actions';
import { useQuery } from '@tanstack/react-query';

	export const useProducts = ({ page = 1 }: { page?: number }) => {
		const { data, isLoading } = useQuery({
			queryKey: ['products', page],
			queryFn: () => getproducts(page),
			staleTime: 1000 * 60 * 5, // 1 hora
		});

		return {
			products: data?.products,
			isLoading,
		};
	};
