import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(20),

  email: z.string().email("Invalid email"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  identifier: z.string(),
  password: z.string().min(6, "Password must contain 6 charcters"),
});

export const checkUsernameSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(20),
});
