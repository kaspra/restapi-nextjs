import { NextResponse } from "next/server";
import { Types } from "mongoose";

import connect from "@/lib/db";
import User from "@/lib/modals/user";
import Category from "@/lib/modals/category";
import Blog from "@/lib/modals/blog";

export const GET = async (request: Request, context: { params: any }) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const categoryId = searchParams.get("categoryId");

    const blogId = context.params.blog;

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse("Invalid User ID", { status: 400 });
    }

    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return new NextResponse("Invalid Category ID", { status: 400 });
    }

    if (!blogId || !Types.ObjectId.isValid(blogId)) {
      return new NextResponse("Invalid Blog ID", { status: 400 });
    }

    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      return new NextResponse("Category Not found", { status: 404 });
    }

    const blog = await Blog.findOne({
      _id: blogId,
      user: userId,
      category: categoryId,
    });

    if (!blog) {
      return new NextResponse("Blog Not found", { status: 404 });
    }

    return new NextResponse(
      JSON.stringify({ message: "Blog Fetched Successfully", blog: blog }),
      { status: 200 }
    );
  } catch (err: any) {
    return new NextResponse(`Error while fetching blog ${err.message}`, {
      status: 500,
    });
  }
};

export const PATCH = async (request: Request, context: { params: any }) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const blogId = context.params.blog;

    const body = await request.json();
    const { title, description } = body;

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse("Invalid User ID", { status: 400 });
    }

    if (!blogId || !Types.ObjectId.isValid(blogId)) {
      return new NextResponse("Invalid Blog ID", { status: 400 });
    }

    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const blog = await Blog.findOne({
      _id: blogId,
      user: userId,
    });

    if (!blog) {
      return new NextResponse("Blog Not found", { status: 404 });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        title,
        description,
      },
      { new: true }
    );

    return new NextResponse(
      JSON.stringify({
        message: "Blog Updated Successfully",
        UpdatedBlog: updatedBlog,
      }),
      { status: 200 }
    );
  } catch (err: any) {
    return new NextResponse(`Error while updating blog ${err.message}`, {
      status: 500,
    });
  }
};

export const DELETE = async (request: Request, context: { params: any }) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const blogId = context.params.blog;

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse("Invalid User ID", { status: 400 });
    }

    if (!blogId || !Types.ObjectId.isValid(blogId)) {
      return new NextResponse("Invalid Blog ID", { status: 400 });
    }

    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const blog = await Blog.findOne({
      _id: blogId,
      user: userId,
    });

    if (!blog) {
      return new NextResponse("Blog Not found", { status: 404 });
    }

    await Blog.findByIdAndDelete(blogId);

    return new NextResponse(
      JSON.stringify({
        message: "Blog Deleted Successfully",
      }),
      { status: 200 }
    );
  } catch (err: any) {
    return new NextResponse(`Error while Deleting blog ${err.message}`, {
      status: 500,
    });
  }
};
