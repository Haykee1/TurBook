import { useState, useEffect } from "react";
import "./ProfileSidebar.css";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import BookingHistory from "./BookingHistory";

function ProfileSidebar({ setProfileSidebar }) {
  const [loginPage, setLoginPage] = useState(false);
  const [registerPage, setRegisterPage] = useState(false);
  const [bookingHistory, setBookingHistory] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Decode JWT manually to get user info (just base64 decode)
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload);
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setProfileSidebar(false);
    window.location.reload();
  };

  return (
    <>
      <div className="sidebar-overlay"></div>
      <div
        className={`profile-sidebar ${
          setProfileSidebar ? "slide-in" : "slide-out"
        }`}
      >
        <div className="profile-sidebar-first-row">
          <p>
            <strong>Account</strong>
          </p>
          <button onClick={() => setProfileSidebar(false)}>X</button>
        </div>

        {user ? (
          <>
            <h1>Welcome, {user.username}</h1>
            <button onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <h1>Log in to manage your bookings</h1>
            <button onClick={() => setLoginPage(true)}>Log in</button>
            <div className="profile-sidebar-third-row">
              <p>Don't have an account?</p>
              <button onClick={() => setRegisterPage(true)}>
                Register here
              </button>
            </div>
          </>
        )}

        <h2>My details</h2>
        <div className="profile-sidebar-fourth-row">
          <button onClick={() => setBookingHistory(true)}>
            Booking History
          </button>
        </div>
      </div>

      {loginPage && (
        <LoginPage
          setLoginPage={setLoginPage}
          setRegisterPage={setRegisterPage}
        />
      )}
      {registerPage && (
        <RegisterPage
          setRegisterPage={setRegisterPage}
          setLoginPage={setLoginPage}
        />
      )}
      {bookingHistory && (
        <BookingHistory setBookingHistory={setBookingHistory} />
      )}
    </>
  );
}

export default ProfileSidebar;
