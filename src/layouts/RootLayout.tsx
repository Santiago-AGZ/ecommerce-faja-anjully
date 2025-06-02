import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';
import { Banner } from '../components/home/Banner';


export const RootLayout = () => {
	const { pathname } = useLocation();

	return (
		<div className='h-screen flex flex-col font-montserrat'>
			<Navbar />

			{pathname === '/' && <Banner />}

			<main className="w-full my-8 flex-1 flex flex-col items-center justify-center">
				<Outlet />
			</main>


			<Footer />
		</div>
	);
};
