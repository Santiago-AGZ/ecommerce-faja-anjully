import { getSession } from '@/actions';
import { useQuery } from '@tanstack/react-query';


export const useUser = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['user'],
		queryFn: getSession,
		retry: false,
		refetchOnWindowFocus: true,
	});

	return {
		session: data?.session,
		isLoading,
	};
};