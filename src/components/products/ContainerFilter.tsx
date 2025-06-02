import { Separator } from "../shared/Separator";

// Lista de categorías disponibles
const availableLines = [
  "Romantic",
  "Power-Net",
  "Smarth-Fresh",
  "Post-Quirurgica",
  "Complementos",
];

interface Props {
  selectedLines: string[];
  setSelectedLines: (lines: string[]) => void;
}

// Checkbox individual
const CategoryCheckbox = ({
  line,
  selected,
  onToggle,
}: {
  line: string;
  selected: boolean;
  onToggle: () => void;
}) => (
  <label className="flex items-center gap-2 text-sm text-slate-800 cursor-pointer">
    <input
      type="checkbox"
      checked={selected}
      onChange={onToggle}
      aria-label={`Seleccionar categoría ${line}`}
      className="accent-black h-4 w-4 border border-slate-400 rounded focus:ring-2 ring-black/20"
    />
    {line}
  </label>
);

// Componente principal
export const ContainerFilter = ({ selectedLines, setSelectedLines }: Props) => {
  const selectedSet = new Set(selectedLines);

  const toggleLine = (line: string) => {
    setSelectedLines(
      selectedSet.has(line)
        ? selectedLines.filter((l) => l !== line)
        : [...selectedLines, line]
    );
  };

  const clearFilters = () => {
    setSelectedLines([]);
  };

  const toggleSelectAll = () => {
    if (selectedLines.length === availableLines.length) {
      setSelectedLines([]);
    } else {
      setSelectedLines([...availableLines]);
    }
  };

  const allSelected = selectedLines.length === availableLines.length;

  return (
    <div className="p-5 border border-slate-200 rounded-2xl shadow-md h-fit col-span-2 lg:col-span-1 bg-white">
      {/* Título principal */}
      <h3 className="font-bold text-xl text-slate-800 mb-4">Filtros</h3>

      {/* Botón para limpiar filtros */}
      {selectedLines.length > 0 && (
        <button
          onClick={clearFilters}
          className="mb-2 px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors"
        >
          Limpiar filtros ({selectedLines.length})
        </button>
      )}

      {/* Botón seleccionar/deseleccionar todo */}
      <button
        onClick={toggleSelectAll}
        className="mb-4 px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors"
      >
        {allSelected ? "Deseleccionar todo" : "Seleccionar todo"}
      </button>

      <Separator />

      {/* Categorías */}
      <div className="flex flex-col gap-4 mt-4">
        <h4 className="text-lg font-semibold text-slate-700">Categorías</h4>

        {/* Contador (opcional) */}
        <p className="text-sm text-slate-500">
          {selectedLines.length} de {availableLines.length} seleccionadas
        </p>

        <div className="flex flex-col gap-2">
          {availableLines.map((line) => (
            <CategoryCheckbox
              key={line}
              line={line}
              selected={selectedSet.has(line)}
              onToggle={() => toggleLine(line)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
