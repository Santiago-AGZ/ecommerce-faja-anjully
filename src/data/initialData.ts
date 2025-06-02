export const allFajas = [
  // Fajas - Post-Quirúrgica
  {
    id: "faja-001",
    name: "Faja Alta Compresión",
    slug: "faja-alta-compresion",
    category: "Fajas",
    line: "Post-Quirúrgica",
    features: ["Alta compresión", "Cierre frontal", "Material suave"],
    description: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Ideal para postoperatorios." }],
        },
      ],
    },
    images: ["https://ui.shadcn.com/placeholder-faja.svg"],
    created_at: new Date().toISOString(),
    variants: [
      {
        id: "var-006",
        price: 110.0,
        stock: 12,
        size: "M",
        color: "#F5F5DC",
        color_name: "Beige",
      },
    ],
  },

  // Fajas - Romantic
  {
    id: "faja-002",
    name: "Faja Estilo Romantic",
    slug: "faja-estilo-romantic",
    category: "Fajas",
    line: "Romantic",
    features: ["Diseño elegante", "Tirantes ajustables", "Control de abdomen"],
    description: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Faja ideal para ocasiones especiales." },
          ],
        },
      ],
    },
    images: ["https://ui.shadcn.com/placeholder-faja.svg"],
    created_at: new Date().toISOString(),
    variants: [
      {
        id: "var-007",
        price: 135.0,
        stock: 8,
        size: "S",
        color: "#FF0000",
        color_name: "Rojo",
      },
    ],
  },

  // Fajas - Power Net
  {
    id: "faja-003",
    name: "Faja Moldeadora Power Net",
    slug: "faja-moldeadora-power-net",
    category: "Fajas",
    line: "Power Net",
    features: ["Secado rápido", "Alta elasticidad", "Moldea cintura"],
    description: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Perfecta para uso diario." }],
        },
      ],
    },
    images: ["https://ui.shadcn.com/placeholder-faja.svg"],
    created_at: new Date().toISOString(),
    variants: [
      {
        id: "var-008",
        price: 100.0,
        stock: 9,
        size: "L",
        color: "#000000",
        color_name: "Negro",
      },
    ],
  },

  // Fajas - Smart Fresh
  {
    id: "faja-004",
    name: "Faja Smart Fresh",
    slug: "faja-smart-fresh",
    category: "Fajas",
    line: "Smart Fresh",
    features: ["Material fresco", "Diseño ergonómico", "Antibacterial"],
    description: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Ideal para climas cálidos." }],
        },
      ],
    },
    images: ["https://ui.shadcn.com/placeholder-faja.svg"],
    created_at: new Date().toISOString(),
    variants: [
      {
        id: "var-009",
        price: 125.0,
        stock: 7,
        size: "M",
        color: "#FFFFFF",
        color_name: "Blanco",
      },
    ],
  },

  // Complementos
  {
    id: "comp-001",
    name: "Tabla Coxis",
    slug: "tabla-coxis",
    category: "Complementos",
    line: "Post-Quirúrgica",
    features: ["Postoperatorio", "Comodidad al sentarse", "Fácil de limpiar"],
    description: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Ideal para proteger la zona del coxis." },
          ],
        },
      ],
    },
    images: ["https://ui.shadcn.com/placeholder-complemento.svg"],
    created_at: new Date().toISOString(),
    variants: [
      {
        id: "var-010",
        price: 35.0,
        stock: 20,
        size: "Única",
        color: "#808080",
        color_name: "Gris",
      },
    ],
  },

  {
    id: "comp-002",
    name: "Tabla Lumbar",
    slug: "tabla-lumbar",
    category: "Complementos",
    line: "Post-Quirúrgica",
    features: ["Soporte lumbar", "Previene deformidades", "Material anatómico"],
    description: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Soporte para la parte baja de la espalda." },
          ],
        },
      ],
    },
    images: ["https://ui.shadcn.com/placeholder-complemento.svg"],
    created_at: new Date().toISOString(),
    variants: [
      {
        id: "var-011",
        price: 40.0,
        stock: 18,
        size: "Única",
        color: "#F5F5DC",
        color_name: "Beige",
      },
    ],
  },

  {
    id: "comp-003",
    name: "Espuma Antifibrosis",
    slug: "espuma-antifibrosis",
    category: "Complementos",
    line: "Post-Quirúrgica",
    features: ["Reduce fibrosis", "Ultrasuave", "Ideal para abdomen"],
    description: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Ayuda a evitar fibrosis postoperatoria." },
          ],
        },
      ],
    },
    images: ["https://ui.shadcn.com/placeholder-complemento.svg"],
    created_at: new Date().toISOString(),
    variants: [
      {
        id: "var-012",
        price: 30.0,
        stock: 25,
        size: "Única",
        color: "#FFC0CB",
        color_name: "Rosa",
      },
    ],
  },

  {
    id: "comp-004",
    name: "Cojín Postoperatorio",
    slug: "cojin-post",
    category: "Complementos",
    line: "Post-Quirúrgica",
    features: ["Confort", "Material ergonómico", "Diseño discreto"],
    description: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Diseñado para mayor comodidad postcirugía.",
            },
          ],
        },
      ],
    },
    images: ["https://ui.shadcn.com/placeholder-complemento.svg"],
    created_at: new Date().toISOString(),
    variants: [
      {
        id: "var-013",
        price: 60.0,
        stock: 10,
        size: "Única",
        color: "#000000",
        color_name: "Negro",
      },
    ],
  },

  {
    id: "comp-005",
    name: "Tabla Ocho",
    slug: "tabla-ocho",
    category: "Complementos",
    line: "Post-Quirúrgica",
    features: ["Soporte completo", "Diseño en 8", "Alta adaptabilidad"],
    description: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Para una presión uniforme en el abdomen." },
          ],
        },
      ],
    },
    images: ["https://ui.shadcn.com/placeholder-complemento.svg"],
    created_at: new Date().toISOString(),
    variants: [
      {
        id: "var-014",
        price: 45.0,
        stock: 14,
        size: "Única",
        color: "#F5F5DC",
        color_name: "Beige",
      },
    ],
  },

  {
    id: "comp-006",
    name: "Papel Osmótico",
    slug: "papel-osmotico",
    category: "Complementos",
    line: "Post-Quirúrgica",
    features: ["Efecto sauna", "Elimina toxinas", "Fácil de aplicar"],
    description: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Perfecto para tratamientos reductores." },
          ],
        },
      ],
    },
    images: ["https://ui.shadcn.com/placeholder-complemento.svg"],
    created_at: new Date().toISOString(),
    variants: [
      {
        id: "var-015",
        price: 20.0,
        stock: 50,
        size: "Única",
        color: "#D3D3D3",
        color_name: "Transparente",
      },
    ],
  },

  {
    id: "comp-007",
    name: "Aceite de Naranja",
    slug: "aceite-naranja",
    category: "Complementos",
    line: "Post-Quirúrgica",
    features: ["Reductor", "Anticelulitis", "Aroma agradable"],
    description: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Aceite esencial para masajes postoperatorios.",
            },
          ],
        },
      ],
    },
    images: [
      "https://media.falabella.com/falabellaCO/133012451_01/w=800,h=800,fit=pad",
    ],
    created_at: new Date().toISOString(),
    variants: [
      {
        id: "var-016",
        price: 25.0,
        stock: 40,
        size: "120ml",
        color: "#FFA500",
        color_name: "Naranja",
      },
    ],
  },
  {
    id: "comp-008",
    name: "Faja de Compresión",
    slug: "faja-compresion",
    category: "Complementos",
    line: "Post-Quirúrgica",
    features: [
      "Compresión ajustable",
      "Material transpirable",
      "Diseño anatómico",
    ],
    description: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Faja para mayor soporte postquirúrgico." },
          ],
        },
      ],
    },
    images: ["https://ui.shadcn.com/placeholder-complemento.svg"],
    created_at: new Date().toISOString(),
    variants: [
      {
        id: "var-017",
        price: 70.0,
        stock: 15,
        size: "L",
        color: "#000000",
        color_name: "Negro",
      },
    ],
  },
];

export const popupularProducts = [
  {
    id: "comp-007",
    name: "Aceite de Naranja",
    slug: "aceite-naranja",
    category: "Complementos",
    line: "Post-Quirúrgica",
    features: ["Reductor", "Anticelulitis", "Aroma agradable"],
    description: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Aceite esencial para masajes postoperatorios.",
            },
          ],
        },
      ],
    },
    images: [
      "https://media.falabella.com/falabellaCO/133012451_01/w=800,h=800,fit=pad",
    ],
    created_at: new Date().toISOString(),
    variants: [
      {
        id: "var-016",
        price: 25.0,
        stock: 40,
        size: "120ml",
        color: { name: "Naranja", hex_code: "#FFA500" },
      },
    ],
  },
  {
    id: "comp-008",
    name: "Faja de Compresión",
    slug: "faja-compresion",
    category: "Complementos",
    line: "Post-Quirúrgica",
    features: [
      "Compresión ajustable",
      "Material transpirable",
      "Diseño anatómico",
    ],
    description: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Faja para mayor soporte postquirúrgico." },
          ],
        },
      ],
    },
    images: ["https://ui.shadcn.com/placeholder-complemento.svg"],
    created_at: new Date().toISOString(),
    variants: [
      {
        id: "var-017",
        price: 70.0,
        stock: 15,
        size: "L",
        color: { name: "Negro", hex_code: "#000000" },
      },
    ],
  },
  {
    id: "comp-005",
    name: "Tabla Ocho",
    slug: "tabla-ocho",
    category: "Complementos",
    line: "Post-Quirúrgica",
    features: ["Soporte completo", "Diseño en 8", "Alta adaptabilidad"],
    description: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Para una presión uniforme en el abdomen." },
          ],
        },
      ],
    },
    images: ["https://ui.shadcn.com/placeholder-complemento.svg"],
    created_at: new Date().toISOString(),
    variants: [
      {
        id: "var-014",
        price: 45.0,
        stock: 14,
        size: "Única",
        color: { name: "Beige", hex_code: "#F5F5DC" },
      },
    ],
  },
];
