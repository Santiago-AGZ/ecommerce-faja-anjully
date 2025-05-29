// interfaces.ts
export interface Color {
  name: string;
  hex_code: string;
}

export interface Variant {
  id: string;
  stock: number;
  price: number;
  color: Color;
  size: string;
}

export interface ProductCategory {
  id: string;
  name: string;
}

export interface ProductLine {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  line: string;
  features: string[];
  description: any;
  images: string[];
  created_at: string;
  variants: Variant[];
}

export interface PreparedProduct {
  id: string;
  name: string;
  slug: string;
  features: string[];
  description: any;
  images: string[];
  created_at: string;
  price: number;
  colors: {
    name: string;
    color: string;
  }[];
  variants: Variant[];
  category?: string;
  line?: string;
}
