import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const CityList = (props) => {
  return (
    <ListGroup>
      {props.citys.map((city) => (
        <Link
          to={`/meteo-details/${city.lat}/${city.lon}/${`${city.name} ${city.country}`}`}
          key={`${city.lat}-${city.lon}`}
          className="nav-link"
          onClick={(e) => props.h && props.historyUpdate(city, e)}
        >
          <ListGroup.Item className="d-flex align-items-center p-4">
            <div>
              <span>{city.name}</span>
              <span className="ms-3">{city.country}</span>
            </div>
          </ListGroup.Item>
        </Link>
      ))}
    </ListGroup>
  );
};
export default CityList;
