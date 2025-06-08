import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateLong, formatPrice } from '../../../helpers';
import { OrderWithCustomer } from '../../../interfaces';
import { useChangeStatusOrder } from '@/hooks/orders/useChangeStatusOrder';

const tableHeaders = ['Cliente', 'Fecha', 'Estado', 'Total'];

const statusOptions = [
	{ value: 'all', label: 'Todos los estados', color: 'bg-gray-100 text-gray-800' },
	{ value: 'Pending', label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800' },
	{ value: 'Paid', label: 'Pagado', color: 'bg-blue-100 text-blue-800' },
	{ value: 'Processing', label: 'Procesando', color: 'bg-purple-100 text-purple-800' },
	{ value: 'Shipped', label: 'Enviado', color: 'bg-indigo-100 text-indigo-800' },
	{ value: 'Delivered', label: 'Entregado', color: 'bg-green-100 text-green-800' },
	{ value: 'Cancelled', label: 'Cancelado', color: 'bg-red-100 text-red-800' },
	{ value: 'Refunded', label: 'Reembolsado', color: 'bg-gray-100 text-gray-800' },
];

interface Props {
	orders: OrderWithCustomer[];
}

export const TableOrdersAdmin = ({ orders }: Props) => {
	const navigate = useNavigate();
	const { mutate } = useChangeStatusOrder();
	const [statusFilter, setStatusFilter] = useState<string>('all');
	const [searchTerm, setSearchTerm] = useState<string>('');

	// Filtrar órdenes
	const filteredOrders = orders.filter(order => {
		const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
		const matchesSearch = order.customers?.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			order.customers?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			order.id.toString().includes(searchTerm);
		return matchesStatus && matchesSearch;
	});

	const calculateShipping = (total: number) => total > 300000 ? 0 : 20000;

	const handleStatusChange = (id: number, status: string) => {
		mutate({ id, status });
	};

	const getStatusColor = (status: string) => {
		const foundStatus = statusOptions.find(option => option.value === status);
		return foundStatus ? foundStatus.color : 'bg-gray-100 text-gray-800';
	};

	return (
		<div className="space-y-4">
			{/* Filtros */}
			<div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
				<div className="flex-1">
					<label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
						Buscar
					</label>
					<input
						type="text"
						id="search"
						placeholder="Buscar por nombre, email o ID"
						className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				<div className="flex-1">
					<label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
						Filtrar por estado
					</label>
					<select
						id="status-filter"
						className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
					>
						{statusOptions.map(option => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>
			</div>

			{/* Tabla */}
			<div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-100">
							<tr>
								{tableHeaders.map((header, index) => (
									<th
										key={index}
										className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
									>
										{header}
									</th>
								))}
							</tr>
						</thead>

						<tbody className="bg-white divide-y divide-gray-200">
							{filteredOrders.length > 0 ? (
								filteredOrders.map(order => {
									const shippingCost = calculateShipping(order.total_amount);
									const totalWithShipping = order.total_amount + shippingCost;

									return (
										<tr
											key={order.id}
											className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
											onClick={() => navigate(`/dashboard/ordenes/${order.id}`)}
										>
											<td className="px-6 py-4">
												<div className="flex flex-col">
													<span className="font-medium text-gray-900">
														{order.customers?.full_name}
													</span>
													<span className="text-sm text-gray-500">
														{order.customers?.email}
													</span>
													<span className="text-xs text-gray-400 mt-1">
														ID: {order.id}
													</span>
												</div>
											</td>
											<td className="px-6 py-4 text-sm text-gray-700">
												{formatDateLong(order.created_at)}
											</td>
											<td className="px-6 py-4">
												<div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
													<span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
														{statusOptions.find(s => s.value === order.status)?.label || order.status}
													</span>
													<select
														value={order.status}
														onChange={e => handleStatusChange(order.id, e.target.value)}
														className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
														onClick={e => e.stopPropagation()}
													>
														{statusOptions.filter(opt => opt.value !== 'all').map(option => (
															<option
																value={option.value}
																key={option.value}
															>
																{option.label}
															</option>
														))}
													</select>
												</div>
											</td>
											<td className="px-6 py-4 text-sm font-medium text-gray-900">
												<div className="flex flex-col">
													<span>{formatPrice(totalWithShipping)}</span>
													{shippingCost > 0 && (
														<span className="text-xs text-gray-500 mt-1">
															(Envío: {formatPrice(shippingCost)})
														</span>
													)}
												</div>
											</td>
										</tr>
									);
								})
							) : (
								<tr>
									<td colSpan={4} className="px-6 py-4 text-center text-gray-500">
										No se encontraron órdenes con los filtros aplicados
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};