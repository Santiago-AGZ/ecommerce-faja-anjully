import { Separator } from '../shared/Separator';

const availableLines = [
	'Posquirurgica', 
  'Deportiva', 
  'Reductora', 
  'Maternidad', 
  'Invisible', 
  'Control', 
  'Moldeadora',  
	'Complementos',

];

interface Props {
	selectedLines: string[];
	setSelectedLines: (lines: string[]) => void;
}

export const ContainerFilter = ({
	selectedLines,
	setSelectedLines,
}: Props) => {
	const handleBrandChange = (line: string) => {
		if (selectedLines.includes(line)) {
			setSelectedLines(selectedLines.filter(b => b !== line));
		} else {
			setSelectedLines([...selectedLines, line]);
		}
	};

	return (
		<div className='p-5 border border-slate-200 rounded-lg h-fit col-span-2 lg:col-span-1'>
			<h3 className='font-semibold text-xl mb-4'>Filtros</h3>

			{/* Separador  */}
			<Separator />

			<div className='flex flex-col gap-3'>
				<h3 className='text-lg font-medium text-black'>Categorias</h3>

				<div className='flex flex-col gap-2'>
					{availableLines.map(line => (
						<label key={line} className='inline-flex items-center'>
							<input
								type='checkbox'
								className='text-black border-black focus:ring-black accent-black'
								checked={selectedLines.includes(line)}
								onChange={() => handleBrandChange(line)}
							/>
							<span className='ml-2 text-black text-sm cursor-pointer'>
								{line}
							</span>
						</label>
					))}
				</div>
			</div>
		</div>
	);
};