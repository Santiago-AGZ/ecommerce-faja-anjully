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
    
      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-16 sm:px-8 sm:py-24 text-center max-w-2xl w-full">
       

       
      </div>
    </section>
  );
};
