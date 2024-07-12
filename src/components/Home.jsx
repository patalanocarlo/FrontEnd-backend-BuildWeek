import * as React from "react";
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  ButtonGroup,
  Button,
  InputGroup,
  Dropdown,
  Form,
  Table,
} from "react-bootstrap";
import { CiFilter, CiSearch } from "react-icons/ci";
import { FaCheck, FaCogs, FaHome } from "react-icons/fa";
import BackgroundImage from "../assets/dan-meyers-aWrfP-P6CwI-unsplash.jpg";
import logo from "../assets/EpiEnergy-removebg-preview.png";

import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [fatture, setFatture] = React.useState([]);
  const [filteredFatture, setFilteredFatture] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterOption, setFilterOption] = React.useState("all");
  const [userName, setUserName] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      fetchUserInfo(authToken);
      setIsLoggedIn(true);

      const fakeFatture = [
        { id: 1, numero: "FAT001", importo: 100 },
        { id: 2, numero: "FAT002", importo: 200 },
        { id: 3, numero: "FAT003", importo: 150 },
      ];
      setFatture(fakeFatture);
      setFilteredFatture(fakeFatture);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchUserInfo = async token => {
    try {
      const response = await fetch("http://localhost:3001/utenti/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }
      const data = await response.json();
      setUserName(data.nome);
    } catch (error) {
      console.error(
        "Errore nel recupero delle informazioni dell'utente:",
        error
      );
    }
  };

  // Funzione per gestire il cambio nel campo di ricerca
  const handleSearchChange = event => {
    const value = event.target.value;
    setSearchTerm(value);
    filterFatture(value, filterOption);
  };

  // Funzione per gestire il cambio nel dropdown di filtro per importo
  const handleFilterChange = option => {
    setFilterOption(option);
    filterFatture(searchTerm, option);
  };

  // Funzione per filtrare le fatture in base al termine di ricerca e all'opzione di filtro per importo
  const filterFatture = (searchTerm, option) => {
    let filtered = fatture;

    // Filtra per termine di ricerca
    if (searchTerm) {
      filtered = filtered.filter(fattura =>
        fattura.numero.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtra per importo
    if (option !== "all") {
      const minValue = parseInt(option.split("-")[0], 10);
      const maxValue = parseInt(option.split("-")[1], 10);
      filtered = filtered.filter(
        fattura => fattura.importo >= minValue && fattura.importo <= maxValue
      );
    }

    setFilteredFatture(filtered);
  };

  // Opzioni per il dropdown di filtro per importo
  const filterOptions = [
    { value: "all", label: "All" },
    { value: "0-100", label: "0 - 100" },
    { value: "101-200", label: "101 - 200" },
    { value: "201-300", label: "201 - 300" },
  ];

  return (
    <>
      {isLoggedIn ? (
        <Container style={{ minHeight: "100vh" }}>
          <h1>Benvenuto, {userName}!</h1>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 ">
            <div className="d-block mb-4 mb-md-0">
              <Breadcrumb
                className="d-none d-md-inline-block"
                listProps={{
                  className: "breadcrumb-dark breadcrumb-transparent",
                }}
              >
                <Breadcrumb.Item>
                  <FaHome />
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                  Le ultime fatture emesse
                </Breadcrumb.Item>
              </Breadcrumb>
              <h4>Fatture</h4>
              <p className="mb-0">Visualizza le ultime fatture emesse</p>
            </div>
            <div className="btn-toolbar mb-2 mb-md-0">
              <ButtonGroup>
                <Button variant="outline-primary" size="sm">
                  Share
                </Button>
                <Button variant="outline-primary" size="sm">
                  Export
                </Button>
              </ButtonGroup>
            </div>
          </div>

          <div className="table-settings mb-4">
            <Row className="justify-content-between align-items-center">
              <Col xs={8} md={6} lg={3} xl={4}>
                <InputGroup>
                  <InputGroup.Text>
                    <CiSearch />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </InputGroup>
              </Col>
              <Col xs={4} md={2} xl={2} className="ps-md-0 text-end">
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle
                    split
                    as={Button}
                    variant="link"
                    className="text-dark m-0 p-0"
                  >
                    <span className="icon icon-sm icon-gray">
                      <FaCogs />
                    </span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
                    <Dropdown.Item className="fw-bold text-dark">
                      Show
                    </Dropdown.Item>
                    <Dropdown.Item className="d-flex fw-bold">
                      10
                      <span className="icon icon-small ms-auto">
                        <FaCheck />
                      </span>
                    </Dropdown.Item>
                    <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                    <Dropdown.Item className="fw-bold">30</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col xs={12} md={4} lg={3} xl={2} className="ps-md-0 text-end">
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle
                    split
                    as={Button}
                    variant="link"
                    className="text-dark m-0 p-0"
                  >
                    <span className="icon icon-sm icon-gray">
                      <CiFilter />
                    </span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
                    {filterOptions.map(option => (
                      <Dropdown.Item
                        key={option.value}
                        onClick={() => handleFilterChange(option.value)}
                        className="fw-bold"
                      >
                        {option.label}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Numero Fattura</th>
                <th>Importo</th>
              </tr>
            </thead>
            <tbody>
              {filteredFatture.map(fattura => (
                <tr key={fattura.id}>
                  <td>{fattura.id}</td>
                  <td>{fattura.numero}</td>
                  <td>{fattura.importo}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            minHeight: "100vh",
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-center bg-light rounded-3 p-4">
            <img
              src={logo}
              alt="logo"
              style={{
                height: "30vh",
              }}
            />
            <h1 className="fw-bold-light mx-4">Benvenuto su Epic Energy </h1>
            <p>Gestisci i tuoi contatti, fatture e molto altro.</p>

            <Link to="/login" className="btn btn-outline-dark my-3">
              Accedi
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
