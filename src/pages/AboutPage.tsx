import { ShieldCheck, Sparkles, Lightbulb, Heart, MapPin } from "lucide-react";

export const AboutPage = () => {
  return (
    <div className="space-y-12 px-4 sm:px-8 py-12 max-w-6xl mx-auto font-sans">
      {/* Título principal */}
      <h1 className="text-left text-5xl font-bold tracking-tight text-[#d19ba1]">
        NUESTRA EMPRESA
      </h1>

      {/* Imagen principal */}
      <img
        src="/img/foto.webp"
        alt="Imagen de fondo"
        className="w-full max-w-5xl max-h-[500px] object-contain rounded-xl mx-auto"
      />

      {/* Descripción */}
      <div className="flex flex-col gap-6 leading-7 text-lg font-normal text-slate-800">
        <p>
          Con más de 15 años de experiencia, en{" "}
          <strong className="text-[#d19ba1]">Faja Anjuly</strong> nos dedicamos
          al diseño, confección y comercialización de prendas de control
          femenino. Nuestro compromiso es realzar la belleza y comodidad de la
          mujer moderna.
        </p>

        <p>
          Innovamos constantemente con tejidos inteligentes que brindan
          compresión, transpirabilidad y confort,{" "}
          <em className="italic text-[#d19ba1]">
            ajustándose a tu cuerpo como una segunda piel
          </em>
          , sin renunciar al estilo.
        </p>

        <p>
          Creemos que una faja no solo moldea tu cuerpo, sino también tu
          actitud. Por eso, creamos más que prendas:{" "}
          <span className="italic text-[#d19ba1]">
            creamos seguridad, confianza y bienestar.
          </span>{" "}
          Nos inspira cada mujer que desea sentirse bien, sin importar su edad,
          talla o estilo de vida.
        </p>
      </div>

      {/* Nuestros valores */}
      <div className="bg-[#f4c4c2]/20 p-8 rounded-xl shadow-inner">
        <h2 className="text-3xl font-semibold tracking-tight text-[#d19ba1] mb-4">
          Nuestros valores
        </h2>
        <ul className="space-y-3 text-slate-800">
          <li className="flex gap-3 items-start">
            <ShieldCheck className="text-[#d19ba1] w-5 h-5 mt-1" />
            <span>
              <strong className="text-[#d19ba1]">Confianza:</strong> Diseñamos
              para empoderar.
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <Sparkles className="text-[#d19ba1] w-5 h-5 mt-1" />
            <span>
              <strong className="text-[#d19ba1]">Calidad:</strong> Prendas
              duraderas y de alto nivel.
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <Lightbulb className="text-[#d19ba1] w-5 h-5 mt-1" />
            <span>
              <strong className="text-[#d19ba1]">Innovación:</strong> Tecnología
              textil para tu bienestar.
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <Heart className="text-[#d19ba1] w-5 h-5 mt-1" />
            <span>
              <strong className="text-[#d19ba1]">Pasión:</strong> Amor por lo
              que hacemos.
            </span>
          </li>
        </ul>
      </div>

      {/* Frase destacada */}
      <div className="bg-[#f4c4c2]/40 p-8 rounded-xl shadow-inner text-center">
        <p className="text-2xl italic text-[#d19ba1] font-medium">
          “La seguridad no se viste, se siente. Pero una buena faja ayuda.”
        </p>
      </div>

      {/* Por qué elegirnos */}
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-[#d19ba1] mb-4">
          ¿Por qué elegirnos?
        </h2>
        <ul className="grid sm:grid-cols-2 gap-4 text-slate-800">
          <li>
            <strong className="text-[#d19ba1]">✓ Experiencia:</strong> Más de 15
            años dedicados al bienestar femenino.
          </li>
          <li>
            <strong className="text-[#d19ba1]">✓ Confección nacional:</strong>{" "}
            Hecho en Colombia, con amor y detalle.
          </li>
          <li>
            <strong className="text-[#d19ba1]">✓ Para todas:</strong> Diseños
            inclusivos en tallas, estilos y edades.
          </li>
          <li>
            <strong className="text-[#d19ba1]">✓ Atención cercana:</strong>{" "}
            Asesoría personalizada para cada cliente.
          </li>
        </ul>
      </div>

      {/* Dónde encontrarnos */}
      <div className="bg-[#d19ba1]/10 p-6 rounded-xl mt-10 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-[#d19ba1] mb-4">
          Dónde encontrarnos
        </h2>
        <a
          href="https://www.google.com/maps/place/Cl.+33h+%2316-32,+Cali,+Valle+del+Cauca"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 text-[#d19ba1] font-semibold hover:underline"
        >
          <MapPin className="w-5 h-5" /> Ver ubicación en Google Maps
        </a>
      </div>

      {/* CTA Final */}
      <div className="text-center mt-12">
        <p className="text-lg text-slate-700 italic mb-4">
          Faja Anjuly — más que una prenda, una actitud.
        </p>
      </div>
    </div>
  );
};
