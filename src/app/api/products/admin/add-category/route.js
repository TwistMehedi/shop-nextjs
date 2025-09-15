import { isAuthenticated } from "@/app/api/middleware/isAuthenticated";
import { connectDB } from "@/lib/database";
import Category from "@/models/categoryModel";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req) {
  await connectDB();
  try {
   
    const auth = await isAuthenticated(req, ["seller"]);
    if (auth.status !== 200) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    };

    
    const { title } = await req.json();
    if (!title || title.trim() === "") {
      return NextResponse.json(
        { message: "Category title is required", success: false },
        { status: 400 }
      );
    };

// console.log("title",title);

    const slug = slugify(title, { lower: true, strict: true });

 

    const exists = await Category.findOne({ slug });
    if (exists) {
      return NextResponse.json(
        { message: "Category already exists", success: false },
        { status: 400 }
      );
    };

 

    const createCategory = await Category.create({
      title,
      slug,
      userId: auth.userId,
    });

     return NextResponse.json(
      {
        message: "Category created successfully",
        success: true,
        category: createCategory,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Add category error:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
      },
      { status: 500 }
    );
  }
}
