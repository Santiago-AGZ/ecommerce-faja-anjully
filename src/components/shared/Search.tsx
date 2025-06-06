import { useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { useGlobalStore } from '../../store/global.store';
import { formatPrice } from '../../helpers';
import { Product } from '../../interfaces';
import { useNavigate } from 'react-router-dom';
import { searchProducts } from '../../actions';

export const Search = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState<Product[]>([]);
	const closeSheet = useGlobalStore(state => state.closeSheet);
	const navigate = useNavigate();

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault();
		if (searchTerm.trim()) {
			const products = await searchProducts(searchTerm);
			setSearchResults(products);
		}
	};

	return (
		<div className="flex flex-col h-full">
			{/* Cabecera de búsqueda */}
			<div className='py-4 px-6 flex items-center border-b border-gray-200 sticky top-0 bg-white z-10'>
				<form className='flex items-center flex-1' onSubmit={handleSearch}>
					<HiOutlineSearch size={20} className="text-gray-500 mr-3" />
					<input
						type='text'
						placeholder='¿Qué estás buscando?'
						className='outline-none w-full text-sm placeholder-gray-400'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						autoFocus
					/>
				</form>
				<button onClick={closeSheet} className="ml-4">
					<IoMdClose size={22} className='text-gray-500 hover:text-gray-700' />
				</button>
			</div>

			{/* Resultados de búsqueda */}
			<div className='flex-1 overflow-y-auto'>
				{searchResults.length > 0 ? (
					<ul className="divide-y divide-gray-100">
						{searchResults.map(product => (
							<li key={product.id} className="hover:bg-gray-50 transition-colors">
								<button
									className='w-full px-6 py-4 text-left'
									onClick={() => {
										navigate(`/productos/${product.slug}`);
										closeSheet();
									}}
								>
									<div className="flex items-center gap-4">
										<div className="flex-shrink-0">
											<img
												src={product.images[0]}
												alt={product.name}
												className='h-16 w-16 object-contain rounded border border-gray-200'
											/>
										</div>
										<div className="flex-1 min-w-0">
											<p className='text-sm font-medium text-gray-900 truncate'>
												{product.name}
											</p>
											<p className='text-xs text-gray-500 mt-1'>
												{product.variants[0].size} / {product.variants[0].color_name}
											</p>
											<p className='text-sm font-semibold text-gray-900 mt-1'>
												{formatPrice(product.variants[0].price)}
											</p>
										</div>
									</div>
								</button>
							</li>
						))}
					</ul>
				) : (
					<div className="flex flex-col items-center justify-center h-full">
						<p className='text-sm text-gray-500 px-6 py-8 text-center'>
							{searchTerm
								? 'No encontramos productos con ese nombre'
								: 'Escribe en el buscador para encontrar productos'}
						</p>
					</div>
				)}
			</div>
		</div>
	);
};