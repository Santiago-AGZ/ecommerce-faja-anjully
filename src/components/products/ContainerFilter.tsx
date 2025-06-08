import { getUniqueCategories, getUniqueCompressionLevels, getUniqueLines } from "@/actions";
import { Separator } from "../shared/Separator";
import { useEffect, useState } from "react";


interface FilterState {
  lines: string[];
  compressionLevels: string[];
  categories: string[];
}

interface Props {
  selectedFilters: FilterState;
  setSelectedFilters: (filters: FilterState) => void;
}

const FilterCheckbox = ({
  value,
  selected,
  onToggle,
  label,
}: {
  value: string;
  selected: boolean;
  onToggle: () => void;
  label: string;
}) => (
  <label className="flex items-center gap-2 text-sm text-slate-800 cursor-pointer">
    <input
      type="checkbox"
      checked={selected}
      onChange={onToggle}
      aria-label={`Seleccionar ${label} ${value}`}
      className="accent-black h-4 w-4 border border-slate-400 rounded focus:ring-2 ring-black/20"
    />
    {value}
  </label>
);

export const ContainerFilter = ({ selectedFilters, setSelectedFilters }: Props) => {
  const [availableFilters, setAvailableFilters] = useState<FilterState>({
    lines: [],
    compressionLevels: [],
    categories: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [lines, compressionLevels, categories] = await Promise.all([
          getUniqueLines(),
          getUniqueCompressionLevels(),
          getUniqueCategories()
        ]);

        setAvailableFilters({
          lines: lines || [],
          compressionLevels: compressionLevels || [],
          categories: categories || []
        });
      } catch (error) {
        console.error("Error fetching filters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  const toggleFilter = (type: keyof FilterState, value: string) => {
    const currentFilters = [...selectedFilters[type]];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter(v => v !== value)
      : [...currentFilters, value];

    setSelectedFilters({
      ...selectedFilters,
      [type]: newFilters
    });
  };

  const clearFilters = () => {
    setSelectedFilters({
      lines: [],
      compressionLevels: [],
      categories: []
    });
  };

  const toggleSelectAll = (type: keyof FilterState) => {
    const allValues = availableFilters[type];
    const currentValues = selectedFilters[type];

    setSelectedFilters({
      ...selectedFilters,
      [type]: currentValues.length === allValues.length ? [] : [...allValues]
    });
  };

  const getSelectedCount = () => {
    return (
      selectedFilters.lines.length +
      selectedFilters.compressionLevels.length +
      selectedFilters.categories.length
    );
  };

  if (loading) {
    return (
      <div className="p-5 border border-slate-200 rounded-2xl shadow-md h-fit col-span-2 lg:col-span-1 bg-white">
        <h3 className="font-bold text-xl text-slate-800 mb-4">Filtros</h3>
        <p>Cargando filtros...</p>
      </div>
    );
  }

  return (
    <div className="p-5 border border-slate-200 rounded-2xl shadow-md h-fit col-span-2 lg:col-span-1 bg-white">
      <h3 className="font-bold text-xl text-slate-800 mb-4">Filtros</h3>

      {getSelectedCount() > 0 && (
        <button
          onClick={clearFilters}
          className="mb-2 px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors"
        >
          Limpiar filtros ({getSelectedCount()})
        </button>
      )}

      <Separator />

      {/* Filtro por Línea */}
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold text-slate-700">Líneas</h4>
          <button
            onClick={() => toggleSelectAll('lines')}
            className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors"
          >
            {selectedFilters.lines.length === availableFilters.lines.length ?
              "Deseleccionar" : "Seleccionar todo"}
          </button>
        </div>

        <p className="text-sm text-slate-500">
          {selectedFilters.lines.length} de {availableFilters.lines.length} seleccionadas
        </p>

        <div className="flex flex-col gap-2">
          {availableFilters.lines.map(line => (
            <FilterCheckbox
              key={`line-${line}`}
              value={line}
              selected={selectedFilters.lines.includes(line)}
              onToggle={() => toggleFilter('lines', line)}
              label="línea"
            />
          ))}
        </div>
      </div>

      <Separator />

      {/* Filtro por Nivel de Compresión */}
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold text-slate-700">Niveles de Compresión</h4>
          <button
            onClick={() => toggleSelectAll('compressionLevels')}
            className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors"
          >
            {selectedFilters.compressionLevels.length === availableFilters.compressionLevels.length ?
              "Deseleccionar" : "Seleccionar todo"}
          </button>
        </div>

        <p className="text-sm text-slate-500">
          {selectedFilters.compressionLevels.length} de {availableFilters.compressionLevels.length} seleccionados
        </p>

        <div className="flex flex-col gap-2">
          {availableFilters.compressionLevels.map(level => (
            <FilterCheckbox
              key={`level-${level}`}
              value={level}
              selected={selectedFilters.compressionLevels.includes(level)}
              onToggle={() => toggleFilter('compressionLevels', level)}
              label="nivel de compresión"
            />
          ))}
        </div>
      </div>

      <Separator />

      {/* Filtro por Categoría */}
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold text-slate-700">Categorías</h4>
          <button
            onClick={() => toggleSelectAll('categories')}
            className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors"
          >
            {selectedFilters.categories.length === availableFilters.categories.length ?
              "Deseleccionar" : "Seleccionar todo"}
          </button>
        </div>

        <p className="text-sm text-slate-500">
          {selectedFilters.categories.length} de {availableFilters.categories.length} seleccionadas
        </p>

        <div className="flex flex-col gap-2">
          {availableFilters.categories.map(category => (
            <FilterCheckbox
              key={`category-${category}`}
              value={category}
              selected={selectedFilters.categories.includes(category)}
              onToggle={() => toggleFilter('categories', category)}
              label="categoría"
            />
          ))}
        </div>
      </div>
    </div>
  );
};