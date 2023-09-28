import User from "@/database/models/user";
import { connectMongoDb } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectMongoDb();
  const allUsers = await User.find({}).exec();
  return NextResponse.json({ users: allUsers }, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json();
    await connectMongoDb();
    // const existingUser = await User.findOne({ email }).exec();
    // if (existingUser) {
    //   return NextResponse.json({ error: "User already exists" }, { status: 400 });
    // }
    const newUser = await User.create({ name, email });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}
