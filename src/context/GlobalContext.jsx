// context/GlobalContext.js
import React, { useContext, useState, useCallback, useEffect, useMemo } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "https://expense-backend-8.onrender.com/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Set or remove auth token in axios and localStorage
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

  // Load token from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
  }, [setAuthToken]);

  // Axios interceptors for handling 401 and token setting
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          config.headers.Authorization = `Bearer ${storedToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

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
  }, [setAuthToken]);

  // Fetch incomes
  const getIncomes = useCallback(async () => {
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
  }, []);

  // Fetch expenses
  const getExpenses = useCallback(async () => {
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
  }, []);

  // Load incomes and expenses when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      getIncomes();
      getExpenses();
    } else {
      setIncomes([]);
      setExpenses([]);
    }
  }, [isAuthenticated, getIncomes, getExpenses]);

  // Total calculations
  const totalIncome = useMemo(() => {
    return incomes.reduce((sum, i) => sum + Number(i.amount || 0), 0);
  }, [incomes]);

  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  }, [expenses]);

  const totalBalance = useMemo(() => totalIncome - totalExpenses, [totalIncome, totalExpenses]);

  // Delete income
  const deleteIncome = useCallback(async (id) => {
    if (!id) return setError("Invalid income ID");
    try {
      await axios.delete(`${BASE_URL}delete-income/${id}`);
      setIncomes((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete income");
    }
  }, []);

  // Add income
  const addIncome = useCallback(async (incomeData) => {
    if (!incomeData || typeof incomeData !== "object") return setError("Invalid income data");
    try {
      const res = await axios.post(`${BASE_URL}add-income`, incomeData);
      if (res.data) setIncomes((prev) => [...prev, res.data]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add income");
    }
  }, []);

  // Add expense
  const addExpense = useCallback(async (expenseData) => {
    if (!expenseData || typeof expenseData !== "object") return setError("Invalid expense data");
    try {
      const res = await axios.post(`${BASE_URL}add-expense`, expenseData);
      if (res.data) setExpenses((prev) => [...prev, res.data]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add expense");
    }
  }, []);

  // Delete expense
  const deleteExpense = useCallback(async (id) => {
    if (!id) return setError("Invalid expense ID");
    try {
      await axios.delete(`${BASE_URL}delete-expense/${id}`);
      setExpenses((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete expense");
    }
  }, []);

  // Login user (assumes you have an API route /login returning token)
  const loginUser = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${BASE_URL}login`, credentials);
      const token = res.data?.token;
      if (token) {
        setAuthToken(token);
      } else {
        setError("Login failed: No token received");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }, [setAuthToken]);

  // Logout user
  const logoutUser = useCallback(() => {
    setAuthToken(null);
  }, [setAuthToken]);

  // Clear error
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
        logoutUser,
        clearError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("useGlobalContext must be used within a GlobalProvider");
  return context;
};
