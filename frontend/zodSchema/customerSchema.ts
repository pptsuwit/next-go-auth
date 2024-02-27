import { z } from "zod";

export const schema = z.object({
  customerId: z.coerce.number().min(1, "Customer ID is required"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email({ message: "Invalid email address" }),
  firstName: z
    .string()
    .trim()
    .min(1, "FirstName is required")
    .regex(new RegExp("^[a-zA-Z]+$"), "Only letters a-z are allowed"),
  lastName: z
    .string()
    .trim()
    .min(1, "Lastname is required")
    .regex(new RegExp("^[a-zA-Z]+$"), "Only letters a-z are allowed"),
  address: z.string().trim().min(1, "Address is required"),
  birthdate: z.string().nullable(),
  phone: z
    .string()
    .trim()
    .min(1, "Phone is required")
    .min(9, { message: "Must be 9 to 10 digits" })
    .max(10, { message: "Must be 9 to 10 digits" })
    .regex(new RegExp(".*[0-9].*"), "Only nummber are allowed"),
});
