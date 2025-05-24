import React from "react";
import Header from "./Header";
import "./Billing.css";

function Billing() {
  return (
    <div className="billing-container">
      {/* <Header /> */}
      <footer className="footer">
        <div className="footer-columns">
          <div className="footer-column">
            <h3>Partner Program</h3>
            <ul>
              <li>Benefits</li>
              <li>Requirements</li>
              <li>Success Stories</li>
              <li>Resources</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Support</h3>
            <ul>
              <li>Partner Portal</li>
              <li>Documentation</li>
              <li>Contact Us</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Legal</h3>
            <ul>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Partner Agreement</li>
              <li>GDPR Compliance</li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>© 2025 Expense Management Solution. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Billing;
