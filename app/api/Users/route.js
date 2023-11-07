import User from "@/app/(models)/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const userData = body.formData;
    if (!userDate?.email || !userData?.password) {
      return NextResponse.json(
        { message: "Email and Password are required" },
        { status: 400 }
      );
    }

    // Check for dulicate emails
    const duplicate = await User.findOne({ email: userData.email })
      .lean()
      .exec();
    if (duplicate) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    await User.create(userData);
    return NextResponse.json(
      { message: "User created", data: userData },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error ", err }, { status: 500 });
  }
}
