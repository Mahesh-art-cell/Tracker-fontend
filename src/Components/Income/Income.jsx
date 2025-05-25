import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";
import { InnerLayout } from "../../styles/Layouts";
import Form from "../Form/Form";
import IncomeItem from "../IncomeItem/IncomeItem";

function Income() {
  const { incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();

  useEffect(() => {
    getIncomes();
  }, [getIncomes]);

  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Incomes</h1>
        <h2 className="total-income">
          Total Income: <span>₹{totalIncome}</span>
        </h2>
        <div className="income-content">
          <div className="form-container">
            <Form />
          </div>
          <div className="incomes">
            {incomes.length > 0 ? (
              incomes.map((income) => (
                <IncomeItem
                  key={income._id}
                  id={income._id}
                  title={income.title}
                  description={income.description}
                  amount={income.amount}
                  date={income.date}
                  type={income.type}
                  category={income.category}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteIncome}
                />
              ))
            ) : (
              <div className="no-data">
                <h3>No income data found</h3>
                <p>Add a new income entry using the form on the left</p>
              </div>
            )}
          </div>
        </div>
      </InnerLayout>
    </IncomeStyled>
  );
}

const IncomeStyled = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  margin-right: 1rem !important;
  width: 100%;
  h1 {
    color: var(--primary-color);
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  .total-income {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem 2rem;
    margin: 1rem 0;
    font-size: 1.8rem;
    span {
      font-size: 2rem;
      font-weight: 800;
      color: var(--color-red, #ff5757);
    }
  }
  .income-content {
    display: flex;
    gap: 2rem;
    width: 100%;
    max-width: 100%;
    .form-container {
      flex: 1;
      min-width: 0;
    }
    .incomes {
      flex: 2;
      min-width: 0;
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
  }
  @media screen and (max-width: 768px) {
    .income-content {
      flex-direction: column;
