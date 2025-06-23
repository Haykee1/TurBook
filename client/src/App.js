import logo from "./logo.svg";
import "./App.css";
import HomePage from "./component/HomePage";
import ResultsPage from "./component/ResultsPage";
import LoginPage from "./component/LoginPage";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [flights, setFlight] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/booking")
      .then((response) => response.json())
      .then((data) => setFlight(data))
      .catch((err) => console.error("API Error: ", err));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/TurBook" element={<HomePage flights={flights} />} />
        <Route
          path="/TurBook/Results"
          element={<ResultsPage flights={flights} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
