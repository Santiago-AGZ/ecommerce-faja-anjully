import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { supabase } from '../supabase/client';
import { Loader } from '../components/shared/Loader';
import { useUser } from '@/hooks/auth/useUser';
import { signOut } from '@/actions';

export const ClientLayout = () => {
	const { session, isLoading: isLoadingSession } = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === 'SIGNED_OUT' || !session) {
				navigate('/login');
			}
		});
	}, [navigate]);

	if (isLoadingSession) return <Loader />;

	const handleLogout = async () => {
		await signOut();
	};

	return (
		<div className='w-full min-h-screen flex flex-col items-center px-4 md:px-8 py-10'>
			{/* Menú de navegación */}
			<nav className='flex items-center justify-center gap-8 text-sm font-semibold text-stone-700 mb-12'>
				<NavLink
					to='/account/pedidos'
					className={({ isActive }) =>
						`transition-all ${isActive ? 'underline underline-offset-4 text-black' : 'hover:underline hover:text-black'}`
					}
				>
					Pedidos
				</NavLink>

				{/* Puedes agregar más links aquí */}
				<button
					onClick={handleLogout}
					className='hover:underline hover:text-black transition-all'
				>
					Cerrar sesión
				</button>
			</nav>

			{/* Contenido dinámico */}
			<main className='w-full max-w-6xl'>
				<Outlet />
			</main>
		</div>
	);
};
