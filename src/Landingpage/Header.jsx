
import React from "react";
import Logo from "./Logo";
import "./Header.css";
import { Navigate } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="container header-container">
        <Logo />
        <div className="auth-buttons">
          <a href="/login" className="btn">
            Login
          </a>

          <a href="/signup" className="btn">
            Signup
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
