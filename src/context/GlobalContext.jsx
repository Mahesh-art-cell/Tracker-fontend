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
      setIncomes(response.data?.incomes || response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch incomes");
    }
  }, []);

  const getExpenses = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-expenses`);
      setExpenses(response.data?.expenses || response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch expenses");
    }
  }, []);

  // Fix: Use useMemo to return calculated values, not functions
  const totalIncome = useMemo(() => {
    return incomes.reduce((acc, cur) => acc + Number(cur.amount || 0), 0);
  }, [incomes]);

  const totalExpenses = useMemo(() => {
    return expenses.reduce((acc, cur) => acc + Number(cur.amount || 0), 0);
  }, [expenses]);

  const deleteIncome = useCallback(async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-income/${id}`);
      setIncomes((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete income");
    }
  }, []);

  const deleteExpense = useCallback(async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-expense/${id}`);
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete expense");
    }
  }, []);

  const addIncome = useCallback(async (incomeData) => {
    try {
      const res = await axios.post(`${BASE_URL}add-income`, incomeData);
      setIncomes((prev) => [...prev, res.data]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add income");
    }
  }, []);

  const addExpense = useCallback(async (expenseData) => {
    try {
      const res = await axios.post(`${BASE_URL}add-expense`, expenseData);
      setExpenses((prev) => [...prev, res.data]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add expense");
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        incomes,
        expenses,
        getIncomes,
        getExpenses,
        deleteIncome,
        deleteExpense,
        addIncome,
        addExpense,
        totalIncome, // Now this is a number, not a function
        totalExpenses, // Now this is a number, not a function
        error,
      }}
    >
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
