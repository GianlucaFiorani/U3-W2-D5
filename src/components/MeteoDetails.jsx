import { Link, useParams } from "react-router-dom";
import { Col, Container, ListGroup, ListGroupItem, Row, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { House, Wind } from "react-bootstrap-icons";

const MeteoDetails = () => {
  const params = useParams();
  const [meteoNow, setMeteoNow] = useState([]);
  const [meteoWeek, setMeteoWeek] = useState([]);
  const [meteoWeekDay, setMeteoWeekDay] = useState([]);
  const [meteoWeather, setMeteoWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [date, setDate] = useState([]);
  const mounth = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

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
        setDate(new Date(meteoData.dt * 1000));
        console.log(meteoWeather);
        console.log(meteoNow);
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
  const weekDay = (d) => {
    switch (d.getDay()) {
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
    // console.log(meteoWeekDay);
  }, []);
  return (
    <div
      className="pt-5 position-relative"
      style={{
        overflowY: "auto",
        height: "100%",
        backgroundImage: `url("  ${
          meteoWeather.main === "Rain" || meteoWeather.main === "Drizzle" || meteoWeather.main === "Thunderstorm"
            ? "https://i.gifer.com/Xm74.gif"
            : meteoWeather.main === "Clouds" || parseInt(meteoWeather.icon) === 50
            ? "https://i.gifer.com/9vZI.gif"
            : meteoWeather.main === "Clear"
            ? meteoWeather.icon.slice(-1) === "d"
              ? "https://i.gifer.com/Lx0q.gif"
              : "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXJzZzR4NDd6c3M4dGJrM2Y0eDB5a2Jkcjc1dmlhbGNocXpuY3lzaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pWhWtKdqwOAco/giphy.gif"
            : meteoWeather.main === "Snow"
            ? "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2toMzQ2OTc4aGJtY3lic3c1bnI3Ym95aGZuaWNoaHN2eWV4ZjQ4YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FoVi0LDjy1XS8/giphy.gif"
            : ""
        } ")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Link to={"/"} className="position-absolute btn text-white top-0 p-2 fs-2">
        <House />
      </Link>
      {isLoading ? (
        <Spinner animation="border" className="position-absolute loader" />
      ) : (
        <Container>
          <div className="d-flex justify-content-center">
            <div
              className="meteo pb-0"
              style={{
                background:
                  meteoWeather.main === "Snow" || (meteoWeather.main === "Clear" && meteoWeather.icon.slice(-1))
                    ? "rgba(6, 6, 6, 0.34)"
                    : "rgba(229, 229, 229, 0.34)",
              }}
            >
              <div className="text-center mt-2 ">
                <h2>{params.name}</h2>
              </div>
              <div className="text-center ">{`${weekDay(date)} ${date.getDay()} ${mounth[date.getMonth()]}`}</div>
              <div className="text-center">
                <img src={`https://openweathermap.org/img/wn/${meteoWeather.icon}@4x.png`} alt="" width="200px" className="meteo-icon" />
              </div>
              <div className="text-center meteo-desc">
                <p>{meteoWeather.description}</p>
              </div>
              <div className="text-center temp ">
                <h1>{Math.round(parseFloat(meteoNow.temp))}°</h1>
              </div>
            </div>
          </div>
          <Row className="flex-nowrap mt-5">
            {meteoWeek.slice(0, 8).map((day) => (
              <Col key={day.dt}>
                <div
                  className="rounded-3"
                  style={{
                    background:
                      meteoWeather.main === "Snow" || (meteoWeather.main === "Clear" && meteoWeather.icon.slice(-1))
                        ? "rgba(6, 6, 6, 0.34)"
                        : "rgba(229, 229, 229, 0.34)",
                  }}
                >
                  <div className="text-center">{Math.round(parseFloat(day.main.temp))}°</div>
                  <div className="text-center">
                    <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="" />
                  </div>
                  <div className="text-center">{new Date(day.dt * 1000).getHours()}:00</div>
                </div>
              </Col>
            ))}
          </Row>
          <ListGroup className="flex-nowrap my-5">
            {meteoWeek
              .filter((d) => new Date(d.dt * 1000).getHours() === 8)
              .map((day) => (
                <ListGroupItem
                  key={`w-${day.dt}`}
                  className="d-flex align-items-center justify-content-between"
                  style={{
                    background:
                      meteoWeather.main === "Snow" || (meteoWeather.main === "Clear" && meteoWeather.icon.slice(-1))
                        ? "rgba(6, 6, 6, 0.34)"
                        : "rgba(229, 229, 229, 0.34)",
                  }}
                >
                  <div className="text-center" style={{ width: "37px" }}>
                    {weekDay(new Date(day.dt * 1000))}
                  </div>
                  <div className="text-center">
                    <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="" />
                  </div>
                  <div className="text-center">
                    <Wind className="me-2" /> {day.wind.speed} m/s
                  </div>
                  <div className="text-center">{Math.round(parseFloat(day.main.temp))}°</div>
                </ListGroupItem>
              ))}
          </ListGroup>
        </Container>
      )}
    </div>
  );
};
export default MeteoDetails;
