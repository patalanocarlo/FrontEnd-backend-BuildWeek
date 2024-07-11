import { Container, Row, Col, Button, NavLink } from "react-bootstrap";

let MyFooter = () => {
  return (
    <footer className="container my-5">
      <Container>
        <div className="icon-group d-flex gap-3 mb-3">
          <div className="fb">
            <i className="bi bi-facebook fs-3" />
          </div>
          <div className="ig">
            <i className="bi bi-instagram fs-3" />
          </div>
          <div className="lk">
            <i className="bi bi-linkedin fs-3" />
          </div>
          <div className="yt">
            <i className="bi bi-youtube fs-3" />
          </div>
        </div>

        <Row>
          <Col md={3}>
            <div className="mb-3">
              <NavLink href="#">Audio and Subtitles</NavLink>
            </div>
            <div className="mb-3">
              <NavLink href="#">Media Center</NavLink>
            </div>
            <div className="mb-3">
              <NavLink href="#">Privacy</NavLink>
            </div>
          </Col>
          <Col md={3}>
            <div className="mb-3">
              <NavLink href="#">Legal Notices</NavLink>
            </div>
            <div className="mb-3">
              <NavLink href="#">Contact Us</NavLink>
            </div>
            <div className="mb-3">
              <NavLink href="#">Help Center</NavLink>
            </div>
          </Col>
          <Col md={3}>
            <div className="mb-3">
              <NavLink href="#">Jobs</NavLink>
            </div>
            <div className="mb-3">
              <NavLink href="#" className="fs-6">
                Cookie Preferences
              </NavLink>
            </div>
          </Col>
          <Col md={3}>
            <div className="mb-3">
              <NavLink href="#">Terms of Use</NavLink>
            </div>
            <div className="mb-3">
              <NavLink href="#" className="fs-6">
                Corporate Information
              </NavLink>
            </div>
          </Col>
        </Row>
      </Container>

      <span className="d-block text-center mt-2">
        © EpicService, Inc. All Rights Reserved.
      </span>
    </footer>
  );
};

export default MyFooter;
