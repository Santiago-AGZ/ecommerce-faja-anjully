import { Link } from 'react-router-dom';
import { useOrders } from '../hooks';
import { Loader } from '../components/shared/Loader';
import { TableOrders } from '../components/orders/TableOrders';

export const OrdersUserPage = () => {
	const { data: orders, isLoading } = useOrders();

	if (isLoading || !orders) return <Loader />;

	return (
		<div className='w-full max-w-6xl mx-auto px-4 md:px-8 py-10'>
			<div className='flex items-center justify-between mb-8'>
				<div className='flex items-center gap-3'>
					<h1 className='text-3xl font-bold'>Pedidos</h1>
					<span className='w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center font-semibold'>
						{orders.length}
					</span>
				</div>
			</div>

			{orders.length === 0 ? (
				<div className='flex flex-col items-center justify-center gap-4 mt-20'>
					<p className='text-gray-600 text-sm'>
						Todavía no has hecho ningún pedido.
					</p>
					<Link
						to='/productos'
						className='bg-black text-white uppercase font-semibold tracking-wider text-xs py-3 px-6 rounded-full hover:opacity-90 transition'
					>
						Empezar a comprar
					</Link>
				</div>
			) : (
				<TableOrders orders={orders} />
			)}
		</div>
	);
};
