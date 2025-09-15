import { connectDB } from "@/lib/database";
import Category from "@/models/categoryModel";
import { NextResponse } from "next/server";

export async function GET(req) {
    await connectDB();

    try {
        const categories = await Category.distinct("title");

        return NextResponse.json({ categories }, { status: 200 });

    } catch (error) {
        console.log("Get category error", error);
        return NextResponse.json({message:"Internal server get category error", error}, {status: 500});
    };
};