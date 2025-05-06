export const Newsletter = () => {
  return (
    <div className="relative bg-[#F8F4F2] text-[#4B1E2F] py-20">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 h-full"
        style={{
          backgroundImage: "url(/img/newsletter.png)",
        }}
      />

      {/* Contenido del Newsletter */}
      <div className="container mx-auto z-10 relative p-5 md:p-0">
        <div className="w-full text-black bg-white p-12 space-y-5 md:w-[50%] lg:w-[40%] rounded-lg shadow-xl mx-auto">
          <p className="text-xs uppercase font-semibold text-[#D87EA6]">
            Suscríbete a nuestro boletín y recibe promociones exclusivas
          </p>
          <p className="text-xs font-medium text-[#4B1E2F] w-[80%] leading-5">
            Introduce tu correo para recibir ofertas y novedades de <span className="font-bold text-[#D87EA6]">Fajas Anjully</span>.
          </p>
          <form className="flex flex-col gap-5 xl:flex-row">
            <input
              type="email"
              className="border border-[#D19BA1] focus:outline-none rounded-full py-3 px-5 w-full text-xs font-medium"
              placeholder="Correo Electrónico"
            />

            <button className="bg-[#D87EA6] hover:bg-[#A06078] text-white font-semibold rounded-full uppercase tracking-wider py-3 text-xs xl:px-5 transition-all duration-300">
              Suscribirme
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
