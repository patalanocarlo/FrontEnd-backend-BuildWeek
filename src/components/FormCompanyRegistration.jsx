import React, { useState, useEffect } from "react";
import { Col, Container, Row, Form, FormGroup } from "react-bootstrap";

const FormCompanyRegistration = () => {
  const [provinces, setProvinces] = useState([]);
  const [comuni, setComuni] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedComune, setSelectedComune] = useState("");
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

    // Fetch comuni based on selected province
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

  return (
    <div>
      <Container className="resultsContainer">
        <Row>
          <Col sm="12" md="6" className="bg-white rounded border">
            <br />
            <h3>General Information:</h3>
            <Form>
              <FormGroup>
                <Form.Label>Province</Form.Label>
                <Form.Control
                  as="select"
                  name="province"
                  id="province"
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                >
                  <option value="">Select Province</option>
                  {provinces.map(province => (
                    <option key={province.id} value={province.id}>
                      {province.name}
                    </option>
                  ))}
                </Form.Control>
              </FormGroup>
              <FormGroup>
                <Form.Label htmlFor="comune">Comune</Form.Label>
                <Form.Control
                  as="select"
                  name="comune"
                  id="comune"
                  value={selectedComune}
                  onChange={e => setSelectedComune(e.target.value)}
                  disabled={!selectedProvince}
                >
                  <option value="">Select Comune</option>
                  {comuni.map(comune => (
                    <option key={comune.id} value={comune.id}>
                      {comune.name}
                    </option>
                  ))}
                </Form.Control>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FormCompanyRegistration;
