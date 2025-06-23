import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import DestinationSlider from "./DestinationSlider";
import FlightSlider from "./FlightSlider";
import ProfileSidebar from "./ProfileSidebar";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

function Header({ flights }) {
  const navigate = useNavigate();
  const [fromDestination, setFromDestination] = useState("");
  const [toDestination, setToDestination] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [profileSideBar, setProfileSidebar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginPage, setLoginPage] = useState(false);
  const [registerPage, setRegisterPage] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const filtered = flights.filter((flight) => {
      return (
        flight.from?.toLowerCase().includes(fromDestination.toLowerCase()) &&
        flight.to?.toLowerCase().includes(toDestination.toLowerCase()) &&
        flight.date?.includes(departDate)
      );
    });

    navigate("/TurBook/Results", {
      state: { filteredFlights: filtered },
    });
  };

  const handleAuthButton = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      alert("You have been logged out.");
      setFromDestination("");
      setToDestination("");
      setDepartDate("");
    } else {
      setLoginPage(true);
    }
  };

  return (
    <div>
      <div className="home-header-layout">
        <div className="home-text-layout">
          <p>GO ON THE GREATEST JOURNEY OF YOUR LIFE</p>
          <button onClick={handleAuthButton}>
            {isLoggedIn ? "Logout" : "Login/Register"}
          </button>
        </div>
        <div className="home-option-layout">
          <img
            src="../images/turbook-logo.png"
            className="turbook-logo"
            alt="logo"
          />
          <div className="home-option-layout-right">
            <button>Home</button>
            <button>About Us</button>
            <button>Contact</button>
            <button onClick={() => setProfileSidebar(true)}>Profile</button>
          </div>
        </div>
      </div>

      <div className="background-image-layout">
        <img
          src="/images/main-background.jpg"
          className="background-image"
          alt="main-background"
        />
        <h1>ONE OF THE BEST FLIGHT IN THE WORLD</h1>
        <p>FLIGHT BOOKING ONLINE</p>
        <div className="home-form-search-layout">
          <form onSubmit={handleSubmit} className="home-form-search">
            <input
              onChange={(e) => setFromDestination(e.target.value)}
              type="text"
              value={fromDestination}
              placeholder="From"
            />
            <input
              onChange={(e) => setToDestination(e.target.value)}
              type="text"
              value={toDestination}
              placeholder="To"
            />
            <input
              onChange={(e) => setDepartDate(e.target.value)}
              type="text"
              value={departDate}
              placeholder="11/12/2025"
            />
            <button>Search</button>
          </form>
        </div>
      </div>

      <div className="destination-place-card-layout">
        <p>Top Destination</p>
        <DestinationSlider />
      </div>

      {profileSideBar && (
        <ProfileSidebar setProfileSidebar={setProfileSidebar} />
      )}

      {loginPage && (
        <LoginPage
          setLoginPage={setLoginPage}
          setRegisterPage={setRegisterPage}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
      {registerPage && (
        <RegisterPage
          setRegisterPage={setRegisterPage}
          setLoginPage={setLoginPage}
        />
      )}
    </div>
  );
}

export default Header;
