import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { ProductFormValues } from '../../../lib/validators';
import { useEffect, useState } from 'react';
import { getUniqueCategories, getUniqueCompressionLevels, getUniqueLines } from '@/actions';


interface SelectInputProps {
    className?: string;
    label: string;
    placeholder?: string;
    name: keyof ProductFormValues;
    register: UseFormRegister<ProductFormValues>;
    errors: FieldErrors<ProductFormValues>;
    required?: boolean;
    setValue: UseFormSetValue<ProductFormValues>;
    watch: any;
    type: 'select' | 'input';
}

export const SelectInput = ({
    className,
    label,
    placeholder,
    name,
    register,
    errors,
    required,
    setValue,
    watch,
    type,
}: SelectInputProps) => {
    const [options, setOptions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [newOption, setNewOption] = useState('');

    useEffect(() => {
        const fetchOptions = async () => {
            setIsLoading(true);
            try {
                let data: string[] = [];
                if (name === 'compression_level') {
                    data = await getUniqueCompressionLevels();
                } else if (name === 'line') {
                    data = await getUniqueLines();
                } else if (name === 'category') {
                    data = await getUniqueCategories();
                }
                setOptions(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        if (type === 'select') {
            fetchOptions();
        }
    }, [name, type]);

    const handleAddOption = () => {
        if (newOption.trim() && !options.includes(newOption.trim())) {
            setOptions([...options, newOption.trim()]);
            setValue(name, newOption.trim(), { shouldValidate: true });
            setNewOption('');
        }
    };

    const currentValue = watch(name);

    if (type === 'input') {
        return (
            <div className='flex flex-col gap-2'>
                <div className='flex justify-between items-center'>
                    <label
                        htmlFor={name}
                        className='text-xs font-bold tracking-tight capitalize text-slate-900'
                    >
                        {label}:
                    </label>

                    {required && (
                        <span className='text-red-500 text-sm mr-3 font-bold self-end'>*</span>
                    )}
                </div>

                <div
                    className={`border border-gray-300 rounded-md overflow-hidden gap-5 items-center ${errors[name] ? 'border-red-500' : ''
                        }`}
                >
                    <input
                        type='text'
                        placeholder={placeholder}
                        id={name}
                        className={`py-1.5 text-sm px-3 font-medium tracking-tighter w-full text-slate-600 outline-none focus:outline-none ${className}`}
                        autoComplete='off'
                        {...register(name)}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex justify-between items-center'>
                <label
                    htmlFor={name}
                    className='text-xs font-bold tracking-tight capitalize text-slate-900'
                >
                    {label}:
                </label>

                {required && (
                    <span className='text-red-500 text-sm mr-3 font-bold self-end'>*</span>
                )}
            </div>

            <div className='flex flex-col gap-2'>
                <div
                    className={`border border-gray-300 rounded-md overflow-hidden gap-5 items-center ${errors[name] ? 'border-red-500' : ''
                        }`}
                >
                    <select
                        id={name}
                        className={`py-1.5 text-sm px-3 font-medium tracking-tighter w-full text-slate-600 outline-none focus:outline-none ${className}`}
                        {...register(name)}
                        value={currentValue || ''}
                        onChange={(e) => setValue(name, e.target.value, { shouldValidate: true })}
                    >
                        <option value=''>Seleccionar {label.toLowerCase()}</option>
                        {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='flex gap-2'>
                    <input
                        type='text'
                        placeholder={`Añadir nueva ${label.toLowerCase()}`}
                        value={newOption}
                        onChange={(e) => setNewOption(e.target.value)}
                        className='py-1.5 text-sm px-3 font-medium tracking-tighter w-full text-slate-600 outline-none focus:outline-none border border-gray-300 rounded-md'
                    />
                    <button
                        type='button'
                        onClick={handleAddOption}
                        className='bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600'
                    >
                        Añadir
                    </button>
                </div>
            </div>
        </div>
    );
};