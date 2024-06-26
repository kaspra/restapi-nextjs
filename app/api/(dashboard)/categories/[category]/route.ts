import { NextResponse } from "next/server";
import { Types } from "mongoose";

import connect from "@/lib/db";
import User from "@/lib/modals/user";
import Category from "@/lib/modals/category";

export const PATCH = async (request: Request, context: { params: any }) => {
  const categoryId = context.params.category;
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const body = await request.json();
    const { title } = body;

    if (!title) {
      return new NextResponse("Title was not provided", { status: 400 });
    }

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse("Invalid User ID", { status: 400 });
    }

    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return new NextResponse("Invalid Category ID", { status: 400 });
    }

    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const category = await Category.findOne({
      _id: categoryId,
      user: userId,
    });

    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { title },
      { new: true }
    );

    return new NextResponse(
      `Category Updated Successfully ${updatedCategory}`,
      { status: 200 }
    );
  } catch (err: any) {
    return new NextResponse(`Error while Updating Category ${err.message}`, {
      status: 500,
    });
  }
};

export const DELETE = async (request: Request, context: { params: any }) => {
  const categoryId = context.params.category;
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse("Invalid User ID", { status: 400 });
    }

    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return new NextResponse("Invalid Category ID", { status: 400 });
    }

    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const category = await Category.findOne({
      _id: categoryId,
      user: userId,
    });

    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    await Category.findByIdAndDelete(categoryId);

    return new NextResponse(`Category Deleted Successfully`, { status: 200 });
  } catch (err: any) {
    return new NextResponse(`Error while Deleting Category ${err.message}`, {
      status: 500,
    });
  }
};
