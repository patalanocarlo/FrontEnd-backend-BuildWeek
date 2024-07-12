import React, { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Spinner } from "react-bootstrap";

function Deposits() {
  const [fatturatoAnnuo, setFatturatoAnnuo] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");

  useEffect(() => {
    const fetchFatturatoAnnuo = async () => {
      try {
        const response = await fetch("http://localhost:3001/clienti/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Errore durante il recupero del fatturato annuo");
        }

        const data = await response.json();
        console.log(data);
        if (!data) {
          throw new Error("Dati non validi ricevuti dal server");
        }

        const fatturatoAnnuo = data.fatturatoAnnuale;
        setFatturatoAnnuo(fatturatoAnnuo);
      } catch (error) {
        console.error("Errore nel caricamento del fatturato annuo", error);
      }
    };

    fetchFatturatoAnnuo();
  }, [token]);

  return (
    <React.Fragment>
      <h1>Fatturato Annuo</h1>
      {fatturatoAnnuo !== null ? (
        <Typography component="p" variant="h4">
          ${fatturatoAnnuo.toFixed(2)}
        </Typography>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Al {new Date().toLocaleDateString()}
      </Typography>
      <div>
        <Link
          color="primary"
          href="#"
          onClick={event => event.preventDefault()}
        >
          Visualizza saldo
        </Link>
      </div>
    </React.Fragment>
  );
}

export default Deposits;
