// context/GlobalContext.js

import React, { useContext, useState, useCallback, useEffect, useMemo } from "react";
import axios from "axios";

// Base URL setup
const BASE_URL = import.meta.env.VITE_API_URL || "https://expense-backend-8.onrender.com/api/v1/";

// Create Context
const GlobalContext = React.createContext();

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Set token
  const setAuthToken = useCallback((token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setIncomes([]);
      setExpenses([]);
    }
  }, []);

  // Load token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
  }, [setAuthToken]);

  // Axios interceptors
  useEffect(() => {
    const reqInterceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const resInterceptor = axios.interceptors.response.use(
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
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  }, [setAuthToken]);

  // Fetch incomes
  const getIncomes = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BASE_URL}get-incomes`);
      const data = res.data?.incomes || res.data || [];
      setIncomes(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch incomes");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Fetch expenses
  const getExpenses = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BASE_URL}get-expenses`);
      const data = res.data?.expenses || res.data || [];
      setExpenses(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch expenses");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Load data on login
  useEffect(() => {
    if (isAuthenticated) {
      getIncomes();
      getExpenses();
    } else {
      setIncomes([]);
      setExpenses([]);
    }
  }, [isAuthenticated, getIncomes, getExpenses]);

  // Totals
  const totalIncome = useMemo(() => incomes.reduce((acc, item) => acc + Number(item.amount || 0), 0), [incomes]);
  const totalExpenses = useMemo(() => expenses.reduce((acc, item) => acc + Number(item.amount || 0), 0), [expenses]);
  const totalBalance = useMemo(() => totalIncome - totalExpenses, [totalIncome, totalExpenses]);

  // Add Income
  const addIncome = useCallback(async (incomeData) => {
    try {
      const res = await axios.post(`${BASE_URL}add-income`, incomeData);
      if (res.data) setIncomes((prev) => [...prev, res.data]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add income");
    }
  }, []);

  // Delete Income
  const deleteIncome = useCallback(async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-income/${id}`);
      setIncomes((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete income");
    }
  }, []);

  // Add Expense
  const addExpense = useCallback(async (expenseData) => {
    try {
      const res = await axios.post(`${BASE_URL}add-expense`, expenseData);
      if (res.data) setExpenses((prev) => [...prev, res.data]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add expense");
    }
  }, []);

  // Delete Expense
  const deleteExpense = useCallback(async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-expense/${id}`);
      setExpenses((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete expense");
    }
  }, []);

  // Login User
  const loginUser = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${BASE_URL}login`, credentials);
      const token = res.data?.token;
      if (token) setAuthToken(token);
      else setError("Login failed: No token received");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }, [setAuthToken]);

  // Guest Login
  const guestLogin = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${BASE_URL}guest-login`);
      const token = res.data?.token;
      if (token) setAuthToken(token);
      else setError("Guest login failed: No token received");
    } catch (err) {
      if (err.response?.status === 404) {
        const dummyToken = "dummy-guest-token-" + Date.now();
        setAuthToken(dummyToken);
      } else {
        setError(err.response?.data?.message || "Guest login failed");
      }
    } finally {
      setLoading(false);
    }
  }, [setAuthToken]);

  // Logout
  const logoutUser = useCallback(() => {
    setAuthToken(null);
  }, [setAuthToken]);

  // Clear Error
  const clearError = () => setError(null);

  return (
    <GlobalContext.Provider
      value={{
        incomes,
        expenses,
        totalIncome,
        totalExpenses,
        totalBalance,
        loading,
        error,
        isAuthenticated,
        setAuthToken,
        getIncomes,
        getExpenses,
        addIncome,
        deleteIncome,
        addExpense,
        deleteExpense,
        loginUser,
        guestLogin,
        logoutUser,
        clearError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
