import { Separator } from "../shared/Separator";

const mainCategories = ["Fajas", "Complementos"];

const fajaLines = ["Romantic", "Power Net", "Smart Fresh", "Post-Quirúrgica"];

interface Props {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedLines: string[];
  setSelectedLines: (lines: string[]) => void;
}

export const ContainerFilter = ({
  selectedCategories,
  setSelectedCategories,
  selectedLines,
  setSelectedLines,
}: Props) => {
  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleLineChange = (line: string) => {
    if (selectedLines.includes(line)) {
      setSelectedLines(selectedLines.filter((l) => l !== line));
    } else {
      setSelectedLines([...selectedLines, line]);
    }
  };

  return (
    <div className="p-5 border border-slate-200 rounded-lg h-fit col-span-2 lg:col-span-1">
      <h3 className="font-semibold text-xl mb-4">Filtros</h3>

      <Separator />

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-medium text-black">Categorías</h3>
        {mainCategories.map((cat) => (
          <label key={cat} className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() => handleCategoryChange(cat)}
              className="text-black border-black focus:ring-black accent-black"
            />
            <span className="ml-2 text-sm">{cat}</span>
          </label>
        ))}

        {/* Subfiltros de líneas */}
        {selectedCategories.includes("Fajas") && (
          <>
            <Separator />
            <h4 className="text-md font-medium text-black mt-2">Líneas</h4>
            {fajaLines.map((line) => (
              <label
                key={line}
                className="inline-flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedLines.includes(line)}
                  onChange={() => handleLineChange(line)}
                  className="text-black border-black focus:ring-black accent-black"
                />
                <span className="ml-2 text-sm">{line}</span>
              </label>
            ))}
          </>
        )}

        {(selectedCategories.length > 0 || selectedLines.length > 0) && (
          <button 
            onClick={() => {
              setSelectedCategories([]);
              setSelectedLines([]);
            }}
            className="text-sm text-red-600 underline mt-2 self-start cursor-pointer"
          >
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
};
