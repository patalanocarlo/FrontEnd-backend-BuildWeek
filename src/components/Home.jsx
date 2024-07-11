import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Home = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <div className="text-center">
            <h1>Benvenuto su Epic Energy Services</h1>
            <p>Gestisci i tuoi contatti, fatture e molto altro</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
