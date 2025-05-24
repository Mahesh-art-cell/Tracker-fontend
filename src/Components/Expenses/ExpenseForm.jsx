import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";
import Button from "../Button/Button";
import { plus } from "../../utils/Icons";

function ExpenseForm() {
  const { addExpense, error, setError } = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: null,
    category: "",
    description: "",
  });
  const [formComplete, setFormComplete] = useState(false);

  const { title, amount, date, category, description } = inputState;

  useEffect(() => {

    if (title && amount && date && category) {
      setFormComplete(true);
    } else {
      setFormComplete(false);
    }
  }, [title, amount, date, category]);

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount || !date || !category) {
      setError("Please fill all required fields");
      return;
    }

    addExpense(inputState);
    setInputState({
      title: "",
      amount: "",
      date: null,
      category: "",
      description: "",
    });
  };

  return (
    <ExpenseFormStyled onSubmit={handleSubmit}>
      {error && (
        <div className="error-container">
          <p className="error">{error}</p>
        </div>
      )}

      <div className="input-control">
        <label htmlFor="title">Title*</label>
        <input
          type="text"
          id="title"
          value={title}
          name="title"
          placeholder="Expense Title"
          onChange={handleInput("title")}
          required
        />
      </div>

      <div className="input-control">
        <label htmlFor="amount">Amount*</label>
        <input
          type="number"
          id="amount"
          value={amount}
          name="amount"
          placeholder="Expense Amount"
          onChange={handleInput("amount")}
          required
          min="0"
          step="0.01"
        />
      </div>

      <div className="input-control">
        <label htmlFor="date">Date*</label>
        <DatePicker
          id="date"
          placeholderText="Select a date"
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => {
            setInputState({ ...inputState, date: date });
          }}
          required
          className="date-picker"
          maxDate={new Date()}
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={10}
        />
      </div>

      <div className="input-control">
        <label htmlFor="category">Category*</label>
        <select
          required
          value={category}
          name="category"
          id="category"
          onChange={handleInput("category")}
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="education">Education</option>
          <option value="groceries">Groceries</option>
          <option value="health">Health</option>
          <option value="subscriptions">Subscriptions</option>
          <option value="takeaways">Takeaways</option>
          <option value="clothing">Clothing</option>
          <option value="travelling">Travelling</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="input-control">
        <label htmlFor="description">Description*</label>
        <textarea
          required
          name="description"
          id="description"
          value={description}
          placeholder="Add a reference or note"
          cols="30"
          rows="4"
          onChange={handleInput("description")}
        ></textarea>
      </div>

      <div className="submit-btn">
        <Button
          name="Add Expense"
          icon={plus}
          bPad=".8rem 1.6rem"
          bRad="30px"
          // bg={formComplete ? "var(--color-accent)" : "#555"}
          color="#fff"
          type="submit"

        />
      </div>
    </ExpenseFormStyled>
  );
}

const ExpenseFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  padding: 2rem;
  background: #fcf6f9;
  border-radius: 20px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease-in-out;
  overflow: visible;
  z-index: 1;
  margin-bottom: 2rem;
  // background-color: red;

  .form-title {
    text-align: center;
    margin-bottom: 0.5rem;

    h3 {
      font-size: 1.5rem;
      color: var(--primary-color);
      font-weight: 600;
    }
  }

  .error-container {
    background-color: rgba(255, 0, 0, 0.1);
    border-radius: 10px;
    padding: 0.6rem 1rem;

    .error {
      color: red;
      font-size: 0.9rem;
      font-weight: 500;
      text-align: center;
    }
  }

  .input-control {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 95%;
    position: relative; /* Add position relative */

    label {
      font-size: 0.9rem;
      color: var(--primary-color);
      font-weight: 500;
    }

    input,
    textarea,
    select {
      width: 100%;
      font-family: inherit;
      font-size: 1rem;
      padding: 0.8rem 1rem;
      border-radius: 10px;
      border: 2px solid #ffffff;
      background: transparent;
      resize: none;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.03);
      color: rgba(34, 34, 96, 0.9);
      transition: all 0.3s ease-in-out;

      &::placeholder {
        color: rgba(34, 34, 96, 0.4);
      }

      &:focus {
        outline: none;
        border: 2px solid var(--primary-color);
      }
    }

    textarea {
      min-height: 100px;
    }
  }

  .submit-btn {
    display: flex;
    justify-content: center;
    margin-top: 1rem;

    button {
      width: auto;
      min-width: 160px;
      transition: all 0.3s ease;

      &:hover:not(:disabled) {
        transform: translateY(-2px);
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.7;
      }
    }
  }

  @media screen and (max-width: 768px) {
    padding: 1.5rem;
    gap: 1.2rem;

    .input-control {
      input,
      textarea,
      select,
      .date-picker {
        padding: 0.7rem 0.9rem;
        font-size: 0.95rem;
      }

      textarea {
        min-height: 80px;
      }
    }
  }

  @media screen and (max-width: 480px) {
    padding: 1.2rem;
    gap: 1rem;

    .form-title h3 {
      font-size: 1.3rem;
    }

    .input-control {
      label {
        font-size: 0.85rem;
      }

      input,
      textarea,
      select,
      .date-picker {
        padding: 0.6rem 0.8rem;
        font-size: 0.9rem;
      }
    }

    .submit-btn button {
      width: 100%;
    }
  }
`;

export default ExpenseForm;
