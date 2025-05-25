import React, { useContext, useState, useCallback, useEffect } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

    const interceptor = axios.interceptors.request.use(
      (config) => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          config.headers.Authorization = `Bearer ${storedToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.request.eject(interceptor);
  }, []);

  const getIncomes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${BASE_URL}get-incomes`);
      const incomeData = response.data?.incomes || response.data || [];
      setIncomes(Array.isArray(incomeData) ? incomeData : []);
    } catch (err) {
      console.error("Error fetching incomes:", err);
      setError(err.response?.data?.message || "Failed to fetch incomes");
      setIncomes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getExpenses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${BASE_URL}get-expenses`);
      const expenseData = response.data?.expenses || response.data || [];
      setExpenses(Array.isArray(expenseData) ? expenseData : []);
    } catch (err) {
      console.error("Error fetching expenses:", err);
      setError(err.response?.data?.message || "Failed to fetch expenses");
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const totalIncome = useCallback(() => {
    if (!Array.isArray(incomes)) return 0;
    return incomes.reduce((acc, cur) => {
      const amount = Number(cur?.amount) || 0;
      return acc + amount;
    }, 0);
  }, [incomes]);

  const totalExpenses = useCallback(() => {
    if (!Array.isArray(expenses)) return 0;
    return expenses.reduce((acc, cur) => {
      const amount = Number(cur?.amount) || 0;
      return acc + amount;
    }, 0);
  }, [expenses]);

  const deleteIncome = useCallback(async (id) => {
    if (!id) return;
    try {
      setError(null);
      await axios.delete(`${BASE_URL}delete-income/${id}`);
      setIncomes((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      console.error("Error deleting income:", err);
      setError(err.response?.data?.message || "Failed to delete income");
    }
  }, []);

  const deleteExpense = useCallback(async (id) => {
    if (!id) return;
    try {
      setError(null);
      await axios.delete(`${BASE_URL}delete-expense/${id}`);
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Error deleting expense:", err);
      setError(err.response?.data?.message || "Failed to delete expense");
    }
  }, []);

  const addIncome = useCallback(async (incomeData) => {
    if (!incomeData) return;
    try {
      setError(null);
      const res = await axios.post(`${BASE_URL}add-income`, incomeData);
      if (res.data) {
        setIncomes((prev) => [...prev, res.data]);
      }
    } catch (err) {
      console.error("Error adding income:", err);
      setError(err.response?.data?.message || "Failed to add income");
    }
  }, []);

  const addExpense = useCallback(async (expenseData) => {
    if (!expenseData) return;
    try {
      setError(null);
      const res = await axios.post(`${BASE_URL}add-expense`, expenseData);
      if (res.data) {
        setExpenses((prev) => [...prev, res.data]);
      }
    } catch (err) {
      console.error("Error adding expense:", err);
      setError(err.response?.data?.message || "Failed to add expense");
    }
  }, []);

  // Initialize data on mount
  useEffect(() => {
    const initializeData = async () => {
      try {
        await Promise.allSettled([getIncomes(), getExpenses()]);
      } catch (error) {
        console.error("Error initializing data:", error);
        setError("Failed to load initial data.");
      }
    };

    initializeData();
  }, [getIncomes, getExpenses]);

  const contextValue = {
    incomes,
    expenses,
    getIncomes,
    getExpenses,
    deleteIncome,
    deleteExpense,
    addIncome,
    addExpense,
    totalIncome,
    totalExpenses,
    error,
    loading,
    setError,
  };

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
