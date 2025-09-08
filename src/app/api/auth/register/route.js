import { connectDB } from "@/lib/database";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import User from "@/models/userModel";
import { uploadFile } from "@/lib/cloudinary";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function POST(req) {
  await connectDB();

  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role");
    // const file = formData.get("image");

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "Please fill in all required fields" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // let imageUrl = {
    //   secure_url: "profile.png",
    //   public_id: "profile.png",
    // };

    // if (file && file instanceof File) {
    //   const uploadRes = await uploadFile(file);
    //   imageUrl = {
    //     secure_url: uploadRes.secure_url,
    //     public_id: uploadRes.public_id,
    //   };
    // }

    const token = jwt.sign(
      { name, email, password: hashedPassword, role},
      SECRET_KEY,
      { expiresIn: "10m" }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
      },
    });

    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email?token=${token}`;

    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Our shop - Verify Your Email",
      html: `<p>Welcome to our shop, ${name}!</p>
             <p>Please verify your email by clicking the link below (valid for 10 minutes):</p>
             <a href="${verificationUrl}">Verify Email</a>`,
    });

    const response = NextResponse.json({
      message: "Verification email sent! Please check your inbox.",
      success: true,
    });
 

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Register error Error" },
      { status: 500 }
    );
  }
};
