import { z } from "zod";
import { Frequency, Status } from "@/lib/enums";

export const transactionSchema = z.object({
  categoryId: z.coerce.number(),
  name: z.string().min(1).max(50),
  amount: z.coerce.number().positive().nonnegative(),
  description: z.string().min(1).max(500),
  transactionDate: z.coerce.date(),
  frequency: z.nativeEnum(Frequency).optional(),
  status: z.nativeEnum(Status).optional(),
  nextTransactionDate: z.coerce.date().optional(),
});

export const budgetSchema = z.object({
  categoryId: z.coerce.number(),
  amount: z.coerce.number().positive().nonnegative(),
  startDate: z.coerce.date(),
  endDate: z.coerce
    .date()
    .min(new Date(new Date().getFullYear(), new Date().getMonth(), 1), {
      message: "Invalid Date",
    }),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signUpSchema = z
  .object({
    name: z.string().min(2).max(25),
    email: z.string().email(),
    password: z.string().min(8).max(60),
    confirm: z.string().min(8).max(60),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  });
