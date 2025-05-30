
import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../axios";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  // REGISTER
  const registerUser = async (userData) => {
    try {
      const res = await axiosInstance.post("/register", userData);
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      await getProfile();
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  // LOGIN
  // const loginUser = async (userData) => {
  //   try {
  //     const res = await axiosInstance.post("/login", userData);
  //     localStorage.setItem("token", res.data.token);
  //     setToken(res.data.token);
  //     await getProfile();
  //   } catch (err) {
  //     setError(err.response?.data?.message || "Login failed");
  //   }
  // };

  const loginUser = async (userData) => {
  try {
    const res = await axiosInstance.post("/login", userData);
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    await getProfile();
    return true; // ✅ Login successful
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
    return false; // ❌ Login failed
  }
};


  // GET PROFILE
  const getProfile = async () => {
    try {
      const res = await axiosInstance.get("/profile");
      setUser(res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch profile");
    }
  };

  // INCOME
  const addIncome = async (incomeData) => {
    try {
      if (!user?._id) throw new Error("User not found");
      await axiosInstance.post("/add-income", {
        ...incomeData,
        user: user._id,
      });
      getIncomes();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to add income");
    }
  };

  const getIncomes = async () => {
    try {
      const res = await axiosInstance.get("/get-incomes");
      setIncomes(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch incomes");
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(`/delete-income/${id}`);
      getIncomes();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete income");
    }
  };

  // EXPENSE
  const addExpense = async (expenseData) => {
    try {
      if (!user?._id) throw new Error("User not found");
      await axiosInstance.post("/add-expense", {
        ...expenseData,
        user: user._id,
      });
      getExpenses();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to add expense");
    }
  };

  const getExpenses = async () => {
    try {
      const res = await axiosInstance.get("/get-expenses");
      setExpenses(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch expenses");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(`/delete-expense/${id}`);
      getExpenses();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete expense");
    }
  };

  // ✅ Calculate Totals
  const totalIncome = incomes.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
  const totalExpenses = expenses.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
  const totalBalance = totalIncome - totalExpenses;
  
  // ✅ Clear Error Function
  const clearError = () => {
    setError(null);
  };

  // ✅ Auto-fetch on token load
  useEffect(() => {
    if (token) {
      getProfile();
      getIncomes();
      getExpenses();
    }
  }, [token]);

  return (
    <GlobalContext.Provider
      value={{
        user,
        token,
        incomes,
        expenses,
        error,
        registerUser,
        loginUser,
        addIncome,
        getIncomes,
        deleteIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        setError,
        clearError,
        totalIncome,
        totalExpenses,
        totalBalance, // ✅ Exposed to use in Dashboard
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
