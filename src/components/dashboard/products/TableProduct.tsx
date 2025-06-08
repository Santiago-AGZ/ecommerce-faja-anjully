import { useState } from 'react';
import { FaEllipsis } from 'react-icons/fa6';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useDeleteProduct, useProducts } from '../../../hooks';
import { Loader } from '../../shared/Loader';
import { formatDate, formatPrice } from '../../../helpers';
import { Pagination } from '../../shared/Pagination';
import { CellTableProduct } from './CellTableProduct';

const tableHeaders = [
	'',
	'Nombre',
	'Variante',
	'Precio',
	'Stock',
	'Fecha de creación',
	'',
];

export const TableProduct = () => {
	const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
	const [selectedVariants, setSelectedVariants] = useState<{
		[key: string]: number;
	}>({});
	const [page, setPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');

	const { products, isLoading, totalProducts } = useProducts({
		page,
	});
	const { mutate, isPending } = useDeleteProduct();

	const handleMenuToggle = (index: number) => {
		if (openMenuIndex === index) {
			setOpenMenuIndex(null);
		} else {
			setOpenMenuIndex(index);
		}
	};

	const handleVariantChange = (
		productId: string,
		variantIndex: number
	) => {
		setSelectedVariants({
			...selectedVariants,
			[productId]: variantIndex,
		});
	};

	const handleDeleteProduct = (id: string) => {
		mutate(id);
		setOpenMenuIndex(null);
	};

	// Filtrar productos por nombre
	const filteredProducts = products?.filter(product =>
		product.name.toLowerCase().includes(searchTerm.toLowerCase())
	) || [];

	if (!products || isLoading || !totalProducts || isPending)
		return <Loader />;

	return (
		<div className='flex flex-col flex-1 border border-gray-200 rounded-lg p-5 bg-white'>
			<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6'>
				<div>
					<h1 className='font-bold text-xl'>Productos</h1>
					<p className='text-sm mt-1 font-regular text-gray-500'>
						Gestiona tus productos y mira las estadísticas de tus ventas
					</p>
				</div>

				{/* Filtro de búsqueda */}
				<div className='w-full md:w-auto'>
					<label htmlFor='product-search' className='block text-sm font-medium text-gray-700 mb-1'>
						Buscar productos
					</label>
					<input
						type='text'
						id='product-search'
						placeholder='Ingrese el nombre'
						className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>

			{/* Tabla */}
			<div className='relative w-full h-full'>
				<table className='text-sm w-full caption-bottom overflow-auto'>
					<thead className='border-b border-gray-200 pb-3'>
						<tr className='text-sm font-bold'>
							{tableHeaders.map((header, index) => (
								<th key={index} className='h-12 px-4 text-left'>
									{header}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{filteredProducts.length > 0 ? (
							filteredProducts.map((product, index) => {
								const selectedVariantIndex =
									selectedVariants[product.id] ?? 0;
								const selectedVariant =
									product.variants[selectedVariantIndex] || {};

								return (
									<tr key={index}>
										<td className='p-4 align-middle sm:table-cell'>
											<img
												src={
													product.images[0] ||
													'https://ui.shadcn.com/placeholder.svg'
												}
												alt='Imagen Product'
												loading='lazy'
												decoding='async'
												className='w-16 h-16 aspect-square rounded-md object-contain'
											/>
										</td>
										<CellTableProduct content={product.name} />
										<td className='p-4 font-medium tracking-tighter'>
											<select
												className='border border-gray-300 rounded-md p-1 w-full'
												onChange={e =>
													handleVariantChange(
														product.id,
														Number(e.target.value))
												}

												value={selectedVariantIndex}
											>
												{product.variants.map(
													(variant, variantIndex) => (
														<option
															key={variant.id}
															value={variantIndex}
														>
															{variant.color_name} - {variant.size}
														</option>
													)
												)}
											</select>
										</td>
										<CellTableProduct
											content={formatPrice(selectedVariant?.price)}
										/>
										<CellTableProduct
											content={(selectedVariant.stock || 0).toString()}
										/>
										<CellTableProduct
											content={formatDate(product.created_at)}
										/>
										<td className='relative'>
											<button
												className='text-slate-900'
												onClick={() => handleMenuToggle(index)}
											>
												<FaEllipsis />
											</button>
											{openMenuIndex === index && (
												<div
													className='absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-xl z-10 w-[120px]'
													role='menu'
												>
													<Link
														to={`/dashboard/productos/editar/${product.slug}`}
														className='flex items-center gap-1 w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100'
													>
														Editar
														<HiOutlineExternalLink
															size={13}
															className='inline-block'
														/>
													</Link>
													<button
														className='block w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100'
														onClick={() =>
															handleDeleteProduct(product.id)
														}
													>
														Eliminar
													</button>
												</div>
											)}
										</td>
									</tr>
								);
							})
						) : (
							<tr>
								<td colSpan={tableHeaders.length} className='p-4 text-center text-gray-500'>
									No se encontraron productos con ese nombre
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Controles de paginación */}
			<Pagination
				page={page}
				setPage={setPage}
				totalItems={totalProducts}
			/>
		</div>
	);
};