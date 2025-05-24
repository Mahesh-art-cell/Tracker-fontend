// src/Landingpage/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../firebase';
import { useGlobalContext } from '../context/GlobalContext'; // ✅ Fixed path
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAuthToken } = useGlobalContext(); // ✅ get setAuthToken from context

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken(); // ✅ get Firebase Auth token
      setAuthToken(token); // ✅ set the token in Axios headers and localStorage
      navigate('/dashboard');
    } catch (err) {
      console.error("Login failed:", err);
      setError('Invalid Credentials! Try again.');
    }
  };

  const handleloginguest = async () => {
    try {
      console.log("Guest login successful!");
      window.location.href = "/dashboard";
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
      <p>Don't have an account? <a href="/signup">Sign up</a></p>
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
