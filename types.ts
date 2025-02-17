import { z } from "zod";
import {
  budgetSchema,
  signInSchema,
  signUpSchema,
  transactionSchema,
} from "@/lib/schemas";

export type TTransaction = z.infer<typeof transactionSchema> & {
  id: number;
  user_id: number;
  category: string;
  created_at: string;
  updated_at: string;
};

export type Budget = {
  id: number;
  user_id: number;
  category_id: number;
  category: string;
  amount: number;
  start_date: string;
  end_date: string;
};

enum CategoryType {
  expense,
  income,
}

export type TCategory = {
  id: number;
  name: string;
  type: CategoryType;
  created_at: string;
  updated_at: string;
};

export type AuthForm = {
  email: string;
  password: string;
};

export type Transaction = z.infer<typeof transactionSchema>;
export type BudgetSchema = z.infer<typeof budgetSchema>;
export type SignInForm = z.infer<typeof signInSchema>;
export type SignUpForm = z.infer<typeof signUpSchema>;
