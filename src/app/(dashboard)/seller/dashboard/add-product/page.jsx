"use client";

import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { productValidationSchema } from "./../../../../zodValidation/productValidation";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddProductForm() {
  const [categories, setCategories] = useState([]);
 
  // console.log("Categories:", categories);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productValidationSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      price: "",
      discountPrice: "",
      stock: "",
      category: "",
      images: [],
      thumbnail: "",
      variants: [{ color: "", size: "", price: "", stock: "" }],
      tags: [""],
      dimensions: { length: "", width: "", height: "" },
      metaTitle: "",
      metaDescription: "",
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/products/seller/categories");
        setCategories(response.data.categories || []);
        // console.log(response);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const [imagePreviews, setImagePreviews] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const nameValue = useWatch({
    control,
    name: "name",
  });

  useEffect(() => {
    if (nameValue) {
      const generatedSlug = nameValue
        .toLowerCase()
        .trim()
        .replace(/[\s]+/g, "-")
        .replace(/[^\w-]+/g, "");
      setValue("slug", generatedSlug);
    } else {
      setValue("slug", "");
    }
  }, [nameValue, setValue]);

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  });

  // const {
  //   fields: tagFields,
  //   append: appendTag,
  //   remove: removeTag,
  // } = useFieldArray({
  //   control,
  //   name: "tags",
  // });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    try {
      setIsLoading(true);

      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (
          key !== "variants" &&
          key !== "tags" &&
          key !== "images" &&
          key !== "dimensions"
        ) {
          let value = data[key] ?? "";
          if (["price", "discountPrice", "stock"].includes(key)) {
            value = Number(value);
          }
          formData.append(key, value);
        }
      });

      data.variants?.forEach((variant, index) => {
        Object.keys(variant).forEach((field) => {
          formData.append(`variants[${index}][${field}]`, variant[field] ?? "");
        });
      });

      data.tags?.forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag ?? "");
      });

      data.images?.forEach((img, index) => {
        formData.append(`images[${index}][url]`, img.url ?? "");
        formData.append(`images[${index}][alt]`, img.alt ?? "");
      });

      if (data.thumbnail) {
        formData.append("thumbnail", data.thumbnail);
      }

      if (data.dimensions) {
        Object.keys(data.dimensions).forEach((dim) => {
          formData.append(`dimensions[${dim}]`, data.dimensions[dim] ?? "");
        });
      }

      const res = await axios.post(
        "/api/products/seller/add-product",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(res.data.message || "✅ Product added successfully!");
      reset();
      setImagePreviews([]);
      setThumbnailPreview(null);
    } catch (error) {
      console.error("Add product error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "❌ Failed to add product"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <label className="block font-medium">Product Name*</label>
          <input
            type="text"
            {...register("name", { required: "Product name required" })}
            className="w-full border p-2 rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </motion.div>

        {/* Slug */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <label className="block font-medium">Slug</label>
          <input
            type="text"
            {...register("slug")}
            className="w-full border p-2 rounded bg-gray-100"
            disabled
          />
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <label className="block font-medium">Description*</label>
          <textarea
            {...register("description", { required: "Description required" })}
            className="w-full border p-2 rounded"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </motion.div>

        {/* Price */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <label className="block font-medium">Price*</label>
          <input
            type="number"
            step="0.01"
            {...register("price")}
            className="border p-2 rounded w-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <label className="block font-medium">Discount Price</label>
          <input
            type="number"
            {...register("discountPrice", { min: 0 })}
            className="w-full border p-2 rounded"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <label className="block font-medium">Stock</label>
          <input
            type="number"
            {...register("stock", { min: 0 })}
            className="w-full border p-2 rounded"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <label className="block font-medium">Category*</label>
          <select
            {...register("category", { required: "Category required" })}
            onChange={(e) => setValue("category", e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <label className="block font-medium">Brand</label>
          <input
            type="text"
            {...register("brand")}
            className="w-full border p-2 rounded"
          />
        </motion.div>

        <div className="space-y-2">
          <h3 className="font-medium">Variants</h3>
          {variantFields.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-2 items-end"
            >
              <input
                type="text"
                placeholder="Color"
                {...register(`variants.${index}.color`)}
                className="border p-2 rounded w-1/4"
              />
              <input
                type="text"
                placeholder="Size"
                {...register(`variants.${index}.size`)}
                className="border p-2 rounded w-1/4"
              />
              <input
                type="number"
                placeholder="Price"
                {...register(`variants.${index}.price`)}
                className="border p-2 rounded w-1/4"
              />
              <input
                type="number"
                placeholder="Stock"
                {...register(`variants.${index}.stock`)}
                className="border p-2 rounded w-1/4"
              />
              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </motion.div>
          ))}
          <button
            type="button"
            onClick={() =>
              appendVariant({ color: "", size: "", price: "", stock: "" })
            }
            className="bg-green-500 text-white px-4 py-1 rounded mt-1"
          >
            Add Variant
          </button>
        </div>

        <div>
          <label className="block font-medium">Thumbnail*</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setValue("thumbnail", file);
                setThumbnailPreview(URL.createObjectURL(file));
              }
            }}
            className="border p-2 rounded"
          />
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              className="mt-2 w-32 h-32 object-cover rounded border"
            />
          )}
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Images</h3>
          {imageFields.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-2 items-center"
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const previewUrl = URL.createObjectURL(file);
                    setValue(`images.${index}.url`, file);
                    setImagePreviews((prev) => {
                      const newPreviews = [...prev];
                      newPreviews[index] = previewUrl;
                      return newPreviews;
                    });
                  }
                }}
                className="border p-2 rounded flex-1"
              />
              <input
                type="text"
                placeholder="Alt text"
                {...register(`images.${index}.alt`)}
                className="border p-2 rounded flex-1"
              />
              <button
                type="button"
                onClick={() => {
                  removeImage(index);
                  setImagePreviews((prev) =>
                    prev.filter((_, i) => i !== index)
                  );
                }}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </motion.div>
          ))}

          <div className="flex gap-2 flex-wrap mt-2">
            {imagePreviews.map(
              (preview, idx) =>
                preview && (
                  <img
                    key={idx}
                    src={preview}
                    alt={`preview-${idx}`}
                    className="w-24 h-24 object-cover rounded border"
                  />
                )
            )}
          </div>

          <button
            type="button"
            onClick={() => appendImage({ url: "", alt: "" })}
            className="bg-green-500 text-white px-4 py-1 rounded mt-1"
          >
            Add Image
          </button>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded font-medium"
        >
          {isLoading ? "Adding..." : "Add Product"}
        </motion.button>
      </form>
    </div>
  );
}
