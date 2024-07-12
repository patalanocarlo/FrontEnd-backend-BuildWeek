import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [aziende, setAziende] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAziende();
  }, []);

  const fetchAziende = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:3001/clienti", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Errore nel caricamento delle aziende");
      }

      const data = await response.json();
      setAziende(data);
    } catch (error) {
      setError("Errore nel caricamento delle aziende");
      console.error("Errore nel caricamento delle aziende:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:3001/clienti/search?term=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Errore nella ricerca delle aziende");
      }

      const data = await response.json();
      setAziende(data);
    } catch (error) {
      setError("Errore nella ricerca delle aziende");
      console.error("Errore nella ricerca delle aziende:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:3001/clienti/${deleteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Errore nell'eliminazione dell'azienda");
      }

      fetchAziende();
      setShowDeleteModal(false);
    } catch (error) {
      setError("Errore nell'eliminazione dell'azienda");
      console.error("Errore nell'eliminazione dell'azienda:", error);
    }
  };

  const openDeleteModal = id => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div>
      <h2>Dashboard Admin</h2>
      <Form.Group controlId="searchForm">
        <Form.Control
          type="text"
          placeholder="Cerca azienda per nome..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Button variant="primary" onClick={handleSearch}>
          Cerca
        </Button>
      </Form.Group>

      {error && <div className="alert alert-danger">{error}</div>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Operazioni</th>
          </tr>
        </thead>
        <tbody>
          {aziende.map(azienda => (
            <tr key={azienda.id}>
              <td>{azienda.id}</td>
              <td>{azienda.nome}</td>
              <td>
                <Link
                  to={`/admin/aziende/${azienda.id}`}
                  className="btn btn-primary"
                >
                  Dettagli
                </Link>
                <Button
                  variant="danger"
                  onClick={() => openDeleteModal(azienda.id)}
                >
                  Elimina
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sei sicuro di voler eliminare questa azienda?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Annulla
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
