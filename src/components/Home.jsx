import { Container } from "react-bootstrap";

import { useEffect, useState } from "react";
import PageTitle from "./PageTitle";
import CityList from "./CityList";
import History from "./History";

const Home = (props) => {
  const [change, setChange] = useState(true);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState([]);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const historyNow = localStorage.getItem("history");

  const carouselChange = () => {
    setChange(!change);
  };
  const searchSubmit = (s) => {
    setSearch(s);
  };
  const historyUpdate = (h, e) => {
    // e.preventDefault();
    // setHistory([...history, h]);
    localStorage.setItem("history", JSON.stringify(history));
    setTimeout(() => {
      console.log(history);
      console.log(JSON.parse(localStorage.getItem("history")));
    }, 500);
  };

  const fetchCity = async () => {
    console.log("fetching...");
    setIsLoading(true);
    try {
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=2b97b0e9fac8ab88425abf5337b025fe`);
      if (response.ok) {
        const cityData = await response.json();
        setCity(cityData);
      } else {
        throw new Error("Errore nel caricamento");
      }
    } catch (error) {
      console.log(error);
      setHasError(true);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    search && fetchCity();
  }, [search]);
  console.log(city);
  return (
    <>
      <Container className="px-2">
        <PageTitle show={props.show} search={searchSubmit} changeType={carouselChange} />
        <CityList citys={city} historyUpdate={historyUpdate} h={true} />
        {/* {localStorage.length > 0 && <History />} */}
      </Container>
    </>
  );
};

export default Home;
