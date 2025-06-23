import { useState } from "react";
import axios from "axios";
import "./RegisterPage.css";
import ProfileSidebar from "./ProfileSidebar";

function RegisterPage({ setLoginPage, setRegisterPage }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://turbook.onrender.com//api/booking/register",
        {
          username,
          email,
          password,
        }
      );

      alert("Register successful");
    } catch (err) {
      console.log("register error", err.response?.data?.message || err.message);
    }
  }

  return (
    <div>
      <div className="register-background-layout">
        <div className="login-register-layout">
          <form onSubmit={handleRegister} className="register-form-layout">
            <img src="../images/turbook-logo.png" alt="TurBook Logo" />
            <h1>REGISTER NEW ACCOUNT</h1>
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">SUBMIT</button>
            <div className="register-login-layout">
              <p>Already have an account?</p>
              <button
                type="button"
                onClick={() => {
                  setLoginPage(true);
                  setRegisterPage(false);
                }}
              >
                Sign in
              </button>
            </div>
            <button type="button" onClick={() => setRegisterPage(false)}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
