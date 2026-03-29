import { NextRequest, NextResponse } from "next/server";

type AsyncHandler = (req: NextRequest, context?: any) => Promise<Response>;

const asyncHandler = (fn: AsyncHandler) => {
  return async (req: NextRequest, context?: any) => {
    try {
      return await fn(req, context);
    } catch (error: any) {
      console.log("Error :::", error);

      return NextResponse.json(
        {
          success: false,
          message: error.message || "Something went wrong",
        },
        {
          status: error.statusCode || 500,
        },
      );
    }
  };
};

export default asyncHandler;
