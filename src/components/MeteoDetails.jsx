import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

const MeteoDetails = () => {
  const params = useParams();
  const [meteoNow, setMeteoNow] = useState([]);
  const [meteoWeek, setMeteoWeek] = useState([]);
  const [meteoWeather, setMeteoWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchMeteoNow = async () => {
    console.log("fetching...");
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${params.lat}&lon=${params.lon}&appid=2b97b0e9fac8ab88425abf5337b025fe&units=metric`
      );
      if (response.ok) {
        const meteoData = await response.json();
        setMeteoWeather(meteoData.weather[0]);
        setMeteoNow(meteoData.main);
        console.log(meteoWeather);
        console.log(meteoNow);
      } else {
        throw new Error("Errore nel caricamento film");
      }
    } catch (error) {
      console.log(error);
      setHasError(true);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchMeteoWeek = async () => {
    console.log("fetching...");
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${params.lat}&lon=${params.lon}&appid=2b97b0e9fac8ab88425abf5337b025fe&units=metric`
      );
      if (response.ok) {
        const meteoData = await response.json();
        setMeteoWeek(meteoData.list);
      } else {
        throw new Error("Errore nel caricamento film");
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
    fetchMeteoNow();
    fetchMeteoWeek();
    console.log(params);
  }, []);
  return (
    <div
      style={{
        height: "100%",
        backgroundImage: `url("  ${
          meteoWeather.main === "Rain" ? "https://i.gifer.com/Xm74.gif" : meteoWeather.main === "Clouds" ? "https://i.gifer.com/9vZI.gif" : ""
        } ")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container>
        <div>
          <div className="text-center pt-5"></div>
          <div className="text-center">
            <h3>{params.name}</h3>
          </div>
          <div className="text-center">
            <img src={`https://openweathermap.org/img/wn/${meteoWeather.icon}@2x.png`} alt="" />
          </div>
          <div className="text-center">
            <p>{meteoWeather.description}</p>
          </div>
          <div className="text-center ">
            <h1>{Math.round(parseFloat(meteoNow.temp))}°</h1>
          </div>
        </div>
        <Row className="flex-nowrap mt-4">
          {meteoWeek.map((day) => (
            <Col>
              <div className="text-center">{Math.round(parseFloat(day.main.temp))}°</div>
              <div className="text-center">
                <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="" />
              </div>
              <div className="text-center">{day.dt_txt}</div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
export default MeteoDetails;
