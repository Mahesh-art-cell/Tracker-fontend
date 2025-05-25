// GlobalContext.js
import React, { useContext, useState, useCallback, useEffect, useMemo } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Set or remove auth token in axios and localStorage
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
  };

  // On mount, load token from localStorage and set axios header
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token loaded from localStorage:", token);
    if (token) {
      setAuthToken(token);
    }

    // Request interceptor to ensure token always included
    const requestInterceptor = axios.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        config.headers.Authorization = `Bearer ${storedToken}`;
      }
      return config;
    });

    // Response interceptor to catch 401 Unauthorized
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          setAuthToken(null);
          setError("Session expired. Please login again.");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  // LOGIN FUNCTION example
  const loginUser = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${BASE_URL}login`, credentials);
      const token = response.data?.token;
      if (token) {
        setAuthToken(token);
        // Optionally fetch initial data after login
        await getIncomes();
        await getExpenses();
      } else {
        setError("Login failed: No token received");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch incomes
  const getIncomes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}get-incomes`);
      const data = response.data?.incomes || response.data || [];
      setIncomes(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch incomes");
      console.error("Error fetching incomes:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch expenses
  const getExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}get-expenses`);
      const data = response.data?.expenses || response.data || [];
      setExpenses(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch expenses");
      console.error("Error fetching expenses:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto fetch incomes & expenses if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      getIncomes();
      getExpenses();
    }
  }, [isAuthenticated, getIncomes, getExpenses]);

  // Totals
  const totalIncome = useMemo(() => {
    if (!Array.isArray(incomes) || incomes.length === 0) return 0;
    return incomes.reduce((total, income) => total + (Number(income?.amount) || 0), 0);
  }, [incomes]);

  const totalExpenses = useMemo(() => {
    if (!Array.isArray(expenses) || expenses.length === 0) return 0;
    return expenses.reduce((total, expense) => total + (Number(expense?.amount) || 0), 0);
  }, [expenses]);

  const totalBalance = useMemo(() => totalIncome - totalExpenses, [totalIncome, totalExpenses]);

  // Delete income
  const deleteIncome = useCallback(async (id) => {
    if (!id) {
      setError("Invalid income ID");
      return;
    }
    try {
      await axios.delete(`${BASE_URL}delete-income/${id}`);
      setIncomes((prev) => (Array.isArray(prev) ? prev.filter((item) => item._id !== id) : []));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete income");
      console.error("Error deleting income:", err);
    }
  }, []);

  // Delete expense
  const deleteExpense = useCallback(async (id) => {
    if (!id) {
      setError("Invalid expense ID");
      return;
    }
    try {
      await axios.delete(`${BASE_URL}delete-expense/${id}`);
      setExpenses((prev) => (Array.isArray(prev) ? prev.filter((item) => item._id !== id) : []));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete expense");
      console.error("Error deleting expense:", err);
    }
  }, []);

  // Add income
  const addIncome = useCallback(async (incomeData) => {
    if (!incomeData || typeof incomeData !== "object") {
      setError("Invalid income data");
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}add-income`, incomeData);
      if (response.data) {
        setIncomes((prev) => [...prev, response.data]);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add income");
      console.error("Error adding income:", err);
    }
  }, []);

  // Add expense
  const addExpense = useCallback(async (expenseData) => {
    if (!expenseData || typeof expenseData !== "object") {
      setError("Invalid expense data");
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}add-expense`, expenseData);
      if (response.data) {
        setExpenses((prev) => [...prev, response.data]);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add expense");
      console.error("Error adding expense:", err);
    }
  }, []);

  // Clear errors
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const logoutUser = useCallback(() => {
    setAuthToken(null);
    setIncomes([]);
    setExpenses([]);
  }, []);

  const contextValue = useMemo(() => ({
    incomes,
    expenses,
    totalIncome,
    totalExpenses,
    totalBalance,
    loading,
    error,
    isAuthenticated,

    // Actions
    loginUser,
    logoutUser,
    getIncomes,
    getExpenses,
    addIncome,
    addExpense,
    deleteIncome,
    deleteExpense,
    clearError,
    setAuthToken,
  }), [
    incomes,
    expenses,
    totalIncome,
    totalExpenses,
    totalBalance,
    loading,
    error,
    isAuthenticated,
    loginUser,
    logoutUser,
    getIncomes,
    getExpenses,
    addIncome,
    addExpense,
    deleteIncome,
    deleteExpense,
    clearError,
    setAuthToken,
  ]);

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
