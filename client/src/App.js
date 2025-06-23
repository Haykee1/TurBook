import "./App.css";
import HomePage from "./component/HomePage";
import ResultsPage from "./component/ResultsPage";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // import Navigate

function App() {
  const [flights, setFlight] = useState([]);

  useEffect(() => {
    fetch("https://turbook.onrender.com//api/booking")
      .then((response) => response.json())
      .then((data) => setFlight(data))
      .catch((err) => console.error("API Error: ", err));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/TurBook" />} />
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
