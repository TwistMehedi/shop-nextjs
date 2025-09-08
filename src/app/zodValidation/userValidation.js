import { z } from "zod";

export const userFormSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  role: z.enum(["user", "seller"]).optional(),
  image: z.object({
    secure_url: z.string().or(z.literal("")).optional(),
    public_id: z.string().or(z.literal("")).optional(),
  }).optional(),
});


export const loginUserData = z.object({
  email: z.string().email("Invalid email formate"),
  password: z.string().min(6, ("Password must be 6 letters"))
});