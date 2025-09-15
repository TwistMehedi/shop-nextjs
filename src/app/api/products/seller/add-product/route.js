import { connectDB } from "@/lib/database";
import { NextResponse } from "next/server";
import Product from "@/models/productModel";
import cloudinary from "@/lib/cloudinary";
import { isAuthenticated } from "@/app/api/middleware/isAuthenticated";

export async function POST(req) {
  await connectDB();

  try {
    
    const auth = await isAuthenticated(req, ["seller", "admin"]);
    if (auth.status !== 200) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    const formData = await req.formData();

    // 🔹 Thumbnail upload
    const thumbnailFile = formData.get("thumbnail");
    let thumbnailUrl = "";
    if (thumbnailFile) {
      const buffer = Buffer.from(await thumbnailFile.arrayBuffer());
      const uploaded = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "products/thumbnails" }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          })
          .end(buffer);
      });
      thumbnailUrl = {
        secure_url: uploaded.secure_url,
        public_id: uploaded.public_id,
      };
    }

    // 🔹 Images upload (multiple)
    const images = [];
    for (let i = 0; i < 3; i++) {
      const file = formData.get(`images[${i}][url]`);
      const alt = formData.get(`images[${i}][alt]`);
      if (file && typeof file !== "string") {
        const buffer = Buffer.from(await file.arrayBuffer());
        const uploaded = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "products/images" }, (err, result) => {
              if (err) reject(err);
              else resolve(result);
            })
            .end(buffer);
        });
        images.push({
          secure_url: uploaded.secure_url,
          public_id: uploaded.public_id,
          alt,
        });
      }
    }

    const productData = {
      name: formData.get("name"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      discountPrice: Number(formData.get("discountPrice")),
      stock: Number(formData.get("stock")),
      category: formData.get("category"),
      brand: formData.get("brand"),
      thumbnail: thumbnailUrl,
      images,

      variants: [
        {
          color: formData.get("variants[0][color]"),
          size: formData.get("variants[0][size]"),
          price: Number(formData.get("variants[0][price]")),
          stock: Number(formData.get("variants[0][stock]")),
        },
      ],
      dimensions: {
        length: Number(formData.get("dimensions[length]")),
        width: Number(formData.get("dimensions[width]")),
        height: Number(formData.get("dimensions[height]")),
      },
      tags: [formData.get("tags[0]")],
      metaTitle: formData.get("metaTitle"),
      metaDescription: formData.get("metaDescription"),
      weight: Number(formData.get("weight")),
      averageRating: 0,
      totalReviews: 0,
      sold: 0,
      views: 0,
      trending: formData.get("trending") === "true",
      featured: formData.get("featured") === "true",
      shippingInfo: formData.get("shippingInfo"),
      userId: auth.userId,
      isActive: true,
    };

    console.log("✅ Final Parsed Product Data:", productData);

    const newProduct = await Product.create(productData);

    return NextResponse.json(
      { message: "Product created successfully", product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Product Create Error:", error);
    return NextResponse.json(
      { message: "Internal Server Product Create Error", error },
      { status: 500 }
    );
  }
}
