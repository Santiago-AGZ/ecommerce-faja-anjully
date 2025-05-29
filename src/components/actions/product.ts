import { supabase } from "@/supabase/client";

export const getproducts = async (page: number = 1) => {
  const { data: products, error } = await supabase
    .from("products")
    .select("*,variants (*)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error.message);
  }

  return { products, error };
};

export const getFillteredProducts = async ({
  page = 1,
  categories = [],
}: {
  page: number;
  categories: string[];
}) => {
  const itemsPerPage = 10;
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  let query = supabase
    .from("products")
    .select("*,variants (*)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  // 🟡 Si hay nombres de categorías, convertirlos a UUIDs
  if (categories.length > 0) {
    const { data: categoriesData, error: catError } = await supabase
      .from("product_categories")
      .select("id")
      .in("name", categories);

    if (catError) {
      console.error("Error fetching category IDs:", catError.message);
      return { data: [], count: 0 }; // <-- corta aquí si falla
    }

    const categoryIds = categoriesData?.map((cat) => cat.id) || [];

    if (categoryIds.length > 0) {
      query = query.in("category_id", categoryIds);
    } else {
      // No hay categorías válidas, retorna vacío
      return { data: [], count: 0 };
    }
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching filtered products:", error.message);
  }

  return { data, count };
};
