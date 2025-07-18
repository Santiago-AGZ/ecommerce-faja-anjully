import { HiOutlineShoppingBag } from 'react-icons/hi';
import { useGlobalStore } from '../../store/global.store';
import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { CartItem } from './CartItem';
import { useCartStore } from '../../store/cart.store';
import { formatPrice } from '../../helpers';

export const Cart = () => {
	const closeSheet = useGlobalStore(state => state.closeSheet);
	const cartItems = useCartStore(state => state.items);
	const cleanCart = useCartStore(state => state.cleanCart);
	const totalItemsInCart = useCartStore(state => state.totalItemsInCart);
	const totalAmount = useCartStore(state => state.totalAmount);

	// Calcular costo de envío
	const shippingCost = totalAmount > 300000 ? 0 : 20000;
	const totalWithShipping = totalAmount + shippingCost;

	return (
		<div className='flex flex-col h-full'>
			<div className='px-5 py-7 flex justify-between items-center border-b border-slate-200'>
				<span className='flex gap-3 items-center font-semibold'>
					<HiOutlineShoppingBag size={20} />
					{totalItemsInCart} artículos
				</span>
				<button onClick={closeSheet}>
					<IoMdClose size={25} className='text-black' />
				</button>
			</div>

			{totalItemsInCart > 0 ? (
				<>
					{/* LISTA DE PRODUCTOS AÑADIDOS AL CARRITO */}
					<div className='p-7 overflow-auto flex-1'>
						<ul className='space-y-9'>
							{cartItems.map(item => (
								<CartItem item={item} key={item.variantId} />
							))}
						</ul>
					</div>

					{/* RESUMEN DE COMPRA */}
					<div className='px-7 py-4 border-t border-slate-200'>
						<div className='flex justify-between text-sm mb-2'>
							<span>Subtotal:</span>
							<span>{formatPrice(totalAmount)}</span>
						</div>
						<div className='flex justify-between text-sm mb-2'>
							<span>Envío:</span>
							<span>
								{shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}
								{shippingCost > 0 && (
									<span className='text-xs text-gray-500 block'>
										Gratis en compras mayores a {formatPrice(300000)}
									</span>
								)}
							</span>
						</div>
						<div className='flex justify-between font-bold mt-3'>
							<span>Total:</span>
							<span>{formatPrice(totalWithShipping)}</span>
						</div>
					</div>

					{/* BOTONES ACCIÓN */}
					<div className='mt-2 p-7 pt-0'>
						<Link
							to='/checkout'
							className='w-full bg-black text-white py-3.5 rounded-full flex items-center justify-center gap-3'
						>
							<RiSecurePaymentLine size={24} />
							Continuar con la compra
						</Link>

						<button
							className='mt-3 w-full text-black border border-black rounded-full py-3'
							onClick={cleanCart}
						>
							Limpiar Carrito
						</button>
					</div>
				</>
			) : (
				<div className='flex flex-col items-center justify-center h-full gap-7'>
					<p className='text-sm font-medium tracking-tight'>
						Su carro esta vacío
					</p>
					<Link
						to='/productos'
						className='py-4 bg-black rounded-full text-white px-7 text-xs uppercase tracking-widest font-semibold'
						onClick={closeSheet}
					>
						Empezar a comprar
					</Link>
				</div>
			)}
		</div>
	);
};