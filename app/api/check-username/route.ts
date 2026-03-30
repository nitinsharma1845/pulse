import ApiError from "@/lib/ApiError";
import ApiResponse from "@/lib/ApiResponse";
import asyncHandler from "@/lib/asyncHandler";
import { connectDB } from "@/lib/connectDB";
import User from "@/models/User.model";
import { checkUsernameSchema } from "@/schemas/auth.schema";
import { NextResponse } from "next/server";

export const POST = asyncHandler(async (req: Request) => {
  await connectDB();

  const body = await req.json();

  const result = checkUsernameSchema.safeParse(body);

  if (!result.success) {
    const error = result.error.issues[0]?.message;
    throw new ApiError(400, error || "Validation Failed");
  }

  const { username } = result.data;

  const normalizedUsername = username.trim().toLowerCase();

  const isUsernameExist = await User.findOne({
    username: normalizedUsername,
    isVerified: true,
  }).select("_id");

  if (isUsernameExist) {
    return NextResponse.json(
      new ApiResponse(409, { isAvailable: false }, "Username already exists"),
      { status: 409 },
    );
  }

  return NextResponse.json(
    new ApiResponse(200, { isAvailable: true }, "Username available"),
    {
      status: 200,
    },
  );
});
