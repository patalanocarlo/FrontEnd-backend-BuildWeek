import React, { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function Orders() {
  const [fatture, setFatture] = useState([]);

  useEffect(() => {
    const fetchFatture = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          `http://localhost:3001/fatture?page=0&size=100`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Errore nel caricamento delle Fatture");
        }
        const data = await response.json();
        setFatture(data.content);
      } catch (error) {
        console.error("Errore nel recupero delle fatture:", error);
      }
    };

    fetchFatture();
  }, []);

  return (
    <React.Fragment>
      <h1>Fatture recenti</h1>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Importo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fatture.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.importo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link
        color="primary"
        href="#"
        onClick={event => event.preventDefault()}
        sx={{ mt: 3, display: "block" }}
      >
        Vedi altre fatture
      </Link>
    </React.Fragment>
  );
}
