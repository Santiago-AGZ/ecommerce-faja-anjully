export const AboutPage = () => {
    return (
      <div className="px-4 py-10 flex justify-center">
        <div className="space-y-6 max-w-4xl w-full bg-pink-50 p-6 rounded-2xl shadow-md">
          <h1 className="text-center text-4xl font-bold tracking-tight text-pink-700 mb-8">
            Faja Anjuly – Belleza, Comodidad y Confianza
          </h1>
  
          <img
            src="https://plus.unsplash.com/premium_photo-1682716270464-9a91cbbcf3b7?fm=jpg&q=60&w=3000"
            alt="Imagen de fondo"
            className="h-[500px] w-full object-cover rounded-2xl shadow-md"
          />
  
          <div className="flex flex-col gap-5 text-slate-800 text-base leading-relaxed font-medium">
            <p>
              Con más de 15 años de experiencia, en <strong>Faja Anjuly</strong> nos dedicamos...
            </p>
  
            <p>...</p>
  
            <h2 className="text-2xl font-semibold text-pink-600 mt-4">
              Nuestros valores
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><strong>Confianza:</strong> Diseñamos para empoderar.</li>
              <li><strong>Calidad:</strong> Prendas duraderas y de alto nivel.</li>
              <li><strong>Innovación:</strong> Tecnología textil para tu bienestar.</li>
              <li><strong>Pasión:</strong> Amor por lo que hacemos.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
  