import { LuMinus, LuPlus } from 'react-icons/lu';
import { Separator } from '../components/shared/Separator';
import { formatPrice } from '../helpers';
import { CiDeliveryTruck } from 'react-icons/ci';
import { Link, useParams } from 'react-router-dom';
import { BsChatLeftText } from 'react-icons/bs';
import { ProductDescription } from '../components/one-product/ProductDescription';
import { GridImages } from '../components/one-product/GridImages';
import { useProduct } from '../hooks/products/useProduct';
import { useEffect, useMemo, useState } from 'react';
import { VariantProduct } from '../interfaces';
import { Tag } from '../components/shared/Tag';
import { Loader } from '../components/shared/Loader';
import { useCounterStore } from '@/store/counter.store';
import { useCartStore } from '../store/cart.store';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface Acc {
	[key: string]: {
		name: string;
		sizes: string[];
	};
}

export const FajaPage = () => {
	const { slug } = useParams<{ slug: string }>();

	const [currentSlug, setCurrentSlug] = useState(slug);

	const { product, isLoading, isError } = useProduct(
		currentSlug || ''
	);

	const [selectedColor, setSelectedColor] = useState<string | null>(
		null
	);

	const [selectedSize, setSelectedSize] = useState<
		string | null
	>(null);

	const [selectedVariant, setSelectedVariant] =
		useState<VariantProduct | null>(null);

	const count = useCounterStore(state => state.count);
	const increment = useCounterStore(state => state.increment);
	const decrement = useCounterStore(state => state.decrement);

	const addItem = useCartStore(state => state.addItem);

	const navigate = useNavigate();

	// Agrupamos las variantes por color
	const colors = useMemo(() => {
		return (
			product?.variants.reduce(
				(acc: Acc, variant: VariantProduct) => {
					const { color, color_name, size } = variant;
					if (!acc[color]) {
						acc[color] = {
							name: color_name,
							sizes: [],
						};
					}

					if (!acc[color].sizes.includes(size)) {
						acc[color].sizes.push(size);
					}

					return acc;
				},
				{} as Acc
			) || {}
		);
	}, [product?.variants]);

	// Obtener el primer color predeterminado si no se ha seleccionado ninguno
	const availableColors = Object.keys(colors);
	useEffect(() => {
		if (!selectedColor && availableColors.length > 0) {
			setSelectedColor(availableColors[0]);
		}
	}, [availableColors, selectedColor]);

	// Actualizar el almacenamiento seleccionado cuando cambia el color
	useEffect(() => {
		if (selectedColor && colors[selectedColor] && !selectedSize) {
			setSelectedSize(colors[selectedColor].sizes[0]);
		}
	}, [selectedColor, colors, selectedSize]);

	// Obtener la variante seleccionada
	useEffect(() => {
		if (selectedColor && selectedSize) {
			const variant = product?.variants.find(
				variant =>
					variant.color === selectedColor &&
					variant.size === selectedSize
			);

			setSelectedVariant(variant as VariantProduct);
		}
	}, [selectedColor, selectedSize, product?.variants]);

	// Obtener el stock
	const isOutOfStock = selectedVariant?.stock === 0;

	// Función para añadir al carrito
	const addToCart = () => {
		if (selectedVariant) {
			addItem({
				variantId: selectedVariant.id,
				productId: product?.id || '',
				name: product?.name || '',
				image: product?.images[0] || '',
				color: selectedVariant.color_name,
				size: selectedVariant.size,
				price: selectedVariant.price,
				quantity: count,
			});
			toast.success('Producto añadido al carrito', {
				position: 'bottom-right',
			});
		}
	};

	// Función para comprar ahora
	const buyNow = () => {
		if (selectedVariant) {
			addItem({
				variantId: selectedVariant.id,
				productId: product?.id || '',
				name: product?.name || '',
				image: product?.images[0] || '',
				color: selectedVariant.color_name,
				size: selectedVariant.size,
				price: selectedVariant.price,
				quantity: count,
			});

			navigate('/checkout');
		}
	};

	// Resetear el slug actual cuando cambia en la URL
	useEffect(() => {
		setCurrentSlug(slug);

		// Reiniciar color, almacenamiento y variante seleccionada
		setSelectedColor(null);
		setSelectedSize(null);
		setSelectedVariant(null);
	}, [slug]);

	if (isLoading) return <Loader />;

	if (!product || isError)
		return (
			<div className='flex justify-center items-center h-[80vh]'>
				<p>Producto no encontrado</p>
			</div>
		);

	return (
		<>
			<div className='h-fit flex flex-col md:flex-row gap-16 mt-8'>
				{/* GALERÍA DE IMAGENES */}
				<GridImages images={product.images ?? []} />

				<div className='flex-1 space-y-5'>
					<h1 className='text-3xl font-bold tracking-tight'>
						{product.name}
					</h1>

					

					<div className='flex gap-5 items-center'>
						<span className='tracking-wide text-lg font-semibold'>
							{formatPrice(
								selectedVariant?.price ||
								product.variants[0]?.price ||
								0 // Valor por defecto si no hay variantes
							)}
						</span>

						<div className='relative'>
							{isOutOfStock && <Tag contentTag='agotado' />}
						</div>
					</div>

					<Separator />

					{/* Características */}
					<ul className='space-y-2 ml-7 my-10'>
						{product.compression_level && (
							<li className='text-sm flex items-center gap-2 tracking-tight font-medium'>
							<span className='bg-black w-[5px] h-[5px] rounded-full' />
							Nivel de compresión: {product.compression_level}
							</li>
						)}
						{product.features?.map(feature => (
							<li
								key={feature}
								className='text-sm flex items-center gap-2 tracking-tight font-medium'
							>
								<span className='bg-black w-[5px] h-[5px] rounded-full' />
								{feature}
							</li>
						))}
					</ul>

					<div className='flex flex-col gap-3'>
						<p className='text-xm font-medium'>
							Color: {selectedColor && colors[selectedColor].name}
						</p>
						<div className='flex gap-3'>
							{availableColors.map(color => (
								<button
									key={color}
									className={`w-8 h-8 rounded-full flex justify-center items-center ${selectedColor === color
											? 'border-2 border-slate-800'
											: 'border border-gray-200'
										}`}
									onClick={() => setSelectedColor(color)}
									style={{ padding: 0 }}
								>
									<span
										className='w-6 h-6 rounded-full border border-gray-300'
										style={{ backgroundColor: color }}
									/>
								</button>
							))}
						</div>
					</div>

					{/* OPCIONES DE talla */}
					<div className='flex flex-col gap-3'>
						<p className='text-sm font-medium'>
							Tallas Disponibles:
						</p>

						{selectedColor && (
							<div className='flex gap-3'>
								<select
									className='border border-gray-300 rounded-lg px-3 py-1'
									value={selectedSize || ''}
									onChange={e => setSelectedSize(e.target.value)}
								>
									{colors[selectedColor].sizes.map(size => (
										<option value={size} key={size}>
											{size}
										</option>
									))}
								</select>
							</div>
						)}
					</div>

					{/* COMPRAR */}
					{isOutOfStock ? (
						<button
							className='bg-[#f3f3f3] uppercase font-semibold tracking-widest text-xs py-4 rounded-full transition-all duration-300 hover:bg-[#e2e2e2] w-full'
							disabled
						>
							Agotado
						</button>
					) : (
						<>
							{/* Contador */}
							<div className='space-y-3'>
								<p className='text-sm font-medium'>Cantidad:</p>

								<div className='flex gap-8 px-5 py-3 border border-slate-200 w-fit rounded-full'>
									<button onClick={decrement} disabled={count === 1}>
										<LuMinus size={15} />
									</button>
									<span className='text-slate-500 text-sm'>
										{count}
									</span>
									<button onClick={increment}>
										<LuPlus size={15} />
									</button>
								</div>
							</div>

							{/* BOTONES ACCIÓN */}
							<div className='flex flex-col gap-3'>
							<button
								className='bg-[#f3f3f3] uppercase font-semibold tracking-widest text-xs py-4 rounded-full transition-all duration-300 hover:bg-[#e2e2e2]'
								onClick={addToCart}
							>
								Agregar al carro
							</button>
							<button
								className='bg-black text-white uppercase font-semibold tracking-widest text-xs py-4 rounded-full'
								onClick={buyNow}
							>
								Comprar ahora
							</button>
							</div>
						</>
					)}

					<div className='flex pt-2'>
						<div className='flex flex-col gap-1 flex-1 items-center'>
							<CiDeliveryTruck size={35} />
							<p className='text-xs font-semibold'>Envío gratis</p>
						</div>

						<Link
							to='#'
							className='flex flex-col gap-1 flex-1 items-center justify-center'
						>
							<BsChatLeftText size={30} />
							<p className='flex flex-col items-center text-xs'>
								<span className='font-semibold'>
									¿Necesitas ayuda?
								</span>
								Contáctanos aquí
							</p>
						</Link>
					</div>
				</div>
			</div>

			{/* DESCRIPCIÓN */}
			<ProductDescription content={product.description} />
		</>
	);
};