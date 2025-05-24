// src/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword } from '../firebase';
import './Signup.css'
const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      if (!isValidPassword(password)) {
        setError('Password must be at least 8 characters, include uppercase, lowercase, number, and special character.');
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
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


  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
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

      <button className="signup-btn" onClick={handleSignup}>
        Sign Up
      </button>

      <p>Already have an account? <a href="/login">Login</a></p>
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

export default Signup;
