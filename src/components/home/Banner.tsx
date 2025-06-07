import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export const Banner = () => {
  return (
    <section
      className="relative bg-[#F8F4F2] text-white min-h-[60vh] flex items-center justify-center"
      role="banner"
      aria-label="Promoción principal Fajas Anjully"
    >
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/img/banner1.PNG)" }}
        aria-hidden="true"
      />
      {/* Capa oscura suave para mejorar legibilidad */}
      <div
        className="absolute inset-0 bg-black opacity-50 sm:opacity-30 transition-opacity duration-500"
        aria-hidden="true"
      />
      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-16 sm:px-8 sm:py-24 text-center max-w-2xl w-full">
        <h1 className="animate-fade-in-down text-4xl font-extrabold tracking-tight mb-6 lg:text-6xl drop-shadow-lg leading-tight">
          Descubre el poder de tu silueta <br />
          <span className="relative inline-block">
            <span className="text-pink-200 ">Fajas Anjully</span>
            <span className="block h-1 w-2/3 mx-auto bg-pink-200 rounded-full mt-1 animate-pulse" />
          </span>
        </h1>
        <p className="text-lg lg:text-2xl max-w-2xl mb-4 drop-shadow-md text-white/90">
          Fajas premium que estilizan, moldean y te acompañan con elegancia en cada paso.
        </p>
       
        <Link
          to="/productos"
          aria-label="Ver catálogo completo de productos"
          className="inline-flex items-center gap-2 bg-[#D87EA6] hover:bg-[#A06078] border-2 border-white/30 hover:border-pink-200 text-white font-semibold text-lg py-3 px-8 rounded-full shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-200/60 scale-100 hover:scale-105 hover:shadow-pink-200/40"
        >
          Ver catálogo completo <FaArrowRight className="text-xl" />
        </Link>
      </div>
    </section>
  );
};