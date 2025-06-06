import { useNavigate } from 'react-router-dom';
import {
	formatDateLong,
	formatPrice,
	getStatus,
} from '../../helpers';
import { OrderItemSingle } from '../../interfaces';

interface Props {
	orders: OrderItemSingle[];
}

const tableHeaders = ['ID', 'Fecha', 'Estado', 'Total'];

export const TableOrders = ({ orders }: Props) => {
	const navigate = useNavigate();

	return (
		<div className='w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm'>
			<table className='min-w-full text-sm text-left'>
				<thead className='bg-gray-100 text-gray-700 uppercase tracking-wider text-xs'>
					<tr>
						{tableHeaders.map((header, index) => (
							<th key={index} className='px-6 py-4 font-semibold'>
								{header}
							</th>
						))}
					</tr>
				</thead>

				<tbody className='divide-y divide-gray-200'>
					{orders.map(order => (
						<tr
							key={order.id}
							className='hover:bg-gray-50 cursor-pointer transition-colors duration-200'
							onClick={() => navigate(`/account/pedidos/${order.id}`)}
						>
							<td className='px-6 py-4 font-medium text-gray-900'>
								#{order.id}
							</td>
							<td className='px-6 py-4 text-gray-700'>
								{formatDateLong(order.created_at)}
							</td>
							<td className='px-6 py-4 text-gray-700'>
								{getStatus(order.status)}
							</td>
							<td className='px-6 py-4 font-semibold text-gray-900'>
								{formatPrice(order.total_amount)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
