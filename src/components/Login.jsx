import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "../style/Navbar.css";

import BackgroundImage from "../assets/fabio-comparelli-uq2E2V4LhCY-unsplash.jpg";
import Logo from "../assets/EpiEnergy-removebg-preview.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    console.log("Form submit triggered");
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log("Fetch request sent");
      if (response.ok) {
        const data = await response.json();
        setResponseMessage("Login successful");
        localStorage.setItem("authToken", data.token);
      } else {
        throw new Error("Errore nella richiesta");
      }
    } catch (error) {
      setResponseMessage(`Errore: ${error.message}`);
      setShowError(true); // Mostra l'errore
      console.error("Errore:", error);
    }
  };

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>
      {/* Form */}
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        {/* Header */}
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Sign In</div>
        {/* Alert */}
        {showError && (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShowError(false)}
            dismissible
          >
            Incorrect email or password.
          </Alert>
        )}
        {responseMessage && (
          <Alert className="mb-2" variant="success">
            {responseMessage}
          </Alert>
        )}
        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={e => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="checkbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>

        <Button className="w-100" variant="primary" type="submit">
          Log In
        </Button>

        <div className="d-grid justify-content-end">
          <Button className="text-muted px-0" variant="link">
            Forgot password?
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
