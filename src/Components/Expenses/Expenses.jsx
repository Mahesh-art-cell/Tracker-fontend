import React, { useEffect } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { InnerLayout } from "../../styles/Layouts";
import ExpenseForm from "./ExpenseForm";
import { Trash2 } from "lucide-react";
import styled from "styled-components";

function Expenses() {
  const { expenses, getExpenses, deleteExpense, totalExpenses } =
    useGlobalContext();

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <ExpensesStyled>
      <InnerLayout>
        <h1>Expenses</h1>
        <TotalExpenseStyled>
          <h2>Total Expense:</h2>
          <span>₹{totalExpenses()}</span>
        </TotalExpenseStyled>
        <div className="expense-content">
          <div className="form-container">
            <ExpenseForm />
          </div>
          <div className="expenses-list">
            {expenses.map((expense) => {
              const { _id, title, amount, date, category, description, type } =
                expense;
              return (
                <ExpenseItemStyled key={_id}>
                  <div className="expense-content">
                    <h5>{title}</h5>
                    <div className="inner-content">
                      <div className="text">
                        <p>{category}</p>
                        <p>{new Date(date).toLocaleDateString()}</p>
                        <p className="expense-amount">₹{amount}</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="delete-btn"
                    onClick={() => deleteExpense(_id)}
                  >
                    <Trash2 size={16} />
                  </div>
                </ExpenseItemStyled>
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </ExpensesStyled>
  );
}

const ExpensesStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  h1 {
    color: var(--primary-color);
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .expense-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    overflow: visible;
  }

  .form-container {
    width: 100%;
    margin-bottom: 2rem;
  }

  .expenses-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem 2rem;
    
    .no-data {
      background: #fcf6f9;
      border: 2px solid #ffffff;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      border-radius: 20px;
      padding: 2rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      justify-content: center;
      align-items: center;
      height: 300px;
      
      h3 {
        font-size: 1.5rem;
        color: var(--primary-color);
      }
      
      p {
        color: var(--primary-color);
        opacity: 0.8;
      }
    }
  }

  @media (min-width: 992px) {
    .expense-content {
      flex-direction: row;
      align-items: flex-start;
    }

    .form-container {
      flex: 1;
      margin-right: 2rem;
      margin-bottom: 0;
    }

    .expenses-list {
      flex: 1;
    }
  }
`;

const TotalExpenseStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem 2rem;
  margin: 1rem 0 2rem 0;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  span {
    font-size: 2rem;
    font-weight: 800;
    color: var(--color-red, #ff5757);
    padding-right: 1rem;
  }
`;

const ExpenseItemStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  margin-right: 3rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease-in-out;
  width: 100%;

  &:hover {
    transform: translateY(-3px);
  }

  .icon-container {
    width: 60px;
    height: 60px;
    border-radius: 20px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      width: 70%;
      height: 70%;
      border-radius: 50%;
    }
  }

  .expense-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    
    h5 {
      font-size: 1.3rem;
      color: var(--primary-color, #222260);
      padding-left: 1rem;
    }

    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .text {
        display: flex;
        gap: 1.5rem;
      }

      .expense-amount {
        margin-top: 1rem;
        font-size: 1.2rem;
      }
    }
  }

  .delete-btn {
    cursor: pointer;
    background: rgba(255, 87, 87, 0.15);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    min-width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ff5757;
    transition: all 0.3s ease-in-out;
    
    &:hover {
      background: rgba(255, 87, 87, 0.3);
      transform: scale(1.1);
    }
  }
`;

export default Expenses;
