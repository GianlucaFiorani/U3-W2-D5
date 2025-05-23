import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/img/netflix_logo.png";
import { Link } from "react-router-dom";

function MyNav(props) {
  return (
    <Container>
      <Navbar sticky="top" expand="lg" bg="black" data-bs-theme="dark">
        <Container fluid className="px-0">
          <Navbar.Brand href="#">
            <img className="logo" width="110" src={logo} alt="netflix_logo" />
            <span className="logo-reviw">- Review</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
              <Link className="nav-link" to="/">
                <span
                  className={!props.show ? "selected" : ""}
                  onClick={(e) => {
                    props.movieSelect();
                  }}
                >
                  Movies
                </span>
              </Link>
              <Link className="nav-link" to="/">
                <span
                  className={props.show ? "selected" : ""}
                  onClick={(e) => {
                    props.showSelect();
                  }}
                >
                  TvShow
                </span>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
}

export default MyNav;
