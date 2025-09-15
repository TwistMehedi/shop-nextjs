import { isAuthenticated } from "@/app/api/middleware/isAuthenticated";
import { connectDB } from "@/lib/database";
import productModel from "@/models/productModel";
import { NextResponse } from "next/server";

export async function GET(req) {

  await connectDB();
  
  try {

    const auth = await isAuthenticated(req, ["seller"]);
    if (auth.status !== 200)
      return NextResponse.json(
        { message: auth.message, success: false },
        { status: auth.status }
      );

    const products = await productModel.find().sort({ createdAt: -1 });
    if (!products)
      return NextResponse.json(
        { message: "No products found", success: false },
        { status: 404 }
      );

    return NextResponse.json(
      { message: "Products fetched successfully", success: true, products },
      { status: 200 }
    );

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server prpoducts founded error", success: false },
      { status: 500 }
    );
  }
};
