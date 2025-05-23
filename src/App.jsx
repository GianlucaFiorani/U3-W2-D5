import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { useState } from "react";
import MeteoDetails from "./components/MeteoDetails";

function App() {
  const [show, setShow] = useState(false);

  const showSelect = () => {
    setShow(true);
  };
  const movieSelect = () => {
    setShow(false);
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home show={show} />} />
          <Route path="/meteo-details/:lat/:lon/:name" element={<MeteoDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
