import { IoChevronBack } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { useOrderAdmin } from '../../hooks';
import { Loader } from '../../components/shared/Loader';
import { formatPrice, formatDateLong } from '../../helpers';

const tableHeaders = ['Producto', 'Cantidad', 'Total'];

export const DashboardOrderPage = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const { data: order, isLoading } = useOrderAdmin(Number(id));

	if (isLoading || !order) return <Loader />;

	// Calcular costo de envío
	const shippingCost = order.totalAmount > 300000 ? 0 : 20000;
	const totalWithShipping = order.totalAmount + shippingCost;

	return (
		<div className='w-full px-4 md:px-8'>
			{/* Encabezado */}
			<div className='flex flex-col md:flex-row justify-between items-center gap-6 mb-10'>
				<button
					className='border border-gray-300 rounded-full py-2 px-5 flex items-center gap-2 text-xs font-medium uppercase tracking-wide hover:bg-gray-100 transition'
					onClick={() => navigate(-1)}
				>
					<IoChevronBack size={16} />
					Volver
				</button>

				<div className='text-center'>
					<h1 className='text-3xl font-bold'>Pedido #{id}</h1>
					<p className='text-sm text-gray-600'>
						{formatDateLong(order.created_at)}
					</p>
				</div>

				<div className='w-32' /> {/* Espaciador para alinear */}
			</div>

			{/* Tabla de productos */}
			<div className='overflow-x-auto border border-gray-200 rounded-lg shadow-sm'>
				<table className='min-w-full text-sm'>
					<thead className='bg-gray-100 text-gray-700 uppercase text-xs tracking-wider'>
						<tr>
							{tableHeaders.map((header, index) => (
								<th key={index} className='px-6 py-4 text-center font-semibold'>
									{header}
								</th>
							))}
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-200'>
						{order.orderItems.map((item, index) => (
							<tr key={index}>
								<td className='px-6 py-4 flex items-center gap-4'>
									<img
										src={item.productImage}
										alt={item.productName}
										className='h-16 w-16 object-contain rounded-md border'
									/>
									<div>
										<h3 className='font-medium'>{item.productName}</h3>
										<p className='text-xs text-gray-500'>
											{item.color_name} / {item.size}
										</p>
										<p className='text-sm text-gray-700'>
											{formatPrice(item.price)}
										</p>
									</div>
								</td>
								<td className='px-6 py-4 text-center'>
									{item.quantity}
								</td>
								<td className='px-6 py-4 text-center font-semibold text-gray-800'>
									{formatPrice(item.price * item.quantity)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Resumen de totales */}
			<div className='flex flex-col items-end mt-10 text-sm text-gray-700 w-full md:w-1/2 ml-auto space-y-2'>
				<div className='flex justify-between w-full'>
					<p>Subtotal</p>
					<p>{formatPrice(order.totalAmount)}</p>
				</div>

				<div className='flex justify-between w-full'>
					<div>
						<p>Envío</p>
						{shippingCost > 0 && (
							<p className='text-xs text-gray-500'>
								Gratis en compras mayores a {formatPrice(300000)}
							</p>
						)}
					</div>
					<p>{shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}</p>
				</div>

				<div className='border-t border-gray-200 w-full my-2'></div>

				<div className='flex justify-between w-full font-semibold text-black'>
					<p>Total</p>
					<p>{formatPrice(totalWithShipping)}</p>
				</div>
			</div>

			{/* Dirección */}
			<div className='mt-10'>
				<h2 className='text-lg font-bold mb-4'>Dirección</h2>
				<div className='border border-gray-300 rounded-lg p-5 space-y-6 bg-white'>
					<div>
						<h3 className='font-medium text-sm mb-1'>Cliente:</h3>
						<p className='text-sm text-gray-800'>{order.customer.full_name}</p>
					</div>

					<div>
						<h3 className='font-medium text-sm mb-1'>Envío:</h3>
						<div className='text-sm text-gray-700 space-y-0.5'>
							<p>{order.address.addressLine1}</p>
							{order.address.addressLine2 && <p>{order.address.addressLine2}</p>}
							<p>{order.address.city}</p>
							<p>{order.address.state}</p>
							<p>{order.address.postalCode}</p>
							<p>{order.address.country}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};