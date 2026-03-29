import ApiError from "@/lib/ApiError";
import asyncHandler from "@/lib/asyncHandler";
import { connectDB } from "@/lib/connectDB";
import User from "@/models/User.model";
import { registerSchema } from "@/schemas/auth.schema";
import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import ApiResponse from "@/lib/ApiResponse";

export const POST = asyncHandler(async (req: Request) => {
  await connectDB();

  const body = await req.json();

  const result = registerSchema.safeParse(body);

  console.log("Result of safePrase of zod ::", result);

  if (!result.success) {
    const error = result.error.issues[0]?.message;
    throw new ApiError(400, error || "Validation Failed");
  }

  const { email, password, username } = result.data;

  const existedUserWithUsername = await User.findOne({ username });

  if (existedUserWithUsername && existedUserWithUsername.isVerified) {
    throw new ApiError(400, "User already existed with the username");
  }

  const existedUserWithEmail = await User.findOne({ email });

  if (existedUserWithEmail && existedUserWithEmail.isVerified) {
    throw new ApiError(400, "User already existed with the email");
  }

  const verifyToken = randomBytes(32).toString("hex");
  const expiry = Date.now() + 1000 * 60 * 60;

  if (existedUserWithEmail && !existedUserWithEmail.isVerified) {
    existedUserWithEmail.password = password;
    existedUserWithEmail.username = username;
    existedUserWithEmail.verifyToken = verifyToken;
    existedUserWithEmail.verifyTokenExpiry = expiry;

    await existedUserWithEmail.save();

    //Email service here //

    return NextResponse.json(
      new ApiResponse(200, "Verification email resent", {
        email: existedUserWithEmail.email,
      }),
    );
  }

  const newUser = await User.create({
    email,
    password,
    username,
    verifyToken,
    verifyTokenExpiry: expiry,
  });

  //Email service here//

  return NextResponse.json(
    new ApiResponse(201, "User created successfully", newUser),
  );
});
