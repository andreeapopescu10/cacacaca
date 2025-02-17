import { useContext } from "react";
import { TransactionsContext } from "@/features/transactions/context/transactions-context-provider";
import { CategoryContext } from "@/features/categories/context/categories-context-provider";
import { BudgetingContext } from "@/features/budgeting/context/budgeting-context-provider";

export function useTransactionsContext() {
  const context = useContext(TransactionsContext);
  if (!context)
    throw new Error("You haven't wrapped the provider in the compnent");
  return context;
}

export function useCategoriesContext() {
  const context = useContext(CategoryContext);
  if (!context)
    throw new Error("You haven't wrapped the provider in the component");
  return context;
}

export function useBudgetingContext() {
  const context = useContext(BudgetingContext);
  if (!context)
    throw new Error("You haven't wrapped the provider in the component");
  return context;
}
