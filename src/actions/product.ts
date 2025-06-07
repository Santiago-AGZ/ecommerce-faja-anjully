import { ProductInput } from "@/interfaces";
import { supabase } from "../supabase/client";

export const getProducts = async (page: number) => {
  const itemsPerPage = 10;
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  const {
    data: products,
    error,
    count,
  } = await supabase
    .from("products")
    .select("*, variants(*)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return { products, count };
};

export const getFilteredProducts = async ({
  page = 1,
  lines = [],
  limit = 12,
}: {
  page: number;
  lines: string[];
  limit?: number;
}) => {
  const itemsPerPage = limit; // Usar el parámetro recibido
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  let query = supabase
    .from("products")
    .select("*, variants(*)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (lines.length > 0) {
    query = query.in("line", lines);
  }

  const { data, error, count } = await query;

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return { data, count };
};

export const getRecentProducts = async () => {
  const { data: products, error } = await supabase
    .from("products")
    .select("*, variants(*)")
    .order("created_at", { ascending: false })
    .limit(4);

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return products;
};

export const getRandomProducts = async () => {
  const { data: products, error } = await supabase
    .from("products")
    .select("*, variants(*)")
    .limit(20);

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  // Seleccionar 4 productos al azar
  const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 4);

  return randomProducts;
};

export const getProductBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("*, variants(*)")
    .eq("slug", slug)
    .single();

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
};

export const searchProducts = async (searchTerm: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("*, variants(*)")
    .ilike("name", `%${searchTerm}%`); //Buscar productos cuyo nombre contenga el término de búsqueda

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
};

/* ********************************** */
/*            ADMINISTRADOR           */
/* ********************************** */
export const createProduct = async (productInput: ProductInput) => {
  try {
    // 1. Crear el producto para obtener el ID
    const { data: product, error: productError } = await supabase
      .from("products")
      .insert({
        name: productInput.name,
        slug: productInput.slug,
        line: productInput.line,
        category: productInput.category,
        description: productInput.description,
        features: productInput.features,
        compression_level: productInput.compression_level,
        images: [],
      })
      .select()
      .single();

    if (productError) throw new Error(productError.message);

    // 2. Subir imágenes al bucket
    const folderName = product.id;
    const imagePaths = Array.isArray(productInput.image_path)
      ? productInput.image_path
      : [productInput.image_path];

    const uploadedImages = await Promise.all(
      imagePaths.map(async (image) => {
        const { data, error } = await supabase.storage
          .from("product-images")
          .upload(`${folderName}/${product.id}-${image.name}`, image);

        if (error) throw new Error(error.message);

        const publicUrlResponse = supabase.storage
          .from("product-images")
          .getPublicUrl(data.path);

        const imageUrl = publicUrlResponse.data?.publicUrl;
        if (!imageUrl)
          throw new Error("No se pudo obtener la URL pública de la imagen");

        return imageUrl;
      })
    );

    // 3. Actualizar el producto con las URLs de las imágenes
    const { error: updatedError } = await supabase
      .from("products")
      .update({
        images: uploadedImages,
      })
      .eq("id", product.id);

    if (updatedError) throw new Error(updatedError.message);

    // 4. Crear las variantes del producto
    const variants = productInput.variants.map((variant) => ({
      product_id: product.id,
      stock: variant.stock,
      price: variant.price,
      color_name: variant.color_name,
      size: variant.size,
      color: variant.color,
    }));

    const { error: variantsError } = await supabase
      .from("variants")
      .insert(variants);

    if (variantsError) throw new Error(variantsError.message);

    // 5. Retornar el producto creado
    return product;
  } catch (error) {
    console.error(error);
    throw new Error("Error inesperado. Vuelva a intentarlo.");
  }
};
