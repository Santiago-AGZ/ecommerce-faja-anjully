import { useState, useEffect } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ProductFormValues } from "../../../lib/validators";

interface ImagePreview {
  file?: File;
  previewUrl: string;
}

interface Props {
  setValue: UseFormSetValue<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
}

export const UploaderImages = ({ setValue, watch, errors }: Props) => {
  const [images, setImages] = useState<ImagePreview[]>([]);

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  const cleanFileName = (name: string) =>
    name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9.-]/g, "");

  const generateImagePath = (fileName: string) => {
    const line = slugify(watch("line") || "");
    const name = slugify(watch("name") || "");
    const color = slugify(watch("variants")?.[0]?.color_name || "");

    if (!line || !name || !color) {
      alert(
        "Por favor completa el nombre, línea y color antes de subir imágenes"
      );
      return;
    }

    return `products/${line}/${name}/${color}/${cleanFileName(fileName)}`;
  };

  const syncFormImages = (updatedImages: ImagePreview[]) => {
    const imagePaths = updatedImages
      .filter((img) => !!img.file)
      .map((img) => generateImagePath(img.file!.name))
      .filter((path): path is string => !!path);

    const fileArray = updatedImages.map((img) => img.file!).filter(Boolean);
    console.log("🖼️ Paths generados:", imagePaths);
    setValue("image_path", imagePaths);
    setValue("images" as any, fileArray, { shouldValidate: false });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const line = watch("line");
      const name = watch("name");
      const color = watch("variants")?.[0]?.color_name;

      if (!line || !name || !color) {
        alert(
          "Por favor completa el nombre, línea y color antes de subir imágenes"
        );
        return;
      }

      const newImages = Array.from(e.target.files).map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));

      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      syncFormImages(updatedImages);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    syncFormImages(updatedImages);
  };

  useEffect(() => {
    const existingFiles = watch("images");
    if (existingFiles && existingFiles.length > 0 && images.length === 0) {
      const previews = existingFiles.map((file: File) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      setImages(previews);
    }
  }, [watch, images.length]);

  return (
    <>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
      />

      <div className="grid grid-cols-4 lg:grid-cols-2 gap-4 mt-4">
        {images.map((image, index) => (
          <div key={index}>
            <div className="border border-gray-200 w-full h-20 rounded-md p-1 relative lg:h-28">
              <img
                src={image.previewUrl}
                alt={`Preview ${index}`}
                className="rounded-md w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="flex justify-end absolute -top-3 -right-4 hover:scale-110 transition-all z-10"
              >
                <IoIosCloseCircleOutline size={22} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {errors.image_path && (
        <p className="text-red-500 text-xs mt-2">{errors.image_path.message}</p>
      )}
    </>
  );
};
