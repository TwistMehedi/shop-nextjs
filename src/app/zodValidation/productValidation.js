import { z } from "zod";

export const productValidationSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),

  // string → number auto convert
  price: z.coerce.number().min(1, "Price is required"),
  discountPrice: z.coerce.number().optional(),
  stock: z.coerce.number().min(0).optional(),

  category: z.string().min(1, "Category is required"),
  brand: z.string().optional(),

  // 👇 image URL বা File দুইটাই allow
  images: z
    .array(
      z.object({
        url: z.union([z.string(), z.instanceof(File)]).optional(),
        alt: z.string().optional(),
      })
    )
    .optional(),

  // 👇 thumbnail ও string বা File দুইটাই allow
  thumbnail: z.union([z.string().url("Invalid thumbnail URL"), z.instanceof(File)]).optional(),

  variants: z
    .array(
      z.object({
        color: z.string().optional(),
        size: z.union([z.coerce.number(), z.string()]).optional(),
        price: z.union([z.coerce.number(), z.string()]).optional(),
        stock: z.union([z.coerce.number(), z.string()]).optional(),
      })
    )
    .optional(),

  averageRating: z.number().default(0).optional(),
  totalReviews: z.number().default(0).optional(),

  tags: z.array(z.string()).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),

  sold: z.number().default(0).optional(),
  views: z.number().default(0).optional(),
  trending: z.boolean().default(false).optional(),
  featured: z.boolean().default(false).optional(),

  weight: z.coerce.number().optional(),

  // 👇 dimensions → string/number দুইটাই allow
  dimensions: z
    .object({
      length: z.union([z.coerce.number(), z.string()]).optional(),
      width: z.union([z.coerce.number(), z.string()]).optional(),
      height: z.union([z.coerce.number(), z.string()]).optional(),
    })
    .optional(),

  shippingInfo: z.string().optional(),
  returnPolicy: z.string().optional(),

  isActive: z.boolean().default(true).optional(),
});
