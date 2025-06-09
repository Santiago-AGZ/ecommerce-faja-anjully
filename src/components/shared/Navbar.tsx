import { Link, NavLink } from 'react-router-dom';
import { navbarLinks } from '../../constants/links';
import {
	HiOutlineSearch,
	HiOutlineShoppingBag,
	HiOutlineUser,
} from 'react-icons/hi';
import { FaBarsStaggered } from 'react-icons/fa6';
import { Logo } from './Logo';
import { useGlobalStore } from '../../store/global.store';
import { useCartStore } from '../../store/cart.store';
import { useCustomer, useUser } from '../../hooks';
import { LuLoader } from 'react-icons/lu';

export const Navbar = () => {
	const openSheet = useGlobalStore(state => state.openSheet);
	const totalItemsInCart = useCartStore(state => state.totalItemsInCart);
	const setActiveNavMobile = useGlobalStore(state => state.setActiveNavMobile);
	const { session, isLoading } = useUser();
	const userId = session?.user.id;
	const { data: customer } = useCustomer(userId!);

	return (
		<header className='bg-[#c4879b] text-[#fbeaea] py-2 flex items-center justify-between px-5 border-b border-[#d19ba1] lg:px-12'>
			<div className='flex items-center justify-start flex-1'>
				<Logo />
			</div>

			<nav className='hidden md:flex items-center justify-center flex-1'>
				<div className='flex space-x-8'>
					{navbarLinks.map(link => (
						<NavLink
							key={link.id}
							to={link.href}
							className={({ isActive }) =>
								`text-lg ${isActive
									? "text-[#6d3843] font-semibold underline"
									: "text-[#fbeaea] hover:text-[#6d3843]"
								} transition-all duration-300`
							}
						>
							{link.title}
						</NavLink>
					))}
				</div>
			</nav>

			<div className='flex items-center justify-end flex-1 gap-6'>
				<button
					onClick={() => openSheet('search')}
					className='hover:text-[#6d3843] transition-colors cursor-pointer'
				>
					<HiOutlineSearch size={25} />
				</button>

				{isLoading ? (
					<LuLoader className='animate-spin' size={25} />
				) : session ? (
					<div className='relative'>
						<Link
							to='/account'
							className='border-2 border-[#fbeaea] w-9 h-9 rounded-full grid place-items-center text-lg font-bold hover:border-[#6d3843] hover:text-[#6d3843] transition-colors'
						>
							{customer && customer.full_name[0]}
						</Link>
					</div>
				) : (
					<Link
						to='/login'
						className='hover:text-[#6d3843] transition-colors'
					>
						<HiOutlineUser size={25} />
					</Link>
				)}

				<button
					className='relative hover:text-[#6d3843] transition-colors cursor-pointer'
					onClick={() => openSheet('cart')}
				>
					<span className='absolute -bottom-2 -right-2 w-5 h-5 grid place-items-center bg-black text-white text-xs rounded-full'>
						{totalItemsInCart}
					</span>
					<HiOutlineShoppingBag size={25} />
				</button>

				<button
					className='md:hidden hover:text-[#6d3843] transition-colors'
					onClick={() => setActiveNavMobile(true)}
				>
					<FaBarsStaggered size={25} />
				</button>
			</div>
		</header>
	);
};