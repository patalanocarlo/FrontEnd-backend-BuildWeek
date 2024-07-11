import "../style/Navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import logo from "./../assets/EpiEnergy-removebg-preview.png";

const MyNavbar = () => {
  return (
    <>
      <Navbar expand="lg" className=" navbar-light bg-light">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="nav-link">
              <img src={logo} alt="epicEnergy-logo" width={80} />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto gap-3">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/registration" className="nav-link">
                Registrazione
              </Link>
            </Nav>
            <Nav className="gap-3">
              <Link className="nav-link">Prova</Link>
              <Link className="nav-link">Prova</Link>
              <Nav.Link disabled>Prova</Nav.Link>

              <NavDropdown>
                <NavDropdown.Item>
                  <Link to="/">Prova</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to="/">Prova</Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;
