import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";
import History from "../../History/History";
import { InnerLayout } from "../../styles/Layouts";
import { dollar } from "../../utils/Icons";
import Chart from "../Chart/Chart";

function Dashboard() {
  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, [getExpenses, getIncomes]);

  return (
    <DashboardStyled>
      <InnerLayout>
        <h1 className="dashboard-title">DASHBOARD</h1>

        {/* Total Income, Expense, Balance Summary (side by side) */}
        <div className="amount-summary">
          <SummaryCard
            title="Total Income"
            value={totalIncome()}
            color="#42AD00"
          />
          <SummaryCard
            title="Total Expense"
            value={totalExpenses()}
            color="#D12C2C"
          />
          <SummaryCard
            title="Total Balance"
            value={totalBalance()}
            color="#2c7ad1"
            highlight
          />
        </div>

        <div className="stats-container">
          {/* Left Section - History */}
          <div className="left-section">
            <div className="history-section">
              <h2 className="section-title">Recent History</h2>
              <History />
            </div>
          </div>

          {/* Right Section - Chart */}
          <div className="right-section">
            <div className="chart-container">
              <Chart />
            </div>
          </div>
        </div>

        {/* Min/Max Section */}
        <div className="min-max-section">
          <MinMaxCard title="Income" data={incomes} />
          <MinMaxCard title="Expense" data={expenses} />
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

// Summary Card Component
const SummaryCard = ({ title, value, color, highlight }) => (
  <div className={`summary-card ${highlight ? "highlight" : ""}`}>
    <h2>{title}</h2>
    <p className="amount" style={{ color }}>
      {dollar} {value}
    </p>
  </div>
);

// Min/Max Card Component
const MinMaxCard = ({ title, data }) => {
  const minAmount = data.length
    ? Math.min(...data.map((item) => item.amount))
    : 0;
  const maxAmount = data.length
    ? Math.max(...data.map((item) => item.amount))
    : 0;

  return (
    <div className="min-max-card">
      <h2 className="salary-title">
        <span className="min-label">Min</span>
        <span className="title-label">{title}</span>
        <span className="max-label">Max</span>
      </h2>
      <div className="salary-item">
        <p className="min-value">₹{minAmount}</p>
        <p className="max-value">₹{maxAmount}</p>
      </div>
    </div>
  );
};

const DashboardStyled = styled.div`
  background-color: rgba(252, 246, 249, 0.78);
  // min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  margin-right: 1rem;
  // background-color: red;

  .dashboard-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
    text-align: center;
    color: #2c3e50;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  .amount-summary {
    display: flex;
    justify-content: space-evenly;
    gap: 1.5rem;
    background-color: white;
    width: 100%;
    margin-bottom: 2rem;
    border-radius: 15px;
    padding: 1rem;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.05);
  }

  .summary-card {
    flex: 1;
    background: white;
    border-radius: 20px;
    padding: 1.5rem;
    text-align: center;
    min-width: 200px;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.1);
    }

    h2 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      color: rgba(34, 34, 96, 1);
    }

    .amount {
      font-size: 2.5rem;
      font-weight: 700;
    }
  }

  .stats-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 2rem;

    @media screen and (min-width: 768px) {
      flex-direction: row;
      gap: 2rem;
    }
  }

  .left-section {
    width: 100%;
    margin-bottom: 2rem;

    @media screen and (min-width: 768px) {
      width: 40%;
      margin-bottom: 0;
    }

    .history-section {
      background: white;
      border-radius: 20px;
      padding: 1.5rem;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      height: 100%;
      // margin: 1rem;
      .section-title {
        font-size: 1.5rem;
        margin-bottom: 2rem;
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .right-section {
    width: 100%;

    @media screen and (min-width: 768px) {
      width: 60%;
    }
  }

  .min-max-section {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-top: 2rem;

    @media screen and (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .min-max-card {
    margin: 4rem 1rem;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.06);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.15);
    }
  }

  .salary-title {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    gap: 1rem;
  }

  .salary-title span {
    flex: 1;
    color: red;
    text-align: center;
  }

  .min-label {
    text-align: left;
  }

  .title-label {
    font-weight: bold;
    color: #2c3e50;
  }

  .max-label {
    text-align: right;
  }

  .salary-item {
    background: white;
    border-radius: 20px;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.15);
    }

    p {
      font-weight: 600;
      font-size: 1.3rem;
      color: #2c3e50;
    }
  }
`;

export default Dashboard;
