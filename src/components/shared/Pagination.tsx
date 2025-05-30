interface Props {
  totalItems: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination = ({ totalItems, page, setPage }: Props) => {
  const handleNextpage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const itemPerPage = 10; // Número de items por página
  const totalPages = totalItems ? Math.ceil(totalItems / itemPerPage) : 1;
  const islasrPage = page >= totalPages;
  const startItem = (page - 1) * itemPerPage + 1;
  const endItem = Math.min(page * itemPerPage, totalItems);

  return (
    <div className="flex justify-between items-center">
      <p className="text-xs font-medium">
        Mostrando{" "}
        <span className="font-bold">
          {startItem} - {endItem}
        </span>{" "}
        de <span className="font-bold">{totalItems}</span> productos
      </p>

      <div className="flex gap-3">
        <button
          className="border border-slate-700 rounded-md font-semibold text-xs py-1 px-3 hover:bg-slate-700 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed disabled: border-slate-800 text disabled-text-slate-800 disabled:hover-bg-white disabled:hover:text-slate-700"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Anterior
        </button>
        <button
          className="border border-slate-700 rounded-md font-semibold text-xs py-1 px-3 hover:bg-slate-700 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed disabled: border-slate-800 text disabled-text-slate-800 disabled:hover-bg-white disabled:hover:text-slate-700"
          onClick={handleNextpage}
          disabled={islasrPage}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
