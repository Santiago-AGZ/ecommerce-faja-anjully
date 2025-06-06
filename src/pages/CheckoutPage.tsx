import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cart.store';
import { FormCheckout } from '../components/checkout/FormCheckout';
import { ItemsCheckout } from '../components/checkout/ItemsCheckout';
import { useUser } from '../hooks';
import { Loader } from '../components/shared/Loader';
import { useEffect } from 'react';
import { supabase } from '../supabase/client';

export const CheckoutPage = () => {
	const totalItems = useCartStore(state => state.totalItemsInCart);

	const { isLoading } = useUser();

	const navigate = useNavigate();

	useEffect(() => {
		supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === 'SIGNED_OUT' || !session) {
				navigate('/login');
			}
		});
	}, [navigate]);

	if (isLoading) return <Loader />;

	return (
		<div
			style={{
				minHeight: 'calc(100vh - 100px',
			}}
		>
			<header className='bg-[#c4879b] text-[#fbeaea] py-4 flex items-center justify-between px-5 border-b border-[#d19ba1] lg:px-12'>
				<Link
					to='/'
					className='text-4xl font-bold self-center tracking-tighter transition-all md:text-5xl md:self-start text-[#6d3843]'
				>
					<p>
						Fajas 
						<span className='text-[#fbeaea]'>Anjully</span>
					</p>
				</Link>
			</header>

			<main className='w-full h-full flex relative'>
				{totalItems === 0 ? (
					<div
						className='flex flex-col items-center justify-center gap-5 w-full'
						style={{
							height: 'calc(100vh - 100px)',
						}}
					>
						<p className='text-sm font-medium tracking-tight'>
							Su carro esta vacío
						</p>
						<Link
							to='/celulares'
							className='py-4 bg-black rounded-full text-white px-7 text-xs uppercase tracking-widest font-semibold'
						>
							Empezar a comprar
						</Link>
					</div>
				) : (
					<>
						<div className='w-full md:w-[50%] p-10'>
							<FormCheckout />
						</div>

						<div
							className='bg-stone-100 w-[50%] sticky top-0 right-0 p-10 hidden md:block'
							style={{
								minHeight: 'calc(100vh - 100px)',
							}}
						>
							{/* Elementos del carrito */}
							<ItemsCheckout />
						</div>
					</>
				)}
			</main>
		</div>
	);
};