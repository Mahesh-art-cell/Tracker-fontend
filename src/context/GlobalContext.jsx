// context/GlobalContext.js - Updated with fixes
import React, { useContext, useState, useCallback, useEffect, useMemo } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "https://expense-backend-8.onrender.com/api/v1/";

const GlobalContext = React.createContext();

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
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
      console.log("Token set successfully:", token.substring(0, 20) + "...");
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setIncomes([]);
      setExpenses([]);
      console.log("Token cleared");
    }
  }, []);

  // Load token from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Loading token from localStorage:", token.substring(0, 20) + "...");
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
          console.log("Request interceptor: Token added to request");
        } else {
          console.log("Request interceptor: No token found");
        }
        return config;
      },
      (error) => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        console.log("Response interceptor: Success", response.status);
        return response;
      },
      (error) => {
        console.error("Response interceptor error:", error.response?.status, error.response?.data);
        if (error.response?.status === 401) {
          console.log("401 error detected, clearing auth token");
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
    if (!isAuthenticated) {
      console.log("Not authenticated, skipping getIncomes");
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching incomes...");
      const res = await axios.get(`${BASE_URL}get-incomes`);
      console.log("Incomes response:", res.data);
      const data = res.data?.incomes || res.data || [];
      setIncomes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching incomes:", err);
      setError(err.response?.data?.message || "Failed to fetch incomes");
    } finally {
      setLoading(false);
    }
  };

  // Fetch expenses
  const getExpenses = useCallback(async () => {
    if (!isAuthenticated) {
      console.log("Not authenticated, skipping getExpenses");
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching expenses...");
      const res = await axios.get(`${BASE_URL}get-expenses`);
      console.log("Expenses response:", res.data);
      const data = res.data?.expenses || res.data || [];
      setExpenses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching expenses:", err);
      setError(err.response?.data?.message || "Failed to fetch expenses");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Load incomes and expenses when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      console.log("User authenticated, fetching data...");
      getIncomes();
      getExpenses();
    } else {
      console.log("User not authenticated, clearing data...");
      setIncomes([]);
      setExpenses([]);
    }
  }, [isAuthenticated, getIncomes, getExpenses]);

  // Total calculations
  const totalIncome = useMemo(() => {
    const total = incomes.reduce((sum, i) => sum + Number(i.amount || 0), 0);
    console.log("Total income calculated:", total);
    return total;
  }, [incomes]);

  const totalExpenses = useMemo(() => {
    const total = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
    console.log("Total expenses calculated:", total);
    return total;
  }, [expenses]);

  const totalBalance = useMemo(() => totalIncome - totalExpenses, [totalIncome, totalExpenses]);

  // Guest login function - ADD THIS
  const guestLogin = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Attempting guest login...");
      // For guest login, we might need to create a dummy token or call a different endpoint
      // Check if your backend has a specific guest-login endpoint
      const res = await axios.post(`${BASE_URL}guest-login`);
      console.log("Guest login response:", res.data);
      const token = res.data?.token;
      if (token) {
        setAuthToken(token);
        console.log("Guest login successful, token set");
        // Force a small delay to ensure token is set before making requests
        setTimeout(() => {
          console.log("Fetching data after guest login...");
          getIncomes();
          getExpenses();
        }, 100);
      } else {
        setError("Guest login failed: No token received");
        console.error("No token in guest login response");
      }
    } catch (err) {
      console.error("Guest login error:", err);
      // If guest login endpoint doesn't exist, create a dummy token for development
      if (err.response?.status === 404) {
        console.log("Guest login endpoint not found, using dummy token for development");
        const dummyToken = "dummy-guest-token-" + Date.now();
        setAuthToken(dummyToken);
      } else {
        setError(err.response?.data?.message || "Guest login failed");
      }
    } finally {
      setLoading(false);
    }
  }, [setAuthToken, getIncomes, getExpenses]);

  // Delete income
  const deleteIncome = useCallback(async (id) => {
    if (!id) return setError("Invalid income ID");
    try {
      console.log("Deleting income:", id);
      await axios.delete(`${BASE_URL}delete-income/${id}`);
      setIncomes((prev) => prev.filter((item) => item._id !== id));
      console.log("Income deleted successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete income");
    }
  };

  // Add income
  const addIncome = useCallback(async (incomeData) => {
    if (!incomeData || typeof incomeData !== "object") return setError("Invalid income data");
    try {
      console.log("Adding income:", incomeData);
      const res = await axios.post(`${BASE_URL}add-income`, incomeData);
      console.log("Add income response:", res.data);
      if (res.data) {
        setIncomes((prev) => [...prev, res.data]);
        console.log("Income added successfully");
      }
    } catch (err) {
      console.error("Error adding income:", err);
      setError(err.response?.data?.message || "Failed to add income");
    }
  }, []);

  // Add expense
  const addExpense = useCallback(async (expenseData) => {
    if (!expenseData || typeof expenseData !== "object") return setError("Invalid expense data");
    try {
      console.log("Adding expense:", expenseData);
      const res = await axios.post(`${BASE_URL}add-expense`, expenseData);
      console.log("Add expense response:", res.data);
      if (res.data) {
        setExpenses((prev) => [...prev, res.data]);
        console.log("Expense added successfully");
      }
    } catch (err) {
      console.error("Error adding expense:", err);
      setError(err.response?.data?.message || "Failed to add expense");
    }
  };

  // Delete expense
  const deleteExpense = useCallback(async (id) => {
    if (!id) return setError("Invalid expense ID");
    try {
      console.log("Deleting expense:", id);
      await axios.delete(`${BASE_URL}delete-expense/${id}`);
      setExpenses((prev) => prev.filter((item) => item._id !== id));
      console.log("Expense deleted successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete expense");
    }
  };

  // Login user
  const loginUser = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Attempting user login...");
      const res = await axios.post(`${BASE_URL}login`, credentials);
      console.log("Login response:", res.data);
      const token = res.data?.token;
      if (token) {
        setAuthToken(token);
        console.log("User login successful");
      } else {
        setError("Login failed: No token received");
        console.error("No token in login response");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }, [setAuthToken]);

  // Logout user
  const logoutUser = useCallback(() => {
    console.log("Logging out user...");
    setAuthToken(null);
  }, [setAuthToken]);

  // Clear error
  const clearError = () => {
    console.log("Clearing error");
    setError(null);
  };

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
        loginUser,
        guestLogin, // ADD THIS
        logoutUser,
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

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("useGlobalContext must be used within a GlobalProvider");
  return context;
};
