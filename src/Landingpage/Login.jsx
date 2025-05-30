
// // src/pages/Login.js
// import React, { useState, useEffect } from "react";
// import { useGlobalContext } from "../context/GlobalContext";
// import { useNavigate, Link ,useLocation} from "react-router-dom";
// import "./Login.css";


// const Login = () => {
//   const { loginUser, error, clearError } = useGlobalContext();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
  
//     useEffect(()=>{
//       console.log(location)
//     },[])

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await loginUser({ email, password });
//       navigate("/dashboard");
//       setEmail("");
//       setPassword("");
//     } catch (err) {
//       Handled in context
//     }
//   };

//   useEffect(() => {
//     if (email || password) clearError();
//   }, [email, password, clearError]);

//   return (
//     <form onSubmit={handleLogin}>
//       <h2>Login</h2>
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
//       <button type="submit">Login</button>
//       <p>
//         Don't have an account? <Link to="/signup">Sign up</Link>
//       </p>
//     </form>
//   );
// };

// export default Login;


// src/pages/Login.js
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const { loginUser, error, clearError } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await loginUser({ email, password });

    if (success) {
      navigate("/dashboard");
      setEmail("");
      setPassword("");
    } else {
      alert("Invalid email or password. Please try again."); // ✅ Alert on failure
    }
  };

  useEffect(() => {
    if (email || password) clearError();
  }, [email, password, clearError]);

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
      <button type="submit">Login</button>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </form>
  );
};

export default Login;
