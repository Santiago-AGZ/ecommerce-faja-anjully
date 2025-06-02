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

			<main className="w-full my-8 flex flex-col  px-10">
				<Outlet />
			</main>


			<Footer />
		</div>
	);
};
