import React from "react";
import { Button, Dropdown, DropdownButton, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const MyNavbar = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <>
      <div className="TopArea">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "0vh",
            padding: "3%",
          }}
        >
          <div style={{ marginLeft: "2vw" }}>
            <img
              style={{ width: "4rem" }}
              src="/src/assets/LOGO.png"
              alt="Logo"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <a className="underLine2 hide_on_responsive" href="#">
              <Button variant="text" color="default">
                SERVIZI
              </Button>
            </a>
            <a className="underLine2 hide_on_responsive" href="#">
              <Button variant="text" color="default">
                CLIENTI
              </Button>
            </a>
            <a className="underLine2 hide_on_responsive" href="#">
              <Button variant="text" color="default">
                ABOUT
              </Button>
            </a>
            <a className="underLine2 hide_on_responsive" onClick={handleLogout}>
              <Button variant="text" color="default">
                LOGOUT
              </Button>
            </a>
            <a className="underLine2 hide_on_responsive">
              <Button variant="outlined" color="secondary">
                CONTATTI
              </Button>
            </a>

            {authToken ? (
              <>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title="PROFILO"
                  menuVariant="dark"
                  className="underLine2 mt-2 "
                >
                  <Dropdown.Item as={Link} to="/admin/dashboard">
                    DASHBOARD
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} onClick={handleLogout}>
                    LOGOUT
                  </Dropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Link to="/login" className="underLine2 ">
                <Button variant="text" color="default">
                  LOGIN
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyNavbar;
