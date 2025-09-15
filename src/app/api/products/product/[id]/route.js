import { connectDB } from "@/lib/database";
import productModel from "@/models/productModel";
import { NextResponse } from "next/server";
 

export async function GET(req,{params}){
    await connectDB();

    try {
        const {id} = await params;
// console.log(id);
        const product = await productModel.findById(id);
        // console.log(product);
        if(!product){
            return NextResponse.json({message: "Product not found", succes: false},{status: 404})
        };
        return NextResponse.json({message:"Product found", data: product, succes: true},{status: 200})
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Internal server single server error", succes: false},{status: 500})
    }
}