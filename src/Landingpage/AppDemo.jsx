import React from "react";
import "./AppDemo.css";

function AppDemo() {
  return (
    <div className="app-demo">
      <div className="app-screen dashboard-screen">
        <div className="app-header">
          <div className="user-welcome">
            <div className="user-avatar"></div>
            <div className="welcome-text">
              <p>Welcome!</p>
              <h3>John Doe</h3>
            </div>
          </div>
          <button className="close-btn">×</button>
        </div>

        <div className="balance-card">
          <h3>Total Balance</h3>
          <h2>₹ 4800.00</h2>
          <div className="balance-details">
            <div className="income">
              <span>Income</span>
              <p>2,500.00</p>
            </div>
            <div className="expenses">
              <span>Expenses</span>
              <p>800.00</p>
            </div>
          </div>
        </div>

        <div className="transactions-overview">
          <div className="transactions-header">
            <h3>Transactions</h3>
            <a href="#" className="view-all">
              View All
            </a>
          </div>

          <div className="transaction-list">
            <div className="transaction-item">
              <div className="transaction-icon food"></div>
              <div className="transaction-details">
                <h4>Food</h4>
                <p>Today</p>
              </div>
              <div className="transaction-amount">-₹45.00</div>
            </div>

            <div className="transaction-item">
              <div className="transaction-icon shopping"></div>
              <div className="transaction-details">
                <h4>Shopping</h4>
                <p>Today</p>
              </div>
              <div className="transaction-amount">-₹280.00</div>
            </div>

            <div className="transaction-item">
              <div className="transaction-icon entertainment"></div>
              <div className="transaction-details">
                <h4>Entertainment</h4>
                <p>Yesterday</p>
              </div>
              <div className="transaction-amount">-₹60.00</div>
            </div>

            <div className="transaction-item">
              <div className="transaction-icon travel"></div>
              <div className="transaction-details">
                <h4>Travel</h4>
                <p>Yesterday</p>
              </div>
              <div className="transaction-amount">-₹250.00</div>
            </div>
          </div>

          <div className="nav-buttons">
            <button className="nav-btn home active"></button>
            <button className="nav-btn add-new"></button>
            <button className="nav-btn settings"></button>
          </div>
        </div>
      </div>

      <div className="app-screen transactions-screen">
        <div className="screen-header">
          <div className="header-icon"></div>
          <h3>Transactions</h3>
          <button className="sort-btn"></button>
        </div>

        <div className="transactions-tabs">
          <button className="tab-btn income">Income</button>
          <button className="tab-btn expenses active">Expenses</button>
        </div>

        <div className="date-range">
          <p>01 Jan 2021 - 01 April 2021</p>
          <h2>₹3500.00</h2>
        </div>

        <div className="transactions-chart">
          {/* Chart content would go here */}
        </div>

        <div className="transaction-details-list">
          <div className="transaction-date">Sat, 20 March 2021</div>
          <div className="transaction-amount">-₹500.00</div>

          <div className="detailed-transaction">
            <div className="transaction-icon home-rent"></div>
            <div className="transaction-details">
              <h4>Home Rent</h4>
            </div>
            <div className="transaction-amount">-₹350.00</div>
          </div>

          <div className="detailed-transaction">
            <div className="transaction-icon pet-groom"></div>
            <div className="transaction-details">
              <h4>Pet Groom</h4>
            </div>
            <div className="transaction-amount">-₹50.00</div>
          </div>

          <div className="detailed-transaction">
            <div className="transaction-icon recharge"></div>
            <div className="transaction-details">
              <h4>Recharge</h4>
            </div>
            <div className="transaction-amount">-₹100.00</div>
          </div>
        </div>
      </div>

      <div className="app-screen add-expense-screen">
        <div className="screen-header">
          <h3>Add Expenses</h3>
          <button className="close-btn">₹</button>
        </div>

        <div className="amount-input">
          <span className="currency">₹</span>
          <input type="text" value="0" className="expense-amount" />
        </div>

        <div className="expense-form">
          <div className="form-field">
            <div className="field-icon category"></div>
            <input type="text" placeholder="Category" />
          </div>

          <div className="form-field">
            <div className="field-icon note"></div>
            <input type="text" placeholder="Note" />
          </div>

          <div className="form-field">
            <div className="field-icon date"></div>
            <input type="text" value="Today" />
          </div>
        </div>

        <button className="btn btn-save">SAVE</button>
      </div>
    </div>
  );
}

export default AppDemo;
