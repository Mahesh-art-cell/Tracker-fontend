import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../firebase';
import { useGlobalContext } from '../context/GlobalContext'; // Make sure this exists and works!
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // get setAuthToken function from your global context
  const { setAuthToken } = useGlobalContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();  // get Firebase auth token
      
      setAuthToken(token);  // save token globally (e.g., for API auth)
      navigate('/dashboard');  // redirect after login

    } catch (err) {
      console.error("Login failed:", err);
      setError('Invalid Credentials! Try again.');
    }
  };

  const handleLoginGuest = () => {
    console.log("Guest login successful!");
    navigate('/dashboard');
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Email"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-label="Password"
        />

        <button type="submit" className="login-btn">Login</button>
      </form>

      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>

      <button
        onClick={handleLoginGuest}
        style={{
          color: "blue",
          display: "block",
          margin: "20px auto",
          padding: "10px 20px",
          fontSize: "16px",
          textAlign: "center",
          cursor: "pointer",
          background: "none",
          border: "none"
        }}
      >
        Login Guest
      </button>
    </div>
  );
};

export default Login;
