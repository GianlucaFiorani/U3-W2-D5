import { Container } from "react-bootstrap";

import { useEffect, useState } from "react";
import PageTitle from "./PageTitle";
import CityList from "./CityList";

const Home = (props) => {
  const [change, setChange] = useState(true);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const carouselChange = () => {
    setChange(!change);
  };
  const searchSubmit = (s) => {
    setSearch(s);
  };

  const fetchCity = async (id) => {
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
    fetchCity();
  }, [search]);
  console.log(city);
  return (
    <>
      <Container className="px-2">
        <PageTitle show={props.show} search={searchSubmit} changeType={carouselChange} />
        <CityList citys={city} />
      </Container>
    </>
  );
};

export default Home;
