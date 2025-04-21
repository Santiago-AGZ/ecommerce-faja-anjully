import { supabase } from "@/supabase/client"

export const getproducts = async () => {
    const {data: products, error} = await supabase.from("products").select("*").order('created_at', { ascending: false });
    if (error) {
        console.error("Error fetching products:", error?.message);
    }
    return { products, error };
}