import { useState } from 'react';

interface Props {
	images: string[];
}

export const GridImages = ({ images }: Props) => {
	const [activeImage, setActiveImage] = useState(images[0]);

	const handleImageClick = (image: string) => {
		setActiveImage(image);
	};

	return (
		<div className='flex-1 flex flex-col gap-3 relative items-center w-full'>
			<div className='bg-[#f2f2f2] h-[420px] xs:h-[500px] sm:h-[600px] md:h-[700px] p-1 xs:p-4 w-full flex items-center justify-center mx-auto'>
				<img
					src={activeImage}
					alt='Imagen de Producto'
					className='h-full w-full object-contain'
				/>
			</div>

			{/* Miniaturas */}
			<div className='flex flex-wrap gap-4 mt-4 justify-center w-full'>
				{images.map((image, index) => (
					<button
						key={index}
						onClick={() => handleImageClick(image)}
						className={`w-15 h-25 border ${
							activeImage === image
								? 'border-black'
								: 'border-transparent'
						} rounded-lg hover:border-black focus:outline-none overflow-hidden`}
					>
						<img
							src={image}
							alt={`Thumbnail ${index + 1}`}
							className='w-full h-full object-cover rounded-lg'
						/>
					</button>
				))}
			</div>
		</div>
	);
};