// GlobalContext.js
import React, { useContext, useState, useCallback, useEffect, useMemo } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }

    const interceptor = axios.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) config.headers.Authorization = `Bearer ${storedToken}`;
      return config;
    });

    return () => axios.interceptors.request.eject(interceptor);
  }, []);

  const getIncomes = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-incomes`);
      const data = response.data?.incomes || response.data || [];
      setIncomes(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch incomes");
      console.error("Error fetching incomes:", err);
    }
  }, []);

  const getExpenses = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-expenses`);
      const data = response.data?.expenses || response.data || [];
      setExpenses(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch expenses");
      console.error("Error fetching expenses:", err);
    }
  }, []);

  // Calculate total income
  const totalIncome = useMemo(() => {
    if (!Array.isArray(incomes) || incomes.length === 0) return 0;
    return incomes.reduce((total, income) => {
      if (!income || typeof income !== 'object') return total;
      const amount = Number(income.amount) || 0;
      return total + amount;
    }, 0);
  }, [incomes]);

  // Calculate total expenses
  const totalExpenses = useMemo(() => {
    if (!Array.isArray(expenses) || expenses.length === 0) return 0;
    return expenses.reduce((total, expense) => {
      if (!expense || typeof expense !== 'object') return total;
      const amount = Number(expense.amount) || 0;
      return total + amount;
    }, 0);
  }, [expenses]);

  // Calculate total balance
  const totalBalance = useMemo(() => {
    return totalIncome - totalExpenses;
  }, [totalIncome, totalExpenses]);

  const deleteIncome = useCallback(async (id) => {
    if (!id) {
      setError("Invalid income ID");
      return;
    }
    try {
      await axios.delete(`${BASE_URL}delete-income/${id}`);
      setIncomes((prev) => Array.isArray(prev) ? prev.filter((item) => item._id !== id) : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete income");
      console.error("Error deleting income:", err);
    }
  }, []);

  const deleteExpense = useCallback(async (id) => {
    if (!id) {
      setError("Invalid expense ID");
      return;
    }
    try {
      await axios.delete(`${BASE_URL}delete-expense/${id}`);
      setExpenses((prev) => Array.isArray(prev) ? prev.filter((item) => item._id !== id) : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete expense");
      console.error("Error deleting expense:", err);
    }
  }, []);

  const addIncome = useCallback(async (incomeData) => {
    if (!incomeData || typeof incomeData !== 'object') {
      setError("Invalid income data");
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}add-income`, incomeData);
      if (response.data) {
        setIncomes((prev) => Array.isArray(prev) ? [...prev, response.data] : [response.data]);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add income");
      console.error("Error adding income:", err);
    }
  }, []);

  const addExpense = useCallback(async (expenseData) => {
    if (!expenseData || typeof expenseData !== 'object') {
      setError("Invalid expense data");
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}add-expense`, expenseData);
      if (response.data) {
        setExpenses((prev) => Array.isArray(prev) ? [...prev, response.data] : [response.data]);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add expense");
      console.error("Error adding expense:", err);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Context value with ALL needed properties
  const contextValue = useMemo(() => ({
    // Data arrays
    incomes: Array.isArray(incomes) ? incomes : [],
    expenses: Array.isArray(expenses) ? expenses : [],
    
    // Calculated values (FIXED: Added totalBalance)
    totalIncome,
    totalExpenses,
    totalBalance, // THIS WAS MISSING!
    
    // Action functions
    getIncomes,
    getExpenses,
    addIncome,
    addExpense,
    deleteIncome,
    deleteExpense,
    
    // Utility
    clearError,
    error,
  }), [
    incomes, 
    expenses, 
    totalIncome, 
    totalExpenses,
    totalBalance, // ADDED to dependencies
    getIncomes, 
    getExpenses, 
    addIncome, 
    addExpense, 
    deleteIncome, 
    deleteExpense,
    clearError,
    error
  ]);

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
