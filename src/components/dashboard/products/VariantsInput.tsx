import {
  useFieldArray,
  Control,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { ProductFormValues } from "../../../lib/validators";
import { useState } from "react";
import { formatPrice } from "../../../helpers";

interface Props {
  control: Control<ProductFormValues>;
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
}

export const VariantsInput = ({ control, errors }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const [newVariant, setNewVariant] = useState({
    size: "",
    color: "#000000",
    color_name: "",
    price: 0,
    stock: 0,
  });

  const handleAddVariant = () => {
    if (!newVariant.size || !newVariant.color_name || newVariant.price <= 0) {
      return;
    }

    append(newVariant);
    setNewVariant({
      size: "",
      color: "#000000",
      color_name: "",
      price: 0,
      stock: 0,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-900">
            Talla
          </label>
          <input
            type="text"
            value={newVariant.size}
            onChange={(e) =>
              setNewVariant({ ...newVariant, size: e.target.value })
            }
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 text-sm focus:outline-none"
            placeholder="Ej. XS, S, M, L, XL, etc."
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-900">
            Color (hex)
          </label>
          <div className="flex items-center mt-1 gap-2">
            <input
              type="color"
              value={newVariant.color}
              onChange={(e) =>
                setNewVariant({ ...newVariant, color: e.target.value })
              }
              className="h-8 w-8 rounded border border-gray-300"
            />
            <input
              type="text"
              value={newVariant.color}
              onChange={(e) =>
                setNewVariant({ ...newVariant, color: e.target.value })
              }
              className="block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 text-sm focus:outline-none"
              placeholder="#FFFFFF"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-900">
            Nombre color
          </label>
          <input
            type="text"
            value={newVariant.color_name}
            onChange={(e) =>
              setNewVariant({ ...newVariant, color_name: e.target.value })
            }
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 text-sm focus:outline-none"
            placeholder="Ej. Negro, Rojo, etc."
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-900">
            Precio
          </label>
          <input
            type="text"
            value={formatPrice(newVariant.price)}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/[^\d]/g, ""); // Elimina todo menos números
              const numericValue = parseInt(rawValue, 10) || 0;

              setNewVariant({
                ...newVariant,
                price: numericValue,
              });
            }}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 text-sm focus:outline-none"
            placeholder="$0"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-900">
            Stock
          </label>
          <input
            type="number"
            min={0}
            max={10000}
            step={1}
            value={newVariant.stock.toString()}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/^0+(?=\d)/, ""); // elimina ceros al inicio
              const parsed = parseInt(cleaned, 10);
              setNewVariant({
                ...newVariant,
                stock: Number.isNaN(parsed) ? 0 : parsed,
              });
            }}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 text-sm focus:outline-none"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddVariant}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none cursor-pointer"
        style={{
          backgroundColor: "#F3C1C0",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#d9a9a8")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#F3C1C0")
        }
      >
        Añadir Variante
      </button>

      <div className="space-y-2">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
          >
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">{field.size}</span>
              <div className="flex items-center">
                <div
                  className="w-5 h-5 rounded-full border border-gray-300"
                  style={{ backgroundColor: field.color }}
                ></div>
                <span className="ml-2 text-sm">{field.color_name}</span>
              </div>
              <span className="text-sm">{formatPrice(field.price)}</span>
              <span className="text-sm">Stock: {field.stock}</span>
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-500 hover:text-red-700 text-sm cursor-pointer"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {errors.variants && (
        <p className="text-red-500 text-xs mt-2">{errors.variants.message}</p>
      )}
    </div>
  );
};
