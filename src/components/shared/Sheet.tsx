import { useEffect, useRef, useState } from 'react';
import { useGlobalStore } from '../../store/global.store';
import { Cart } from './Cart';
import { Search } from './Search';

export const Sheet = () => {
	const sheetContent = useGlobalStore(state => state.sheetContent);
	const closeSheetStore = useGlobalStore(state => state.closeSheet);

	const sheetRef = useRef<HTMLDivElement | null>(null);
	const [isClosing, setIsClosing] = useState(false);

	useEffect(() => {
		document.body.style.overflow = 'hidden';

		// Función para manejar clics fuera del Sheet
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				sheetRef.current &&
				!sheetRef.current.contains(event.target as Node)
			) {
				setIsClosing(true);
			}
		};

		// Agregar event Listener
		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.body.style.overflow = 'unset';
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, []);

	// Función para cerrar el Sheet después de la animación
	const handleAnimationEnd = () => {
		if (isClosing) {
			closeSheetStore();
		}
	};

	// Función para saber el componente a renderizar
	const renderContent = () => {
		switch (sheetContent) {
			case 'cart':
				return <Cart />;
			case 'search':
				return <Search />;
			default:
				return null;
		}
	};

	return (
		<div className='fixed inset-0 bg-black/50 z-50 flex justify-end'>
			<div
				ref={sheetRef}
				className={`bg-white text-black h-screen w-[500px] shadow-lg ${
					isClosing ? 'sheet-out' : 'sheet-in'
				}`}
				onAnimationEnd={handleAnimationEnd}
			>
				{renderContent()}
			</div>
		</div>
	);
};