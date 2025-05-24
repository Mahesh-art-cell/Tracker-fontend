
// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../firebase';
import './Login.css'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/Dashboard'); // Redirect to home page on successful login
    } catch (err) {
      setError('Invalid Credentials! Try again.',err);
    }
  };
  const handleloginguest = async () => {
    try {
        // Simulating a guest login process (You can add authentication logic if needed)
        console.log("Guest login successful!");

        // Redirect to the dashboard
        window.location.href = "/dashboard"; // Change the URL based on your routing
    } catch (error) {
        console.error("Guest login failed:", error);
    }
};

  return (
    <div className="login-form">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button className="login-btn" onClick={handleLogin}>
        Login
      </button>
      {/* <button onClick={handleloginguest}>login guest</button> */}

      <p>Don't have an account? <a href="/signup">Sign up</a></p>
      {/* <button onClick={handleloginguest} style={{color:"blue",alignContent:"center"}}>login guest</button> */}
      <button 
  onClick={handleloginguest} 
  style={{
    color: "blue", 
    display: "block", 
    margin: "20px auto", 
    padding: "10px 20px",
    fontSize: "16px",
    textAlign: "center"
  }}
>
  Login Guest
</button>

    </div>
  );
};

export default Login;
