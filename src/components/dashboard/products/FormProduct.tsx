import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProductFormValues, productSchema } from "../../../lib/validators";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { generateSlug } from "../../../helpers";
import { SectionFormProduct } from "./SectionFormProduct";
import { InputForm } from "./InputForm";
import { UploaderImages } from "./UploaderImages";
import { Editor } from "./Editor";
import { FeaturesInput } from "./FeaturesInput";
import { VariantsInput } from "./VariantsInput";
import { SelectInput } from "./SelectInput";

// Opciones para los selects
const categories = [
  { value: "Fajas", label: "Fajas" },
  { value: "Complementos", label: "Complementos" },
];

const productLines = [
  { value: "Romantic", label: "Romantic" },
  { value: "Power-Net", label: "Power Net" },
  { value: "Smart-Fresh", label: "Smart Fresh" },
  { value: "Post-Quirurgica", label: "Post Quirúrgica" },
];

const compressionLevels = [
  { value: "low", label: "Baja" },
  { value: "medium", label: "Media" },
  { value: "high", label: "Alta" },
];

interface Props {
  titleForm: string;
  initialValues?: Partial<ProductFormValues>;
}

export const FormProduct = ({ titleForm, initialValues }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialValues,
  });

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    console.log("Product data:", data);
    // Aquí iría la lógica para enviar los datos al servidor
  });

  const watchName = watch("name");

  // Generar slug automáticamente cuando cambia el nombre
  useEffect(() => {
    if (!watchName) return;

    const generatedSlug = generateSlug(watchName);
    setValue("slug", generatedSlug, { shouldValidate: true });
  }, [watchName, setValue]);

  return (
    <div className="flex flex-col gap-6 relative">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            className="bg-white p-1.5 rounded-md shadow-sm border border-slate-200 transition-all group hover:scale-105"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowBack
              size={18}
              className="transition-all group-hover:scale-125"
            />
          </button>
          <h2 className="font-bold tracking-tight text-2xl capitalize">
            {titleForm}
          </h2>
        </div>
      </div>

      <form
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 auto-rows-max flex-1"
        onSubmit={onSubmit}
      >
        {/* Sección 1: Detalles del Producto */}
        <SectionFormProduct
          titleSection="Detalles del Producto"
          className="lg:col-span-2 lg:row-span-2"
        >
          <InputForm
            type="text"
            placeholder="Faja Reductora Cintura Alta"
            label="Nombre"
            name="name"
            register={register}
            errors={errors}
            required
          />

          <InputForm
            type="text"
            label="Slug"
            name="slug"
            placeholder="faja-reductora-cintura-alta"
            register={register}
            errors={errors}
          />

          <SelectInput
            label="Categoría"
            name="category"
            options={categories}
            register={register}
            errors={errors}
            required
          />

          <SelectInput
            label="Línea del producto"
            name="line"
            options={productLines}
            register={register}
            errors={errors}
            required
          />

          <SelectInput
            label="Nivel de compresión"
            name="compression_level"
            options={compressionLevels}
            register={register}
            errors={errors}
            required
          />
        </SectionFormProduct>

        {/* Sección 2: Características */}
        <SectionFormProduct titleSection="Características">
          <FeaturesInput
            control={control}
            register={register}
            errors={errors}
          />
        </SectionFormProduct>

        {/* Sección 3: Imágenes */}
        <SectionFormProduct titleSection="Imágenes del producto">
          <UploaderImages errors={errors} setValue={setValue} watch={watch} />
        </SectionFormProduct>

        {/* Sección 4: Variantes */}
        <SectionFormProduct
          titleSection="Variantes del producto"
          className="lg:col-span-3"
        >
          <VariantsInput
            control={control}
            register={register}
            errors={errors}
          />
        </SectionFormProduct>

        {/* Sección 5: Descripción */}
        <SectionFormProduct
          titleSection="Descripción del producto"
          className="col-span-full"
        >
          <Editor setValue={setValue} errors={errors} />
        </SectionFormProduct>

        {/* Botones de acción */}
        <div className="flex gap-3 col-span-full justify-end">
          <button
            className="btn-secondary-outline cursor-pointer"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
          <button className="btn-primary cursor-pointer" type="submit">
            Guardar Producto
          </button>
        </div>
      </form>
    </div>
  );
};
