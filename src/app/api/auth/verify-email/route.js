import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import { connectDB } from "@/lib/database";

export async function POST(req) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Token is required" },
        { status: 400 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { name, email, password, role } = decoded;

    let user = await User.findOne({ email });

    if (user) {
      if (user.isVerified) {
        return NextResponse.json(
          { message: "Email already verified", success: true, user },
          { status: 200 }
        );
      } else {
        user.isVerified = true;
        await user.save();

        return NextResponse.json(
          { message: "Email verified successfully!", success: true, user },
          { status: 200 }
        );
      }
    }

    // user না থাকলে নতুন create করো
    const newUser = await User.create({
      name,
      email,
      password,
      role,
      isVerified: true,
    });

    const verifyToken = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json(
      {
        message: "Email verified and user created successfully!",
        success: true,
        user: newUser,
      },
      { status: 201 }
    );

    response.cookies.set("token", verifyToken, {
      httpOnly: true,
      maxAge: 86400,
      path: "/",
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Invalid or expired token", success: false },
      { status: 401 }
    );
  }
}
