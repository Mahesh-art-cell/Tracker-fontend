import React from "react";
import "./Banner.css";
import AppDemo from "./AppDemo";

function Banner() {
  return (
    <section className="banner">
      <div className="container banner-container">
        <div className="banner-content">
          <h1>Track Expenses Smarter, Not Harder</h1>
          <p>
            Simplify your financial life with our intuitive expense tracking
            app. Stay on top of your spending and reach your financial goals
            faster.
          </p>
        </div>
        <div className="banner-image">
          <AppDemo />
        </div>
      </div>
    </section>
  );
}

export default Banner;
