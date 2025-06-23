import { useState, useEffect } from "react";
import axios from "axios";
import "./BookingHistory.css";

function BookingHistory({ setBookingHistory }) {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(
          "https://turbook.onrender.com/api/booking/bookingHistory",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(res.data);
      } catch (err) {
        console.error(
          "Error fetching booking:",
          err.response?.data || err.message
        );
      }
    };

    fetchBookings();
  }, []);

  const historyCompanyLogos = {
    AirAsia: "../images/air-asia-logo.png",
    Firefly: "../images/firefly-logo.png",
    MASwings: "../images/maswings-logo.png",
    Malaysia: "../images/malaysia-airlines-logo.png",
  };

  return (
    <div className="booking-background-layout">
      <div className="booking-login-layout">
        <div className="booking-header">
          <h2>Booking History</h2>
          <button
            className="close-button"
            onClick={() => setBookingHistory(false)}
          >
            ✕
          </button>
        </div>

        <div className="booking-scroll-area">
          {bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            bookings.map((flight) => (
              <div key={flight._id} className="booking-result-layout">
                <div className="booking-details-first-row">
                  <img
                    className="booking-details-logo"
                    src={historyCompanyLogos[flight.company]}
                    alt={`${flight.company} logo`}
                  />
                </div>
                <p>
                  <strong>{flight.company}</strong>
                </p>
                <p>From: {flight.from}</p>
                <p>To: {flight.to}</p>
                <div className="booking-details-fifth-row">
                  <p>Date: {flight.date}</p>
                  <p>Time: {flight.time}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingHistory;
