import { JSONContent } from "@tiptap/react";

import { z } from "zod";

export const userRegisterSchema = z.object({
  email: z.string().email("El correo electrónico no es válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  fullName: z.string().min(1, "El nombre completo es requerido"),
  phone: z.string().optional(),
});

const isContentEmpty = (value: JSONContent): boolean => {
  if (!value || !Array.isArray(value.content) || value.content.length == 0) {
    return true;
  }

  return !value.content.some(
    (node) =>
      node.type === "paragraph" &&
      node.content &&
      Array.isArray(node.content) &&
      node.content.some(
        (textNode) =>
          textNode.type === "text" &&
          textNode.text &&
          textNode.text.trim() !== ""
      )
  );
};

export const addressSchema = z.object({
  addressLine1: z
    .string()
    .min(1, "La dirección es requerida")
    .max(100, "La dirección no debe exceder los 100 carácteres"),
  addressLine2: z
    .string()
    .max(100, "La dirección no debe exceder los 100 carácteres")
    .optional(),
  city: z
    .string()
    .min(1, "La ciudad es requerida")
    .max(50, "La ciudad no debe exceder los 50 carácteres"),
  state: z
    .string()
    .min(1, "El estado es requerido")
    .max(50, "El estado no debe exceder los 50 carácteres"),
  postalCode: z
    .string()
    .max(10, "El código postal no debe exceder los 10 carácteres")
    .optional(),
  country: z.string().min(1, "El país es requerido"),
});

export type UserRegisterFormValues = z.infer<typeof userRegisterSchema>;
export type AddressFormValues = z.infer<typeof addressSchema>;

// Esquema para validar los datos del producto
export const productSchema = z.object({
  name: z.string().min(1, "El nombre del producto es requerido"),
  slug: z
    .string()
    .min(1, "El slug del producto es requerido")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido"),
  line: z.string().min(1, "La línea del producto es requerida"),
  description: z.custom<JSONContent>((value) => !isContentEmpty(value), {
    message: "La descripción no puede estar vacía",
  }),
  features: z
    .array(
      z.object({
        value: z.string().min(1, "La característica no puede estar vacía"),
      })
    )
    .min(1, "Debe tener al menos una característica"),
  compression_level: z.string().min(1, "El nivel de compresión es requerido"),
  image_path: z
    .array(
      z
        .string()
        .regex(
          /^products\/[a-z0-9-]+\/[a-z0-9-]+\/[a-z0-9-]+\/[a-z0-9-]+\/[a-z0-9-]+\.(png|jpg|jpeg|webp|gif)$/,
          "La ruta de la imagen debe tener el formato 'products/categoria/producto/variacion/color/archivo.(png|jpg|jpeg|webp|gif)'"
        )
    )
    .min(1, "Debes subir al menos una imagen"),
      images: z.array(z.instanceof(File)).optional(), // 👈 Aquí está la solución


  category: z.string().min(1, "La categoría es requerida"),
  variants: z
    .array(
      z.object({
        id: z.string().uuid().optional(),
        product_id: z.string().uuid().optional(),
        price: z.number().min(1, "El precio debe ser mayor a 0"),
        stock: z.number().min(0, "El stock debe ser igual o mayor a 0"),
        size: z.string().min(1, "La talla es obligatoria"),
        color: z
          .string()
          .regex(
            /^(#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})|(rgb|hsl)a?\(\s*([0-9]{1,3}\s*,\s*){2}[0-9]{1,3}\s*(,\s*(0|1|0?\.\d+))?\s*\))$/,
            "El color debe ser un valor válido en formato hexadecimal, RGB o HSL"
          ),
        color_name: z.string().min(1, "El nombre del color es obligatorio"),
      })
    )
    .min(1, "Debe incluir al menos una variante"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
