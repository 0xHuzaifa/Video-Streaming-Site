import z from "zod";

export const SignupSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    fullName: z.string().min(5, "Full Name must be at least 5 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupSchemaType = z.infer<typeof SignupSchema>;
