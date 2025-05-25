import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/GlobalContext";

function History() {
  // FIXED: Safe destructuring with fallbacks
  const { incomes = [], expenses = [] } = useGlobalContext();
  
  // FIXED: Created local function instead of calling non-existent transactionHistory()
  const getTransactionHistory = () => {
    const history = [
      // Add incomes with type
      ...incomes.map(income => ({
        ...income,
        type: 'income'
      })),
      // Add expenses with type
      ...expenses.map(expense => ({
        ...expense,
        type: 'expense'
      }))
    ];
    
    // Sort by date (most recent first)
    return history.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  // FIXED: Call the local function instead of destructuring non-existent function
  const history = getTransactionHistory();

  return (
    <HistoryStyled>
      {history.length === 0 ? (
        <div className="no-history">No transactions yet</div>
      ) : (
        history.slice(0, 10).map((item) => { // Show only last 10 transactions
          const { _id, title, amount, type } = item;
          return (
            <div key={_id} className="history-item">
              <p
                style={{
                  color: type === "expense" ? "red" : "var(--color-green)",
                }}
              >
                {title}
              </p>
              <p
                style={{
                  color: type === "expense" ? "red" : "var(--color-green)",
                }}
              >
                {type === "expense"
                  ? `-${amount <= 0 ? 0 : amount}`
                  : `+${amount <= 0 ? 0 : amount}`}
              </p>
            </div>
          );
        })
      )}
    </HistoryStyled>
  );
}

const HistoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  .no-history {
    text-align: center;
    color: #666;
    font-style: italic;
    padding: 2rem;
  }
  
  .history-item {
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default History;
