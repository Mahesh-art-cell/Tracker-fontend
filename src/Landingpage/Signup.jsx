

// // src/pages/Signup.js
// import React, { useState, useContext, useEffect } from "react";
// import { useGlobalContext } from "../context/GlobalContext";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const { registerUser, error, setError } = useGlobalContext();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     await registerUser({ email, password });
//     navigate("/dashboard"); // update with your protected route
//   };

//   useEffect(() => {
//     if (email || password) setError(null);
//   }, [email, password]);

//   return (
//     <form onSubmit={handleRegister}>
//       <h2>Signup</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button type="submit">Register</button>
//     </form>
//   );
// };

// export default Signup;


// src/pages/Signup.js
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";


const Signup = () => {
  const { registerUser, error, clearError } = useGlobalContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ username, email, password });
      navigate("/Login");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      // Handled in context
    }
  };

  useEffect(() => {
    if (username || email || password) clearError();
  }, [username, email, password, clearError]);

  return (
    <form onSubmit={handleRegister}>
      <h2>Signup</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

export default Signup;
