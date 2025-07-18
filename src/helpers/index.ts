import { Color, Product, VariantProduct } from "../interfaces";

// Función para formatear el precio a pesos colombianos
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Función para preparar los productos - (CELULARES)
export const prepareProducts = (products: Product[]) => {
  return products.map((product) => {
    // Agrupar las variantes por color
    const colors = product.variants.reduce(
      (acc: Color[], variant: VariantProduct) => {
        const existingColor = acc.find((item) => item.color === variant.color);

        if (existingColor) {
          // Si ya existe el color, comparamos los precios
          existingColor.price = Math.min(existingColor.price, variant.price);
        } // Mantenemos el precio mínimo
        else {
          acc.push({
            color: variant.color,
            price: variant.price,
            name: variant.color_name,
          });
        }

        return acc;
      },
      []
    );

    // Obtener el precio más bajo de las variantes agrupadas
    const price = Math.min(...colors.map((item) => item.price));

    // Devolver el producto formateado
    return {
      ...product,
      price,
      colors: colors.map(({ name, color }) => ({ name, color })),
      variants: product.variants,
    };
  });
};

// Función para formatear la fecha a formato 3 de enero de 2022
export const formatDateLong = (date: string): string => {
  const dateObject = new Date(date);

  return dateObject.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Función para formatear la fecha a formato dd/mm/yyyy
export const formatDate = (date: string): string => {
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  });
};

// Función para obtener el estado del pedido en español
export const getStatus = (status: string): string => {
  const statusLower = status.toLowerCase();
  
  switch (statusLower) {
    case "pending":
      return "Pendiente";
    case "paid":
      return "Pagado";
    case "processing":
      return "Procesando";
    case "shipped":
      return "Enviado";
    case "delivered":
      return "Entregado";
    case "cancelled":
      return "Cancelado";
    case "refunded":
      return "Reembolsado";
    case "on-hold":
      return "En espera";
    case "failed":
      return "Fallido";
    default:
      return status;
  }
};
// Función para generar el slug de un producto
export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};


// Función para extraer el path relativo al bucket de una URL
export const extractFilePath = (url: string) => {
	const baseUrl = 'https://lybhjmccubymolspkpfr.supabase.co/storage/v1/object/public/product-images/';
	if (!url.startsWith(baseUrl)) {
		throw new Error(`URL no válida: ${url}`);
	}
	return url.replace(baseUrl, '');
};
