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

    // Función para calcular el envío (misma lógica que en el carrito)
    const calculateShipping = (total: number) => total > 300000 ? 0 : 20000;

    // Función para obtener las clases CSS según el estado
    const getStatusClasses = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'paid':
                return 'bg-blue-100 text-blue-800';
            case 'processing':
                return 'bg-purple-100 text-purple-800';
            case 'shipped':
                return 'bg-indigo-100 text-indigo-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            case 'refunded':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className='w-full max-w-6xl mx-auto overflow-hidden rounded-lg border border-gray-200 shadow-sm'>
            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-100'>
                        <tr>
                            {tableHeaders.map((header, index) => (
                                <th 
                                    key={index} 
                                    className='px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-700 text-center'
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className='bg-white divide-y divide-gray-200'>
                        {orders.map(order => {
                            const shippingCost = calculateShipping(order.total_amount);
                            const totalWithShipping = order.total_amount + shippingCost;
                            
                            return (
                                <tr
                                    key={order.id}
                                    className='hover:bg-gray-50 cursor-pointer transition-colors duration-150'
                                    onClick={() => navigate(`/account/pedidos/${order.id}`)}
                                >
                                    <td className='px-6 py-4 text-sm font-medium text-gray-900 text-center'>
                                        #{order.id}
                                    </td>
                                    <td className='px-6 py-4 text-sm text-gray-700 text-center'>
                                        {formatDateLong(order.created_at)}
                                    </td>
                                    <td className='px-6 py-4 text-sm text-center'>
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusClasses(order.status)}`}>
                                            {getStatus(order.status)}
                                        </span>
                                    </td>
                                    <td className='px-6 py-4 text-sm font-semibold text-gray-900 text-center'>
                                        {formatPrice(totalWithShipping)}
                                        {shippingCost > 0 && (
                                            <span className="block text-xs text-gray-500 mt-1">
                                                (Incluye envío: {formatPrice(shippingCost)})
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};