// context/GlobalContext.js
import React, { useContext, useState, useCallback, useEffect } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL; // this should be https://expense-backend-1-ygpv.onrender.com/api/v1/

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

  // Add, delete, totals etc (same as before)...

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
        // other methods ...
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
