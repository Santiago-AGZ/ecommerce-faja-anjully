import {
  MdLocalShipping,
  MdSupportAgent,
  MdAutorenew,
  MdVerifiedUser,
  MdDesignServices,
  MdNature,
} from "react-icons/md";

export const FeatureGrid = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 gap-8 mt-10 mb-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {/* Envío Gratis (destacado) */}
      <div className="flex flex-col items-center gap-3 p-6 bg-[#F8F1F4] rounded-lg">
        <MdLocalShipping size={48} /> {/* Sin color asignado */}
        <p className="font-bold text-lg">Envío gratis</p>
        <p className="text-sm text-center text-[#4B1E2F]">En compras desde $150.000</p>
      </div>

      {/* Devoluciones */}
      <div className="flex flex-col items-center gap-3 p-6 bg-[#F8F1F4] rounded-lg">
        <MdAutorenew size={40} /> {/* Sin color asignado */}
        <p className="font-semibold">Devoluciones fáciles</p>
        <p className="text-sm text-[#4B1E2F]">7 días para cambiar tu pedido</p>
      </div>

      {/* Soporte */}
      <div className="flex flex-col items-center gap-3 p-6 bg-[#F8F1F4] rounded-lg">
        <MdSupportAgent size={40} /> {/* Sin color asignado */}
        <p className="font-semibold">Atención personalizada</p>
        <p className="text-sm text-[#4B1E2F]">Asesoría con cariño y dedicación</p>
      </div>

      {/* Garantía */}
      <div className="flex flex-col items-center gap-3 p-6 bg-[#F8F1F4] rounded-lg">
        <MdVerifiedUser size={40} /> {/* Sin color asignado */}
        <p className="font-semibold">Garantía asegurada</p>
        <p className="text-sm text-[#4B1E2F]">Calidad garantizada 3 meses</p>
      </div>

      {/* Diseño Exclusivo */}
      <div className="flex flex-col items-center gap-3 p-6 bg-[#F8F1F4] rounded-lg">
        <MdDesignServices size={40} /> {/* Sin color asignado */}
        <p className="font-semibold">Diseño exclusivo</p>
        <p className="text-sm text-[#4B1E2F]">Modelos únicos y elegantes</p>
      </div>

      {/* Materiales Premium */}
      <div className="flex flex-col items-center gap-3 p-6 bg-[#F8F1F4] rounded-lg">
        <MdNature size={40} /> {/* Sin color asignado */}
        <p className="font-semibold">Materiales Premium</p>
        <p className="text-sm text-[#4B1E2F]">Alta calidad y confort</p>
      </div>
    </div>
  );
};
