import { getproducts } from '@/components/actions';
import { useQuery } from '@tanstack/react-query';

export const useProducts = () => {
const {data,isLoading }=useQuery({
    queryKey: ['products'],
    queryFn: ()=> getproducts(),
    staleTime: 1000 * 60 * 5, // 1 hora
})
return { products: data, isLoading };
};