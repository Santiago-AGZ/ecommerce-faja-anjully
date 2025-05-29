// index.ts

import { PreparedProduct, Product } from "@/interfaces";


// Función para formatear el precio a COP (Peso colombiano)
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

// Función para preparar los productos
export const prepareProducts = (products: Product[]): PreparedProduct[] => {
  return products.map(product => {
    // Agrupar las variantes por color y obtener el precio mínimo por color
    const colors = product.variants.reduce<
      {
        name: string;
        color: string;
        price: number;
      }[]
    >((acc, variant) => {
      // Buscamos si ya existe el color en acc
      const existing = acc.find(item => item.color === variant.color.hex_code);

      if (existing) {
        // Si existe, actualizamos el precio mínimo
        if (variant.price < existing.price) {
          existing.price = variant.price;
        }
      } else {
        // Si no existe, agregamos el color con el precio
        acc.push({
          name: variant.color.name,
          color: variant.color.hex_code,
          price: variant.price,
        });
      }

      return acc;
    }, []);

    // Obtener el precio más bajo de todas las variantes (precios mínimos por color)
    const price = Math.min(...colors.map(c => c.price));

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      features: product.features,
      description: product.description,
      images: product.images,
      created_at: product.created_at,
      price,
      colors: colors.map(({ name, color }) => ({ name, color })),
      variants: product.variants,
      // Puedes agregar category y line si los tienes disponibles
      category: product.category,
      line: product.line,
    };
  });
};
