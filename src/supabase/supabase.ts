export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          address_line1: string
          address_line2: string | null
          city: string
          country: string
          created_at: string
          customer_id: string | null
          id: string
          is_primary: boolean
          postal_code: string
          state: string
          updated_at: string | null
        }
        Insert: {
          address_line1: string
          address_line2?: string | null
          city: string
          country?: string
          created_at?: string
          customer_id?: string | null
          id?: string
          is_primary?: boolean
          postal_code: string
          state: string
          updated_at?: string | null
        }
        Update: {
          address_line1?: string
          address_line2?: string | null
          city?: string
          country?: string
          created_at?: string
          customer_id?: string | null
          id?: string
          is_primary?: boolean
          postal_code?: string
          state?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "addresses_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      cart_items: {
        Row: {
          added_at: string | null
          id: string
          quantity: number
          user_id: string
          variant_id: string
        }
        Insert: {
          added_at?: string | null
          id?: string
          quantity?: number
          user_id: string
          variant_id: string
        }
        Update: {
          added_at?: string | null
          id?: string
          quantity?: number
          user_id?: string
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "variants"
            referencedColumns: ["id"]
          },
        ]
      }
      colors: {
        Row: {
          hex_code: string | null
          id: string
          name: string
        }
        Insert: {
          hex_code?: string | null
          id?: string
          name: string
        }
        Update: {
          hex_code?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      compression_levels: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          level_name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          level_name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          level_name?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          phone: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string
          user_id?: string
        }
        Relationships: []
      }
      order_status: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          address_id: string
          created_at: string
          customer_id: string
          id: number
          orders_items_id: string
          status_id: string
          total_amount: number
          updated_at: string
        }
        Insert: {
          address_id: string
          created_at?: string
          customer_id: string
          id?: number
          orders_items_id: string
          status_id: string
          total_amount: number
          updated_at?: string
        }
        Update: {
          address_id?: string
          created_at?: string
          customer_id?: string
          id?: number
          orders_items_id?: string
          status_id?: string
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_orders_items_id_fkey"
            columns: ["orders_items_id"]
            isOneToOne: false
            referencedRelation: "orders_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "order_status"
            referencedColumns: ["id"]
          },
        ]
      }
      orders_items: {
        Row: {
          created_at: string
          id: string
          order_id: number
          price: number
          quantity: number
          variant_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: number
          price: number
          quantity: number
          variant_id: string
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: number
          price?: number
          quantity?: number
          variant_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          order_id: number
          provider: string
          status: string
          transaction_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          order_id: number
          provider: string
          status: string
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          order_id?: number
          provider?: string
          status?: string
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      product_lines: {
        Row: {
          active: boolean | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
        }
        Relationships: []
      }
      product_reviews: {
        Row: {
          created_at: string | null
          id: string
          product_id: string
          rating: number
          review: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id: string
          rating: number
          review?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string
          rating?: number
          review?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean | null
          brand: string
          compression_level_id: string | null
          created_at: string | null
          deleted: boolean | null
          deleted_at: string | null
          description: Json | null
          features: string[] | null
          id: string
          images: string[] | null
          is_complement: boolean | null
          is_featured: boolean | null
          line_id: string | null
          material: string | null
          meta_description: string | null
          meta_title: string | null
          name: string
          price_base: number | null
          ref_code: string | null
          slug: string
        }
        Insert: {
          active?: boolean | null
          brand: string
          compression_level_id?: string | null
          created_at?: string | null
          deleted?: boolean | null
          deleted_at?: string | null
          description?: Json | null
          features?: string[] | null
          id?: string
          images?: string[] | null
          is_complement?: boolean | null
          is_featured?: boolean | null
          line_id?: string | null
          material?: string | null
          meta_description?: string | null
          meta_title?: string | null
          name: string
          price_base?: number | null
          ref_code?: string | null
          slug: string
        }
        Update: {
          active?: boolean | null
          brand?: string
          compression_level_id?: string | null
          created_at?: string | null
          deleted?: boolean | null
          deleted_at?: string | null
          description?: Json | null
          features?: string[] | null
          id?: string
          images?: string[] | null
          is_complement?: boolean | null
          is_featured?: boolean | null
          line_id?: string | null
          material?: string | null
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          price_base?: number | null
          ref_code?: string | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_compression_level_id_fkey"
            columns: ["compression_level_id"]
            isOneToOne: false
            referencedRelation: "compression_levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_line_id_fkey"
            columns: ["line_id"]
            isOneToOne: false
            referencedRelation: "product_lines"
            referencedColumns: ["id"]
          },
        ]
      }
      promotions: {
        Row: {
          active: boolean | null
          description: string | null
          discount_type: string
          discount_value: number
          end_date: string | null
          id: string
          line_id: string | null
          name: string
          product_id: string | null
          size_id: string | null
          start_date: string
          variant_id: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          discount_type: string
          discount_value: number
          end_date?: string | null
          id?: string
          line_id?: string | null
          name: string
          product_id?: string | null
          size_id?: string | null
          start_date: string
          variant_id?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          discount_type?: string
          discount_value?: number
          end_date?: string | null
          id?: string
          line_id?: string | null
          name?: string
          product_id?: string | null
          size_id?: string | null
          start_date?: string
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "promotions_line_id_fkey"
            columns: ["line_id"]
            isOneToOne: false
            referencedRelation: "product_lines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promotions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promotions_size_id_fkey"
            columns: ["size_id"]
            isOneToOne: false
            referencedRelation: "sizes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promotions_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "variants"
            referencedColumns: ["id"]
          },
        ]
      }
      sizes: {
        Row: {
          applies_to_model: string | null
          created_at: string | null
          display_order: number | null
          hip_range: string
          id: string
          name: string
          thigh_range: string
          waist_range: string
        }
        Insert: {
          applies_to_model?: string | null
          created_at?: string | null
          display_order?: number | null
          hip_range: string
          id?: string
          name: string
          thigh_range: string
          waist_range: string
        }
        Update: {
          applies_to_model?: string | null
          created_at?: string | null
          display_order?: number | null
          hip_range?: string
          id?: string
          name?: string
          thigh_range?: string
          waist_range?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: number
          role: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          role: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          role?: string
          user_id?: string | null
        }
        Relationships: []
      }
      variant_images: {
        Row: {
          active: boolean | null
          created_at: string | null
          display_order: number | null
          id: string
          image_url: string
          variant_id: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_url: string
          variant_id: string
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_url?: string
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "variant_images_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "variants"
            referencedColumns: ["id"]
          },
        ]
      }
      variants: {
        Row: {
          color_id: string
          created_at: string | null
          id: string
          price: number
          product_id: string
          size_id: string
          stock: number
        }
        Insert: {
          color_id: string
          created_at?: string | null
          id?: string
          price: number
          product_id: string
          size_id: string
          stock?: number
        }
        Update: {
          color_id?: string
          created_at?: string | null
          id?: string
          price?: number
          product_id?: string
          size_id?: string
          stock?: number
        }
        Relationships: [
          {
            foreignKeyName: "variants_color_id_fkey"
            columns: ["color_id"]
            isOneToOne: false
            referencedRelation: "colors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "variants_size_id_fkey"
            columns: ["size_id"]
            isOneToOne: false
            referencedRelation: "sizes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      recommend_size: {
        Args: {
          waist_measurement: number
          hip_measurement: number
          thigh_measurement: number
        }
        Returns: {
          applies_to_model: string | null
          created_at: string | null
          display_order: number | null
          hip_range: string
          id: string
          name: string
          thigh_range: string
          waist_range: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
