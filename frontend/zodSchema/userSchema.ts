import { z } from "zod";

export const schema = z
  .object({
    username: z
      .string()
      .trim()
      .min(1, "Username is required")
      .email({ message: "Invalid email address" }),
    firstName: z
      .string()
      .trim()
      .min(1, "FirstName is required")
      .regex(new RegExp(".*[A-Za-z].*"), "Only letters (a-z) are allowed"),
    lastName: z
      .string()
      .trim()
      .min(1, "Lastname is required")
      .regex(new RegExp(".*[A-Za-z].*"), "Only letters (a-z) are allowed"),
    password: z
      .string()
      .trim()
      .min(1, "Password is required")
      .trim()
      .min(6, { message: "Must be 6 or more characters long" }),
    confirmPassword: z
      .string()
      .trim()
      .min(1, "Password is required")
      .trim()
      .min(6, { message: "Must be 6 or more characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

export const schemaEdit = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Username is required")
    .email({ message: "Invalid email address" }),
  firstName: z
    .string()
    .trim()
    .min(1, "FirstName is required")
    .regex(new RegExp(".*[A-Za-z].*"), "Only letters (a-z) are allowed"),
  lastName: z
    .string()
    .trim()
    .min(1, "Lastname is required")
    .regex(new RegExp(".*[A-Za-z].*"), "Only letters (a-z) are allowed"),
  // password: z.string().nullable(),
  // confirmPassword: z.string().nullable(),
});
// .refine((data) => data.password === data.confirmPassword, {
//   path: ["confirmPassword"],
//   message: "Password don't match",
// });
