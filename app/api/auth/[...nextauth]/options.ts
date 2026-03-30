import ApiError from "@/lib/ApiError";
import { connectDB } from "@/lib/connectDB";
import User from "@/models/User.model";
import CredentialsProvider from "next-auth/providers/credentials";

export const options = [
  CredentialsProvider({
    name: "Credentials",

    credentials: {
      identifier: {
        label: "Username or Email",
        type: "text",
        placeholder: "jsmith",
      },
      password: { label: "Password", type: "password" },
    },

    async authorize(credentials) {
      if (!credentials) {
        throw new Error("Credentials not provided");
      }

      await connectDB();

      const { identifier, password } = credentials;

      const user = await User.findOne({
        $or: [
          { email: identifier.toLowerCase() },
          { username: identifier.toLowerCase() },
          { phone: identifier },
        ],
      });

      if (!user) {
        throw new Error("User not found, create an account first");
      }

      const isPasswordCorrect = await user.comparePassword(password);

      if (!isPasswordCorrect) {
        throw new Error("The login information you entered is incorrect");
      }

      return {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
      };
    },
  }),
];
