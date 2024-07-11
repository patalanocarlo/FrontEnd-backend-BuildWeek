import { useState } from "react";
import "../style/Registration.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import BackgroundImage from "../assets/fabio-comparelli-uq2E2V4LhCY-unsplash.jpg";
import Logo from "../assets/EpiEnergy-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

let Registration = () => {
  const [validated, setValidated] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      try {
        const response = await fetch(
          "http://localhost:3001/auth/registration",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userName,
              email,
              password,
              nome,
              cognome,
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setResponseMessage("Registration successful");
          setErrorMessages([]);
          navigate("/");
        } else {
          const errorData = await response.json();
          setErrorMessages(errorData.errors || [`${errorData.message}`]);
        }
      } catch (error) {
        setErrorMessages([`${error.message}`]);
      }
    }

    setValidated(true);
  };

  return (
    <>
      <div
        className="registration__wrapper"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <div className="registration__backdrop"></div>
        <Form
          className="shadow p-4 bg-white rounded"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <img
            className="img-thumbnail mx-auto d-block mb-2"
            src={Logo}
            alt="logo"
          />
          <div className="h4 mb-2 text-center">Registrazione</div>
          <Form.Group className="mb-2" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              value={nome}
              onChange={e => setNome(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              value={cognome}
              onChange={e => setCognome(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
                value={userName}
                onChange={e => setUserName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-2" controlId="validationCustom03">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-2" controlId="validationCustom04">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
              feedbackType="invalid"
            />
          </Form.Group>
          <Button className="w-100" variant="primary" type="submit">
            Registrati
          </Button>

          <div className="d-grid text-center mt-2">
            Sei già registrato?
            <Link to="/login" className="text-muted px-0">
              Accedi alla piattaforma
            </Link>
          </div>
          {errorMessages.length > 0 && (
            <Alert variant="danger" className="mt-3">
              <ul>
                {errorMessages.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}
          {responseMessage && (
            <div className="mt-3">
              <p>{responseMessage}</p>
            </div>
          )}
        </Form>
      </div>
    </>
  );
};

export default Registration;
