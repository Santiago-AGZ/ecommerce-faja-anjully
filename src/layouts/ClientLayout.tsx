import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { signOut } from '../actions';
import { useRoleUser, useUser } from '../hooks';
import { useEffect } from 'react';
import { supabase } from '../supabase/client';
import { Loader } from '../components/shared/Loader';
import { HiOutlineExternalLink } from 'react-icons/hi';

export const ClientLayout = () => {
	const { session, isLoading: isLoadingSession } = useUser();
	const { data: role, isLoading: isLoadingRole } = useRoleUser(
		session?.user.id as string
	);

	const navigate = useNavigate();

	useEffect(() => {
		supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === 'SIGNED_OUT' || !session) {
				navigate('/login', { replace: true });
			}
		});
	}, [navigate]);

	if (isLoadingSession || isLoadingRole) return <Loader />;

	const handleLogout = async () => {
		await signOut();
	};

	return (
		<div className='flex flex-col min-h-screen'>
			{/* Menú */}
			<nav className='flex justify-center gap-10 text-sm font-medium py-4 bg-white shadow-sm'>
				<NavLink
					to='/account/pedidos'
					className={({ isActive }) =>
						`${isActive ? 'underline font-semibold' : 'hover:underline'}`
					}
				>
					Pedidos
				</NavLink>

				{role === 'admin' && (
					<NavLink
						to='/dashboard/productos'
						className='flex items-center gap-1 hover:underline'
					>
						Dashboard
						<HiOutlineExternalLink
							size={16}
							className='inline-block'
						/>
					</NavLink>
				)}

				<button className='hover:underline' onClick={handleLogout}>
					Cerrar sesión
				</button>
			</nav>

			<main className='flex-1 py-8 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-7xl mx-auto'>
					<Outlet />
				</div>
			</main>
		</div>
	);
};