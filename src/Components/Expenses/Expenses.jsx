// import React, { useEffect } from "react";
// import { useGlobalContext } from "../../context/GlobalContext";
// import { InnerLayout } from "../../styles/Layouts";
// import ExpenseForm from "./ExpenseForm";
// import { Trash2 } from "lucide-react";
// import styled from "styled-components";

// function Expenses() {
//   const { 
//     expenses, 
//     getExpenses, 
//     deleteExpense, 
//     totalExpenses, // This should be a value, not a function
//     loading, 
//     error, 
//     isAuthenticated,
//     guestLogin, 
//     clearError 
//   } = useGlobalContext();

//   useEffect(() => {
//     // If not authenticated, try guest login first
//     if (!isAuthenticated) {
//       console.log("Not authenticated, attempting guest login...");
//       guestLogin();
//     }
//   }, [isAuthenticated, guestLogin]);

//   useEffect(() => {
//     // Only fetch expenses if authenticated
//     if (isAuthenticated) {
//       console.log("Authenticated, fetching expenses...");
//       getExpenses();
//     }
//   }, [isAuthenticated, getExpenses]);

//   // Handle authentication error
//   const handleRetry = () => {
//     clearError();
//     if (!isAuthenticated) {
//       guestLogin();
//     } else {
//       getExpenses();
//     }
//   };

//   return (
//     <ExpensesStyled>
//       <InnerLayout>
//         <h1>Expenses</h1>
//         <TotalExpenseStyled>
//           <h2>Total Expense:</h2>
//           <span>₹{totalExpenses}</span> {/* Fixed: removed () as it's a value, not function */}
//         </TotalExpenseStyled>
//         <div className="expense-content">
//           <div className="form-container">
//             <ExpenseForm />
//           </div>
//           <div className="expenses-list">
//             {loading ? (
//               <div className="loading">
//                 <h3>Loading expense data...</h3>
//                 <p>Please wait while we fetch your data...</p>
//               </div>
//             ) : error ? (
//               <div className="error">
//                 <h3>Unable to Load Data</h3>
//                 <p>{error}</p>
//                 <button onClick={handleRetry} className="retry-btn">
//                   {!isAuthenticated ? "Try Guest Login" : "Retry"}
//                 </button>
//               </div>
//             ) : !isAuthenticated ? (
//               <div className="auth-required">
//                 <h3>Authentication Required</h3>
//                 <p>Please wait while we authenticate you...</p>
//                 <button onClick={guestLogin} className="auth-btn">
//                   Continue as Guest
//                 </button>
//               </div>
//             ) : expenses && expenses.length > 0 ? (
//               expenses.map((expense) => {
//                 const { _id, title, amount, date, category, description, type } = expense;
//                 return (
//                   <ExpenseItemStyled key={_id}>
//                     <div className="expense-content">
//                       <h5>{title}</h5>
//                       <div className="inner-content">
//                         <div className="text">
//                           <p>{category}</p>
//                           <p>{new Date(date).toLocaleDateString()}</p>
//                           <p className="expense-amount">₹{amount}</p>
//                         </div>
//                       </div>
//                     </div>

//                     <div
//                       className="delete-btn"
//                       onClick={() => deleteExpense(_id)}
//                     >
//                       <Trash2 size={16} />
//                     </div>
//                   </ExpenseItemStyled>
//                 );
//               })
//             ) : (
//               <div className="no-data">
//                 <h3>No expense data found</h3>
//                 <p>Add a new expense entry using the form on the left</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </InnerLayout>
//     </ExpensesStyled>
//   );
// }

// const ExpensesStyled = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
  
//   h1 {
//     color: var(--primary-color);
//     font-size: 2rem;
//     margin-bottom: 1rem;
//   }

//   .expense-content {
//     display: flex;
//     flex-direction: column;
//     gap: 2rem;
//     width: 100%;
//     overflow: visible;
//   }

//   .form-container {
//     width: 100%;
//     margin-bottom: 2rem;
//   }

//   .expenses-list {
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     gap: 1rem;
//     margin: 1rem 2rem;
    
//     .no-data, .loading, .error, .auth-required {
//       background: #fcf6f9;
//       border: 2px solid #ffffff;
//       box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//       border-radius: 20px;
//       padding: 2rem;
//       text-align: center;
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//       justify-content: center;
//       align-items: center;
//       min-height: 300px;
      
//       h3 {
//         font-size: 1.5rem;
//         color: var(--primary-color);
//         margin: 0;
//       }
      
//       p {
//         color: var(--primary-color);
//         opacity: 0.8;
//         margin: 0;
//       }
//     }
    
//     .error {
//       border-color: #ff5757;
//       background: #ffebee;
      
//       h3 {
//         color: #ff5757;
//       }
      
//       .retry-btn {
//         background: #ff5757;
//         color: white;
//         border: none;
//         padding: 0.8rem 1.5rem;
//         border-radius: 8px;
//         cursor: pointer;
//         font-size: 1rem;
//         margin-top: 1rem;
//         transition: all 0.3s ease;
        
//         &:hover {
//           background: #ff4444;
//           transform: translateY(-2px);
//         }
//       }
//     }
    
//     .loading {
//       border-color: #2196f3;
//       background: #e3f2fd;
      
//       h3 {
//         color: #2196f3;
//       }
//     }
    
//     .auth-required {
//       border-color: #ff9800;
//       background: #fff3e0;
      
//       h3 {
//         color: #ff9800;
//       }
      
//       .auth-btn {
//         background: #ff9800;
//         color: white;
//         border: none;
//         padding: 0.8rem 1.5rem;
//         border-radius: 8px;
//         cursor: pointer;
//         font-size: 1rem;
//         margin-top: 1rem;
//         transition: all 0.3s ease;
        
//         &:hover {
//           background: #f57c00;
//           transform: translateY(-2px);
//         }
//       }
//     }
//   }

//   @media (min-width: 992px) {
//     .expense-content {
//       flex-direction: row;
//       align-items: flex-start;
//     }

//     .form-container {
//       flex: 1;
//       margin-right: 2rem;
//       margin-bottom: 0;
//     }

//     .expenses-list {
//       flex: 1;
//     }
//   }
// `;

// const TotalExpenseStyled = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background: #fcf6f9;
//   border: 2px solid #ffffff;
//   box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//   border-radius: 20px;
//   padding: 1rem 2rem;
//   margin: 1rem 0 2rem 0;

//   h2 {
//     font-size: 1.5rem;
//     font-weight: 600;
//   }

//   span {
//     font-size: 2rem;
//     font-weight: 800;
//     color: var(--color-red, #ff5757);
//     padding-right: 1rem;
//   }
// `;

// const ExpenseItemStyled = styled.div`
//   background: #fcf6f9;
//   border: 2px solid #ffffff;
//   box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//   border-radius: 20px;
//   padding: 1rem;
//   margin-right: 3rem;
//   display: flex;
//   align-items: center;
//   gap: 1rem;
//   transition: all 0.3s ease-in-out;
//   width: 100%;

//   &:hover {
//     transform: translateY(-3px);
//   }

//   .icon-container {
//     width: 60px;
//     height: 60px;
//     border-radius: 20px;
//     background: #f5f5f5;
//     display: flex;
//     align-items: center;
//     justify-content: center;

//     .icon {
//       width: 70%;
//       height: 70%;
//       border-radius: 50%;
//     }
//   }

//   .expense-content {
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//     gap: 0.2rem;
    
//     h5 {
//       font-size: 1.3rem;
//       color: var(--primary-color, #222260);
//       padding-left: 1rem;
//     }

//     .inner-content {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;

//       .text {
//         display: flex;
//         gap: 1.5rem;
//       }

//       .expense-amount {
//         margin-top: 1rem;
//         font-size: 1.2rem;
//       }
//     }
//   }

//   .delete-btn {
//     cursor: pointer;
//     background: rgba(255, 87, 87, 0.15);
//     border-radius: 50%;
//     width: 40px;
//     height: 40px;
//     min-width: 40px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     color: #ff5757;
//     transition: all 0.3s ease-in-out;
    
//     &:hover {
//       background: rgba(255, 87, 87, 0.3);
//       transform: scale(1.1);
//     }
//   }
// `;

// export default Expenses;


import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';

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

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    getExpenses();
  }, [getExpenses]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !category || !date) {
      alert('Please fill in all required fields.');
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
    setTitle('');
    setAmount('');
    setCategory('');
    setDate('');
    setDescription('');
  };

  return (
    <div className="expenses">
      <h2>Expenses</h2>

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
        <input
          type="text"
          placeholder="Category*"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Expense'}
        </button>
      </form>

      {error && (
        <div className="error">
          <p>{error}</p>
          <button onClick={clearError}>X</button>
        </div>
      )}

      <h3>Total Expense: ${totalExpenses}</h3>

      <div className="expense-list">
        {expenses.length === 0 && <p>No expenses added yet.</p>}
        {expenses.map((expense) => (
          <div key={expense._id} className="expense-item">
            <h4>{expense.title}</h4>
            <p>Amount: ${expense.amount}</p>
            <p>Category: {expense.category}</p>
            <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
            {expense.description && <p>Note: {expense.description}</p>}
            <button onClick={() => deleteExpense(expense._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expenses;
