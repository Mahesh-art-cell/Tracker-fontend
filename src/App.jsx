// // App.jsx
// import React from "react";
// // import Header from './Header
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./Landingpage/Home";
// import Pricing from "./Landingpage/Pricing";
// import Feature from "./Landingpage/Feature";
// import Testimonials from "./Landingpage/Billing";
// // import ContactUs from "./Landingpage/ContactUs";
// // import Customer from "./Landingpage/Customer";
// import Signup from "./Landingpage/Signup";
// import Tracker from "./Tracker";
// // import './App.css';
// import Login from "./Landingpage/Login";
// // import { Router } from 'express';

// function App() {
//   return (
//     <div className="app">
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/Dashboard" element={<Tracker />} />
//           {/* <Route path="/features" element={<Feature/>} /> */}
//           {/* <Route path="/pricing" element={<Pricing/>} /> */}
//           {/* <Route path="/Billing" element={<Testimonials/>} /> */}
//           {/* <Route path="/Contactus" element={<ContactUs/>} /> */}
//           {/* <Route path="/Tracker" element={<Tracker/>} /> */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           {/* <Route path="/Customer" element={<Customer/>} /> */}
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tracker from "./Tracker";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import Home from "./Landingpage/Home";
import Signup from "./Landingpage/Signup";
import Login from "./Landingpage/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Tracker />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Dashboard />} />
          <Route path="incomes" element={<Income />} />
          <Route path="expenses" element={<Expenses />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

