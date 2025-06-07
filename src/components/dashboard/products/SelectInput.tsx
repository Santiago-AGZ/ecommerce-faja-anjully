import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ProductFormValues } from "../../../lib/validators";

interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  name: keyof ProductFormValues;
  options: Option[];
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  required?: boolean;
  className?: string;
}

export const SelectInput = ({
  label,
  name,
  options,
  register,
  errors,
  required = false,
  className = "",
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <label
          htmlFor={name}
          className="text-xs font-bold tracking-tight capitalize text-slate-900"
        >
          {label}:
        </label>
        {required && (
          <span className="text-red-500 text-sm mr-3 font-bold">*</span>
        )}
      </div>

      <select
        id={name}
        className={`border ${
          errors[name] ? "border-red-500" : "border-gray-300"
        } rounded-md py-1.5 px-3 text-sm font-medium tracking-tighter w-full text-slate-600 outline-none focus:outline-none ${className}`}
        {...register(name)}
      >
        <option value="">Seleccione una opción</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      
    </div>
  );
};
