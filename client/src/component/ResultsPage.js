import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./ResultsPage.css";
import BookingPopup from "./BookingPopup";
import ProfileSidebar from "./ProfileSidebar";

function ResultsPage({ flights }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [fromDestination, setFromDestination] = useState("");
  const [toDestination, setToDestination] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [resultFlights, setResultFlights] = useState([]);
  const [popup, setPopup] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [resultFound, setResultFound] = useState(0);
  const [priceSorted, setPriceSorted] = useState(false);
  const [departureSorted, setDepartureSorted] = useState(false);
  const [profileSideBar, setProfileSidebar] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [animationFadeIn, setAnimationFadeIn] = useState("");
  const [appearingCard, setAppearingCard] = useState([]);
  const cardRefs = useRef([]);
  const filteredFlights = location.state?.filteredFlights || [];

  const companyLogos = {
    AirAsia: "../images/air-asia-logo.png",
    Firefly: "../images/firefly-logo.png",
    MASwings: "../images/maswings-logo.png",
    Malaysia: "../images/malaysia-airlines-logo.png",
  };

  const companyPlane = {
    AirAsia: "../images/air-asia-plane.jpg",
    Firefly: "../images/firefly-plane.jpg",
    MASwings: "../images/maswings-plane.jpg",
    Malaysia: "../images/malaysia-airline-plane.jpg",
  };

  const handleHome = (e) => {
    e.preventDefault();

    navigate("/TurBook");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setAnimationFadeIn("");

    const filteredFlights = flights.filter((flight) => {
      return (
        flight.from?.toLowerCase().includes(fromDestination.toLowerCase()) &&
        flight.to?.toLowerCase().includes(toDestination.toLowerCase()) &&
        flight.date === departDate
      );
    });
    setResultFlights(filteredFlights);
    setResultFound(filteredFlights.length);
    setAppearingCard(new Array(filteredFlights.length).fill(false));
  };

  const handleBooking = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "https://turbook.onrender.com//api/booking/bookingDetails",
        {
          company: selectedFlight.company,
          from: selectedFlight.from,
          to: selectedFlight.to,
          date: selectedFlight.date,
          time: selectedFlight.time,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Booking successful");
      setIsBooked(false);
      setPopup(false);
    } catch (err) {
      console.error("Booking failed:", err.response?.data || err.message);
      alert("Booking failed. Please try again.");
      setIsBooked(false);
    }
  };
  useEffect(() => {
    if (isBooked) {
      handleBooking();
    }
  }, [isBooked]);

  const sortByPrice = () => {
    const sorted = [...resultFlights].sort((a, b) => {
      const priceA = Number(a.price.replace("RM", "").trim());
      const priceB = Number(b.price.replace("RM", "").trim());
      return priceSorted ? priceB - priceA : priceA - priceB;
    });
    setResultFlights(sorted);
    setPriceSorted(!priceSorted);
  };

  const sortByDeparture = () => {
    const sorted = [...resultFlights].sort((a, b) => {
      const timeA = Number(a.time.replace(":", "").trim());
      const timeB = Number(b.time.replace(":", "").trim());
      return departureSorted ? timeB - timeA : timeA - timeB;
    });
    setResultFlights(sorted);
    setDepartureSorted(!departureSorted);
  };

  useEffect(() => {
    if (resultFlights.length > 0) {
      requestAnimationFrame(() => {
        setAnimationFadeIn("animate-in");
      });
    }
  }, [resultFlights]);

  useEffect(() => {
    if (filteredFlights.length > 0) {
      setResultFlights(filteredFlights);
      setResultFound(filteredFlights.length);
      setAppearingCard(new Array(filteredFlights.length).fill(false));
    }
  }, [filteredFlights]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          setAppearingCard((prev) => {
            const updated = [...prev];
            updated[index] = entry.isIntersecting;
            return updated;
          });
        });
      },
      {
        threshold: 0.4,
      }
    );

    cardRefs.current.forEach((el, i) => {
      if (el) {
        el.dataset.index = i;
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, [resultFlights]);

  const getCompanyName = (rawName) => {
    if (rawName === "Malaysia") return "Malaysia Airlines";
    return rawName;
  };

  return (
    <div>
      <div className="header-layout">
        <div className="option-layout">
          <img src="../images/turbook-logo.png" className="turbook-logo"></img>
          <div className="option-layout-right">
            <button onClick={handleHome}>Home</button>
            <button>About Us</button>
            <button>Contact</button>
            <button onClick={() => setProfileSidebar(true)}>Profile</button>
          </div>
        </div>
        <div className="destination-layout">
          <p>
            {fromDestination || "From"} - {toDestination || "To"}
          </p>
        </div>
      </div>

      <div className="results-form-search-layout">
        <form onSubmit={handleSubmit} className="results-form-search">
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

      <div className="body-layout">
        <div className="body-filter-layout">
          <p>
            <strong>Sort By</strong>
          </p>
          <button onClick={sortByDeparture}>Departure</button>
          <button onClick={sortByPrice}>Price</button>
          <p> {resultFound} Result Found</p>
        </div>

        {resultFlights.map((flight, index) => {
          const companyName = getCompanyName(flight.company);
          return (
            <div
              key={flight.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`body-result-layout ${
                appearingCard[index] ? "visible" : ""
              }`}
            >
              <div className="body-result-image">
                <img
                  src={companyPlane[companyName]}
                  alt={`${companyName} plane`}
                  className="result-plane-image"
                />
              </div>
              <form className="body-result-details">
                <div className="result-details-first-row">
                  <img
                    className="result-details-logo"
                    src={companyLogos[companyName]}
                    alt={`${companyName} logo`}
                  />
                  <p className="result-details-price">{flight.price}</p>
                </div>
                <p className="result-details-company">{flight.company}</p>
                <p className="result-details-company">{flight.from}</p>
                <p className="result-details-company">{flight.to}</p>
                <div className="result-details-fifth-row">
                  <p className="result-details-date">{flight.date}</p>
                  <p className="result-details-time">{flight.time}</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedFlight(flight);
                    setPopup(true);
                  }}
                  className="result-details-book"
                >
                  Book
                </button>
              </form>
            </div>
          );
        })}
      </div>

      <BookingPopup
        setIsBooked={setIsBooked}
        show={popup}
        onClose={() => setPopup(false)}
      >
        {selectedFlight && (
          <div>
            <h3>{selectedFlight.company}</h3>
            <p>From: {selectedFlight.from}</p>
            <p>To: {selectedFlight.to}</p>
            <p>Date: {selectedFlight.date}</p>
            <p>Time: {selectedFlight.time}</p>
            <p>Price: {selectedFlight.price}</p>
          </div>
        )}
      </BookingPopup>

      {profileSideBar && (
        <ProfileSidebar setProfileSidebar={setProfileSidebar} />
      )}
    </div>
  );
}

export default ResultsPage;
