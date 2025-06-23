import { useState } from "react";
import "./BookingPopup.css";

function BookingPopup({ setIsBooked, show, onClose, children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!show) return null;

  const handlePayment = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsCompleted(true);

      setTimeout(() => {
        setIsBooked(true);
        setIsCompleted(false);

        onClose();
      }, 2000);
    }, 2000);
  };

  return (
    <div className="popup-overlay">
      <div className="loading-container">
        {isLoading ? (
          <div className="spinner-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Processing payment...</p>
          </div>
        ) : isCompleted ? (
          <div className="spinner-container">
            <img
              src="../images/payment-done.jpg"
              alt="Payment Done"
              className="done-image"
            />
            <p className="spinner-text">Payment Completed</p>
          </div>
        ) : (
          <div className="booking-popup">
            <div className="booking-popup-details">
              <button onClick={onClose} className="popup-first-row">
                X
              </button>
              {children}
              <button onClick={handlePayment} className="confirm-button">
                Confirm Payment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingPopup;
