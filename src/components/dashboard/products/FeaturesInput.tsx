import { useState } from "react";
import {
  useFieldArray,
  Control,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { ProductFormValues } from "../../../lib/validators";

interface Props {
  control: Control<ProductFormValues>;
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
}

export const FeaturesInput = ({ control, errors }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  const [newFeature, setNewFeature] = useState("");

  const handleAddFeature = () => {
    if (newFeature.trim() === "") return;

    append({ value: newFeature }); // Ahora append un objeto con value
    setNewFeature("");
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-700">
        Características
      </label>

      <div className="flex gap-2">
        <input
          type="text"
          value={newFeature}
          onChange={(e) => setNewFeature(e.target.value)}
          placeholder="Ej. Resistente al agua"
          className="flex-1 border rounded-md px-3 py-1.5 text-sm font-normal focus:outline-none"
        />
        <button
          type="button"
          onClick={handleAddFeature}
          className="text-sm font-medium text-white bg-slate-800 px-3 py-1.5 rounded-md hover:bg-slate-700 cursor-pointer"
        >
          Añadir
        </button>
      </div>

      <ul className="space-y-1 mt-2">
        {fields.map((feature, index) => (
          <li key={feature.id} className="flex justify-between items-center">
            <span className="text-sm text-slate-700">{feature.value}</span>
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-sm text-red-500 font-bold hover:scale-110"
            >
              X
            </button>
          </li>
        ))}
      </ul>

      {errors.features && (
        <p className="text-red-500 text-sm">
          {errors.features.message?.toString()}
        </p>
      )}
    </div>
  );
};
