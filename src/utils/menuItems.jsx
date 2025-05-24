import { expenses, transactions, trend } from "./Icons";

export const menuItems = [
  {
    id: 1,
    title: "View Transactions",
    icon: transactions,
    link: "/dashboard/transactions",
  },
  {
    id: 2,
    title: "Incomes",
    icon: trend,
    link: "/dashboard/incomes",
  },
  {
    id: 3,
    title: "Expenses",
    icon: expenses,
    link: "/dashboard/expenses",
  },
];

