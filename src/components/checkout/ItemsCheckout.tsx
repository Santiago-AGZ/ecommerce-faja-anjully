import { formatPrice } from '../../helpers';
import { useCartStore } from '../../store/cart.store';

export const ItemsCheckout = () => {
	const cartItems = useCartStore(state => state.items);
	const totalAmount = useCartStore(state => state.totalAmount);
	
	// Calcular costo de envío
	const shippingCost = totalAmount > 300000 ? 0 : 20000;
	// Calcular total incluyendo envío
	const totalWithShipping = totalAmount + shippingCost;

	return (
		<div className='w-full max-w-2xl mx-auto'>
			<ul className='space-y-6'>
				{cartItems.map(item => (
					<li
						key={item.variantId}
						className='flex items-center justify-between gap-5 border-b pb-4'
					>
						{/* Imagen con cantidad */}
						<div className='relative'>
							<img
								src={item.image}
								alt={item.name}
								className='w-20 h-20 object-contain rounded-lg border border-stone-300 bg-stone-100'
							/>
							<span className='absolute -top-2 -right-2 w-5 h-5 bg-black text-white text-[11px] flex items-center justify-center rounded-full font-medium'>
								{item.quantity}
							</span>
						</div>

						{/* Info del producto */}
						<div className='flex-1 space-y-1'>
							<div className='flex justify-between items-center'>
								<p className='font-semibold text-sm'>{item.name}</p>
								<p className='text-sm text-stone-600'>{formatPrice(item.price)}</p>
							</div>
							<p className='text-[13px] text-stone-500'>
								{item.size} / {item.color}
							</p>
						</div>
					</li>
				))}
			</ul>

			{/* Total */}
			<div className='mt-8 space-y-4 text-sm text-stone-700'>
				<div className='flex justify-between'>
					<p className='font-medium'>Envío</p>
					<p className='uppercase font-medium'>
						{shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}
					</p>
				</div>
				<div className='flex justify-between font-bold text-base text-black'>
					<p>Total</p>
					<p>{formatPrice(totalWithShipping)}</p>
				</div>
			</div>
		</div>
	);
};