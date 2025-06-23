import { useState } from "react";
import axios from "axios";

import "./LoginPage.css";
import ProfileSidebar from "./ProfileSidebar";

function LoginPage({ setLoginPage, setRegisterPage, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/api/booking/login", {
        email,
        password,
      });
      console.log(res.data.token);
      alert("User succesfully log in");
      setIsLoggedIn(true);
      localStorage.setItem("token", res.data.token);
      setLoginPage(false);
    } catch (err) {
      console.log("Login failed", err.response.data.message);
    }
  }
  return (
    <div>
      <div className="background-layout">
        <div className="login-layout">
          <form onSubmit={handleLogin} className="form-layout">
            <img src="../images/turbook-logo.png"></img>
            <h1>ACCOUNT SIGN IN</h1>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button>SUBMIT</button>
            <div className="register-layout">
              <p>Don't have an account?</p>
              <button
                onClick={() => {
                  setRegisterPage(true);
                  setLoginPage(false);
                }}
              >
                Register
              </button>
            </div>
            <button onClick={() => setLoginPage(false)}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
