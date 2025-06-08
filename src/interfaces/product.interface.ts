import { Json } from "../supabase/supabase";
import { JSONContent } from "@tiptap/react";
export interface Color {
  name: string;
  color: string;
  price: number;
}

export interface VariantProduct {
  id: string;
  stock: number;
  price: number;
  color: string;
  color_name: string;
  size: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  line: string;
  features: string[];
  description: Json;
  compression_level: string;
  images: string[];
  created_at: string;
  variants: VariantProduct[];
}

export interface PreparedProducts {
  id: string;
  name: string;
  slug: string;
  features: string[];
  description: Json;
  images: string[];
  created_at: string;
  price: number;
  colors: {
    name: string;
    color: string;
  }[];
  variants: VariantProduct[];
  category?: string;
  line?: string;
}

export interface ProductInput {
	name: string;
	line: string;
	slug: string;
  category: string;
	features: string[];
	description: JSONContent;
  compression_level: string;
	images: File[];
	variants: VariantInput[];
}

export interface VariantInput {
	id?: string;
	stock: number;
	price: number;
	color: string;
	size: string;
	colorName: string;
}
