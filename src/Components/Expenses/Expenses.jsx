
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import "./Expenses.css"; // Import the CSS file
import { InnerLayout } from "../../styles/Layouts";


const Expenses = () => {
  const {
    expenses,
    getExpenses,
    addExpense,
    deleteExpense,
    totalExpenses,
    loading,
    error,
    clearError,
  } = useGlobalContext();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getExpenses();
  }, [getExpenses]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !category || !date) {
      alert("Please fill in all required fields.");
      return;
    }

    const newExpense = {
      title,
      amount: parseFloat(amount),
      category,
      date,
      description,
    };

    addExpense(newExpense);
    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
    setDescription("");
  };

  return (
    <div className="expenses-container">
      <InnerLayout>

      <div className="form-section">
        <h2>Add Expense</h2>
        <form onSubmit={handleSubmit} className="expense-form">
          <input
            type="text"
            placeholder="Title*"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Amount*"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category*</option>
            <option value="education">Education</option>
            <option value="groceries">Groceries</option>
            <option value="health">Health</option>
            <option value="subscriptions">Subscriptions</option>
            <option value="takeaways">Takeaways</option>
            <option value="clothing">Clothing</option>
            <option value="travelling">Travelling</option>
            <option value="other">Other</option>
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Expense"}
          </button>
        </form>
      </div>

      {/* Expenses List Section */}
      <div className="list-section">
        <h3>Total Expense: ${totalExpenses}</h3>

        {error && (
          <div className="error">
            <p>{error}</p>
            <button onClick={clearError}>X</button>
          </div>
        )}

        <div className="expense-list">
          {Array.isArray(expenses) && expenses.length === 0 && (
            <p>No expenses added yet.</p>
          )}

          {Array.isArray(expenses) &&
            expenses.map((expense) => (
              <div key={expense._id} className="expense-item">
                <h4>{expense.title}</h4>
                <p>Amount: ${expense.amount}</p>
                <p>Category: {expense.category}</p>
                <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
                {expense.description && <p>Note: {expense.description}</p>}
                <button onClick={() => deleteExpense(expense._id)}>
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>

      </InnerLayout>
      {/* Form Section */}

    </div>
  );
};

export default Expenses;