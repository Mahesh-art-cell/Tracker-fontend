// context/GlobalContext.js
import React, { useContext, useState, useCallback, useEffect } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL; // Your base API URL

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  // Set Authorization header globally
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
    setAuthToken(token);

    // Add interceptor to add token on every request
    const interceptor = axios.interceptors.request.use(
      (config) => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          config.headers.Authorization = `Bearer ${storedToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, []);

  // Fetch incomes
  const getIncomes = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-incomes`);
      setIncomes(response.data?.incomes || response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch incomes");
    }
  }, []);

  // Fetch expenses
  const getExpenses = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-expenses`);
      setExpenses(response.data?.expenses || response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch expenses");
    }
  }, []);

  // Calculate total income
  const totalIncome = useCallback(() => {
    return incomes.reduce((acc, curr) => acc + Number(curr.amount), 0);
  }, [incomes]);

  // Calculate total expenses
  const totalExpenses = useCallback(() => {
    return expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
  }, [expenses]);

  // Delete income by id
  const deleteIncome = useCallback(async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-income/${id}`);
      setIncomes((prev) => prev.filter((income) => income._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete income");
    }
  }, []);

  // Delete expense by id
  const deleteExpense = useCallback(async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-expense/${id}`);
      setExpenses((prev) => prev.filter((expense) => expense._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete expense");
    }
  }, []);

  // Add income (example)
  const addIncome = useCallback(async (incomeData) => {
    try {
      const response = await axios.post(`${BASE_URL}add-income`, incomeData);
      setIncomes((prev) => [...prev, response.data]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add income");
    }
  }, []);

  // Add expense (example)
  const addExpense = useCallback(async (expenseData) => {
    try {
      const response = await axios.post(`${BASE_URL}add-expense`, expenseData);
      setExpenses((prev) => [...prev, response.data]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add expense");
    }
  }, []);

  useEffect(() => {
    (async () => {
      setError(null);
      try {
        await Promise.all([getIncomes(), getExpenses()]);
      } catch (err) {
        setError("Failed to load initial data.");
      }
    })();
  }, [getIncomes, getExpenses]);

  return (
    <GlobalContext.Provider
      value={{
        incomes,
        expenses,
        error,
        setError,
        setAuthToken,
        getIncomes,
        getExpenses,
        deleteIncome,
        deleteExpense,
        totalIncome,
        totalExpenses,
        addIncome,
        addExpense,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  return context;
};
