import { NextResponse } from "next/server";
import { Types } from "mongoose";

import connect from "@/lib/db";
import User from "@/lib/modals/user";
import Category from "@/lib/modals/category";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(`UserId Invalid or missing`, {
        status: 400,
      });
    }

    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse(`User not found`, { status: 400 });
    }

    const category = await Category.find({
      user: new Types.ObjectId(userId),
    });

    return new NextResponse(JSON.stringify(category), { status: 200 });
  } catch (err: any) {
    return new NextResponse(`Error While Fetching Category ${err.message}`, {
      status: 500,
    });
  }
};

export const POST = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const { title } = await request.json();

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse("UserId is invalid", { status: 400 });
    }

    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const newCategory = new Category({
      title,
      user: new Types.ObjectId(userId),
    });

    await newCategory.save();

    return new NextResponse(`Category created successfully ${newCategory}`, {
      status: 200,
    });
  } catch (err: any) {
    return new NextResponse("Error while creating category", { status: 500 });
  }
};
