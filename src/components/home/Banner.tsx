import { Link } from 'react-router-dom';

export const Banner = () => {
	return (
		<div className='relative bg-[#F8F4F2] text-[#4B1E2F]'>
			{/* Imagen de fondo suavemente visible */}
			<div
				className='absolute inset-0 bg-cover bg-center opacity-70 h-full'
				style={{ backgroundImage: 'url(/img/banner.png)' }}
			/>

			{/* Capa rosada suave */}
			<div className='absolute inset-0 bg-[#D19BA1] opacity-30' />

			{/* Contenido principal */}
			<div className='relative z-10 flex flex-col items-center justify-center py-24 px-6 text-center lg:py-48 lg:px-12'>
				<h1 className='text-4xl font-extrabold tracking-tight mb-6 lg:text-6xl'>
					Descubre el poder de tu silueta <br />
					con <span className='text-[#EEE6E]'>Fajas Anjully</span>
				</h1>

				<p className='text-lg lg:text-2xl max-w-2xl mb-10 text-[#4B1E2F]'>
					Fajas premium que estilizan, moldean y te acompañan con elegancia en cada paso.
				</p>

				<Link
					to='/productos'
					className='bg-[#D87EA6] hover:bg-[#A06078] text-white font-medium text-lg py-3 px-8 rounded-full shadow-md transition-all duration-300'
				>
					Ver catálogo completo
				</Link>
			</div>
		</div>
	);
};
