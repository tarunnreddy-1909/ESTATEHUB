import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn({ onSignIn }) {
  // useState: form values and messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // onSubmit: send email and password to the Express backend
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (email.trim() === "" || password.trim() === "") {
      setError("Please enter email and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        onSignIn(data.user);   // tell the parent (App) who signed in
        navigate("/");         // go to Home page
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Could not reach the server. Is the backend running?");
    }
  }

  return (
    <div className="container section">
      <div className="signin-box">
        <h1 className="page-title">Sign In</h1>
        <p className="page-subtitle">Welcome back to EstateHub.</p>

        <form className="form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          {error && <span className="error">{error}</span>}

          <button type="submit" className="btn btn-green">
            Sign In
          </button>
        </form>

        <p className="demo-hint">
          Demo login: <strong>tarun@gmail.com</strong> / <strong>123456</strong>
        </p>
      </div>
    </div>
  );
}

export default SignIn;