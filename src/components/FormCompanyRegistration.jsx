import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Col, Container, Row, Form, FormGroup } from "react-bootstrap";

const FormCompanyRegistration = () => {
  const [provinces, setProvinces] = useState([]);
  const [comuni, setComuni] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedComune, setSelectedComune] = useState("");
  const [ragioneSociale, setRagioneSociale] = useState("");
  const [partitaIva, setPartitaIva] = useState("");
  const [pec, setPec] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [telefonoPersonale, setTelefonoPersonale] = useState("");
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");

  useEffect(() => {
    // Fetch provinces
    const fetchProvinces = async () => {
      try {
        const response = await fetch("http://localhost:3001/provincia", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error("Errore nel caricamento delle province:", error);
      }
    };

    fetchProvinces();
  }, [token]);

  const handleProvinceChange = async event => {
    const provinceId = event.target.value;
    setSelectedProvince(provinceId);

    // Fetch comuni basati su selezione utente
    try {
      const response = await fetch(
        `http://localhost:3001/provincia/${provinceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setComuni(data);
    } catch (error) {
      console.error("Errore nel caricamento dei comuni:", error);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const formData = {
      ragioneSociale,
      partitaIva,
      pec,
      telefono,
      nome,
      cognome,
      telefonoPersonale,
    };

    try {
      const response = await fetch(
        "http://localhost:3001/registration/cliente",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register cliente");
      }

      const data = await response.json();
      console.log("Registration successful:", data);
    } catch (error) {
      console.error("Errore durante la registrazione del cliente:", error);
    }
  };

  return (
    <div>
      <Container>
        <h1 className="text-center my-4"> Registrazione Cliente </h1>
        <Form onSubmit={handleSubmit} className="p-4 rounded border">
          <Row>
            <Col sm="12" md="6" className="bg-white">
              <br />
              <h3>Informazioni Aziendali</h3>
              <FormGroup>
                <Form.Control
                  type="text"
                  placeholder="Ragione Sociale"
                  value={ragioneSociale}
                  onChange={e => setRagioneSociale(e.target.value)}
                  className="my-4"
                />
              </FormGroup>
              <FormGroup>
                <Form.Control
                  type="number"
                  placeholder="Partita IVA"
                  value={partitaIva}
                  onChange={e => setPartitaIva(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Form.Control
                  type="email"
                  placeholder="PEC"
                  value={pec}
                  onChange={e => setPec(e.target.value)}
                  className="my-4"
                />
              </FormGroup>
              <FormGroup>
                <FormControl fullWidth>
                  <InputLabel id="province-label">
                    Seleziona Provincia
                  </InputLabel>
                  <Select
                    labelId="province-label"
                    id="province"
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                  >
                    {provinces.map(province => (
                      <MenuItem key={province.id} value={province.id}>
                        {province.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </FormGroup>
              <FormGroup>
                <FormControl fullWidth className="my-4">
                  <InputLabel id="comune-label">Seleziona Comune</InputLabel>
                  <Select
                    labelId="comune-label"
                    id="comune"
                    value={selectedComune}
                    onChange={e => setSelectedComune(e.target.value)}
                    disabled={!selectedProvince}
                  >
                    {comuni.map(comune => (
                      <MenuItem key={comune.id} value={comune.id}>
                        {comune.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </FormGroup>
            </Col>
            <Col sm="12" md="6" className="bg-white border-left">
              <br />
              <h3>Contatto Azienda</h3>
              <FormGroup className="my-4">
                <Form.Control
                  type="text"
                  placeholder="Nome"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Form.Control
                  type="text"
                  placeholder="Cognome"
                  value={cognome}
                  onChange={e => setCognome(e.target.value)}
                  className="my-4"
                />
              </FormGroup>
              <FormGroup>
                <Form.Control
                  type="text"
                  placeholder="Telefono Personale"
                  value={telefonoPersonale}
                  onChange={e => setTelefonoPersonale(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <button
            type="submit"
            className="btn btn-outline-dark w-100 rounded-5 fs-5 mb-5"
          >
            Invia
          </button>
        </Form>
      </Container>
    </div>
  );
};

export default FormCompanyRegistration;
