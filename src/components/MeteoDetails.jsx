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
  const [date, setDate] = useState([]);

  const fetchMeteoNow = async () => {
    console.log("fetching...");
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${params.lat}&lon=${params.lon}&appid=2b97b0e9fac8ab88425abf5337b025fe&units=metric&lang=it`
      );
      if (response.ok) {
        const meteoData = await response.json();
        setMeteoWeather(meteoData.weather[0]);
        setMeteoNow(meteoData.main);
        setDate(new Date(meteoData.dt * 1000).toDateString());
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
        `https://api.openweathermap.org/data/2.5/forecast?lat=${params.lat}&lon=${params.lon}&appid=2b97b0e9fac8ab88425abf5337b025fe&units=metric&lang=it`
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
  const weekDay = (d) => {
    switch (new Date(d.dt * 1000).getDay()) {
      case 0:
        return "Dom";

      case 1:
        return "Lun";

      case 2:
        return "Mar";

      case 3:
        return "Mer";

      case 4:
        return "Gio";

      case 5:
        return "Ven";

      case 6:
        return "Sab";
    }
  };
  useEffect(() => {
    fetchMeteoNow();
    fetchMeteoWeek();
    console.log(params);
  }, []);
  return (
    <div
      className="pt-5"
      style={{
        height: "100%",
        backgroundImage: `url("  ${
          meteoWeather.main === "Rain" || meteoWeather.main === "Drizzle"
            ? "https://i.gifer.com/Xm74.gif"
            : meteoWeather.main === "Clouds"
            ? "https://i.gifer.com/9vZI.gif"
            : ""
        } ")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container>
        <div className="d-flex justify-content-center">
          <div className="meteo">
            <div className="text-center mt-2 ">
              <h2>{params.name}</h2>
            </div>
            <div className="text-center ">{date}</div>
            <div className="text-center">
              <img src={`https://openweathermap.org/img/wn/${meteoWeather.icon}@4x.png`} alt="" width="200px" />
            </div>
            <div className="text-center">
              <p>{meteoWeather.description}</p>
            </div>
            <div className="text-center ">
              <h1>{Math.round(parseFloat(meteoNow.temp))}°</h1>
            </div>
          </div>
        </div>
        <Row className="flex-nowrap mt-4">
          {meteoWeek.map((day) => (
            <Col>
              <div className="text-center">{Math.round(parseFloat(day.main.temp))}°</div>
              <div className="text-center">
                <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="" />
              </div>
              <div className="text-center">{weekDay(day)}</div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
export default MeteoDetails;
