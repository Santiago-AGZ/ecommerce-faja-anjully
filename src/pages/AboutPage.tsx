export const AboutPage = () => {
  return (
    <div className="space-y-8 px-4 sm:px-8 py-8 max-w-5xl mx-auto">
      <h1 className="text-left text-4xl font-bold tracking-tight text-[#f3c1c0]">
        Nuestra empresa
      </h1>

      <div className="w-full h-[2px] bg-[#f4c4c2]" />

      <img
        src="/img/foto.webp"
        alt="Imagen de fondo"
        className="w-full max-w-4xl max-h-[500px] object-contain rounded-xl "
      />

      <div className="flex flex-col gap-5 tracking-tight leading-7 text-base font-medium text-slate-800">
        <p>
          Con más de 15 años de experiencia, en <strong className="text-[#f3c1c0]">Faja Anjuly</strong> nos
          dedicamos al diseño, confección y comercialización de prendas de
          control femenino. Nuestro compromiso es realzar la belleza y comodidad
          de la mujer moderna.
        </p>

        <p>
          Innovamos constantemente con tejidos inteligentes que brindan
          compresión, transpirabilidad y confort, <em className="italic text-[#f3c1c0]">ajustándose a tu cuerpo como una segunda piel</em>, sin renunciar al estilo.
        </p>

        <p>
          Creemos que una faja no solo moldea tu cuerpo, sino también tu
          actitud. Por eso, creamos más que prendas: <span className="italic text-[#f4c4c2]">creamos seguridad,
          confianza y bienestar.</span> Nos inspira cada mujer que desea sentirse bien,
          sin importar su edad, talla o estilo de vida.
        </p>

        <h2 className="text-3xl font-semibold tracking-tight mt-6 mb-2 text-[#f3c1c0]">
          Nuestros valores
        </h2>

        <ul className="list-disc list-inside space-y-1 pl-4">
          <li>
            <strong className="text-[#f4c4c2]">Confianza:</strong> Diseñamos para empoderar.
          </li>
          <li>
            <strong className="text-[#f4c4c2]">Calidad:</strong> Prendas duraderas y de alto nivel.
          </li>
          <li>
            <strong className="text-[#f4c4c2]">Innovación:</strong> Tecnología textil para tu bienestar.
          </li>
          <li>
            <strong className="text-[#f4c4c2]">Pasión:</strong> Amor por lo que hacemos.
          </li>
        </ul>
      </div>

      {/* Frase destacada */}
      <div className="bg-[#f4c4c2]/30 p-6 rounded-xl shadow-inner text-center mt-10">
        <p className="text-xl italic text-[#f3c1c0] font-medium">
          “La seguridad no se viste, se siente. Pero una buena faja ayuda.”
        </p>
      </div>

      {/* ¿Por qué elegirnos? */}
      <h2 className="text-3xl font-semibold tracking-tight mt-10 text-[#f3c1c0]">
        ¿Por qué elegirnos?
      </h2>
      <ul className="mt-4 space-y-3 text-slate-800">
        <li><span className="text-[#f4c4c2] font-semibold">✓ Experiencia:</span> Más de 15 años dedicados al bienestar femenino.</li>
        <li><span className="text-[#f4c4c2] font-semibold">✓ Confección nacional:</span> Hecho en Colombia, con amor y detalle.</li>
        <li><span className="text-[#f4c4c2] font-semibold">✓ Para todas:</span> Diseños inclusivos en tallas, estilos y edades.</li>
        <li><span className="text-[#f4c4c2] font-semibold">✓ Atención cercana:</span> Asesoría personalizada para cada cliente.</li>
      </ul>

      {/* Grilla visual */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-center">
        <div className="p-4 border rounded-xl bg-white shadow-sm">
          <h3 className="text-[#f3c1c0] font-semibold text-lg">Diseño Colombiano</h3>
          <p className="text-sm text-slate-700 mt-2">Hecho con pasión y detalle.</p>
        </div>
        <div className="p-4 border rounded-xl bg-white shadow-sm">
          <h3 className="text-[#f3c1c0] font-semibold text-lg">Comodidad real</h3>
          <p className="text-sm text-slate-700 mt-2">Te acompaña todo el día.</p>
        </div>
        <div className="p-4 border rounded-xl bg-white shadow-sm">
          <h3 className="text-[#f3c1c0] font-semibold text-lg">Estilo y control</h3>
          <p className="text-sm text-slate-700 mt-2">Sin sacrificar belleza ni forma.</p>
        </div>
      </div>

      {/* Mapa */}
      <div className="w-full h-[2px] bg-[#f4c4c2] mt-10 mb-6" />

      <h2 className="text-3xl font-semibold tracking-tight text-[#f3c1c0] mb-4">
        Dónde encontrarnos
      </h2>

      <div className="rounded-xl overflow-hidden border-4 border-[#f3c1c0] shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.6149359835763!2d-76.5094064!3d3.4434575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a6561dd19905%3A0xdbbe1f360fff0a82!2sCl.%2033h%20%23%2016-32%2C%20Comuna%208%2C%20Cali%2C%20Valle%20del%20Cauca!5e0!3m2!1sen!2sco!4v1749324965767!5m2!1sen!2sco"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Cierre / lema final */}
      <div className="text-center mt-12">
        <p className="text-lg text-slate-700 italic">
          Faja Anjuly — más que una prenda, una actitud.
        </p>
      </div>
    </div>
  );
};
