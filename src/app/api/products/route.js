import { connectDB } from "@/lib/database";
import productModel from "@/models/productModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");
    const search = searchParams.get("name");

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 10; // per page

    const filter = {};

    if (category && category !== "all") {
      filter.category = category;
    }

    if (priceMin || priceMax) {
      filter.price = {};
      if (priceMin) filter.price.$gte = Number(priceMin);
      if (priceMax) filter.price.$lte = Number(priceMax);
    }

    if (search && search.trim() !== "") {
      filter.$or = [
        { name: { $regex: search.trim(), $options: "i" } },
        { descrption: { $regex: search.trim(), $options: "i" } },
      ];
    }

    const totalProducts = await productModel.countDocuments(filter);

    const products = await productModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({
      success: true,
      data: {
        products,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server product get error",
        success: false,
      },
      { status: 500 }
    );
  }
}
