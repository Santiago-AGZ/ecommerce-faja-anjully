import { Link, useNavigate, useParams } from 'react-router-dom';
import { useOrder, useUser } from '../hooks';
import { Loader } from '../components/shared/Loader';
import { CiCircleCheck } from 'react-icons/ci';
import { formatPrice } from '../helpers';
import { useEffect } from 'react';
import { supabase } from '../supabase/client';

export const ThankyouPage = () => {
	const { id } = useParams<{ id: string }>();

	const { data, isLoading, isError } = useOrder(Number(id));
	const { isLoading: isLoadingSession } = useUser();

	const navigate = useNavigate();

	useEffect(() => {
		supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === 'SIGNED_OUT' || !session) {
				navigate('/login');
			}
		});
	}, [navigate]);

	if (isError) return <div>Error al cargar la orden</div>;

	if (isLoading || !data || isLoadingSession) return <Loader />;

	// Calcular costo de envío (coherente con ItemsCheckout)
	const shippingCost = data.totalAmount > 300000 ? 0 : 20000;
	const totalWithShipping = data.totalAmount + shippingCost;

	return (
		<div className='flex flex-col h-screen'>
			<header className='bg-[#c4879b] text-[#fbeaea] py-4 flex items-center justify-between px-5 border-b border-[#d19ba1] lg:px-12'>
				<Link
					to='/'
					className='text-4xl font-bold self-center tracking-tighter transition-all md:text-5xl md:self-start text-[#6d3843]'
				>
					<p>
						Fajas <span className='text-[#fbeaea]'>Anjully</span>
					</p>
				</Link>
			</header>

			<main className='flex-1 flex flex-col items-center justify-center gap-10 p-10'>
				<div className='flex gap-3 items-center'>
					<CiCircleCheck size={40} />
					<p className='text-4xl'>¡Gracias, {data.customer.full_name}!</p>
				</div>

				<div className='border border-slate-200 w-full md:w-[600px] p-5 rounded-md space-y-3'>
					<h3 className='font-medium'>Tu pedido está confirmado</h3>
					<p className='text-sm'>
						Gracias por realizar tu compra en Fajas Anjully. Para
						realizar la transferencia te compartimos los siguientes
						datos
					</p>

					<div className='space-y-0.5 text-sm'>
						<p>BANCOLOMBIA </p>
						<p>Razón Social: Fajas Anjully</p>
						<p>Tipo de cuenta: Ahorros</p>
						<p>Número de cuenta: 20500000318</p>
					</div>

					<p className='text-sm'>
						Una vez realizada la transferencia, comparte tu
						comprobante a FajasAnjully@gmail.com para procesarla
						y hacerte la entrega de tu producto a domicilio.
					</p>
				</div>

				<div className='border border-slate-200 w-full p-5 rounded-md space-y-3 md:w-[600px]'>
					<h3 className='font-medium'>Detalles del pedido</h3>

					<div className='flex flex-col gap-5'>
						<ul className='space-y-3'>
							{data.orderItems.map((item, index) => (
								<li
									key={index}
									className='flex justify-between items-center gap-3'
								>
									<div className='flex'>
										<img
											src={item.productImage}
											alt={item.productName}
											className='w-16 h-16 object-contain'
										/>
									</div>

									<div className='flex-1 space-y-2'>
										<div className='flex justify-between'>
											<p className='font-semibold'>
												{item.productName}
											</p>
											<p className='text-sm font-medium text-gray-600 mt-1'>
												{formatPrice(item.price)}
											</p>
										</div>

										<div className='flex gap-3'>
											<p className='text-[13px] text-gray-600'>
												{item.size} / {item.color_name}
											</p>
										</div>
									</div>
								</li>
							))}
						</ul>

						<div className='space-y-4 text-sm text-stone-700'>
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

					<div className='grid grid-cols-2 gap-5'>
						<div className='flex flex-col text-sm'>
							<p className='font-semibold'>Información de contacto:</p>
							<p>{data.customer.email}</p>
						</div>

						<div className='flex flex-col text-sm'>
							<p className='font-semibold'>Métodos de pago:</p>
							<p>Deposito bancario - {formatPrice(totalWithShipping)}</p>
						</div>

						<div className='flex flex-col text-sm'>
							<p className='font-semibold'>Dirección de envío</p>
							<p>{data.address.addressLine1}</p>
							<p>{data.address.addressLine2 && data.address.addressLine2}</p>
							<p>{data.address.city}</p>
							<p>{data.address.state}</p>
							<p>{data.address.postalCode}</p>
							<p>{data.address.country}</p>
						</div>

						<div className='flex flex-col text-sm'>
							<p className='font-semibold'>Método de envío</p>
							<p>Standard</p>
						</div>
					</div>
				</div>

				<div className='flex flex-col justify-between items-center w-full mb-5 gap-3 sm:flex-row md:w-[600px] md:gap-0'>
					<p className='text-sm'>
						¿Necesitas ayuda? Ponte en contacto con nosotros
					</p>
					<Link
						to='/productos'
						className='text-white bg-black py-4 text-sm rounded-md px-5 tracking-tight font-semibold'
					>
						Seguir comprando
					</Link>
				</div>
			</main>
		</div>
	);
};