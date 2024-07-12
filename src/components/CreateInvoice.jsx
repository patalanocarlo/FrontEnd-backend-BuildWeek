import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const CreateInvoice = () => {
  const [idFattura, setIdFattura] = useState("");
  const [importo, setImporto] = useState("");
  const [dataFattura, setDataFattura] = useState("");

  const handleCreateInvoice = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.log("User is not authenticated");
      return;
    }

    const payload = {
      idFattura,
      importo,
      dataFattura,
    };

    try {
      const response = await fetch("http://localhost:3001/fatture/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Invoice created successfully");
        // Handle successful invoice creation
      } else {
        console.log("Failed to create invoice");
        // Handle failed invoice creation
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          Crea una Nuova Fattura
        </Typography>
        <Box component="form" onSubmit={handleCreateInvoice} sx={{ mt: 3 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="idFattura"
            label="ID Fattura"
            name="idFattura"
            autoComplete="idFattura"
            autoFocus
            value={idFattura}
            onChange={(e) => setIdFattura(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="importo"
            label="Importo"
            name="importo"
            autoComplete="importo"
            value={importo}
            onChange={(e) => setImporto(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="dataFattura"
            label="Data Fattura"
            name="dataFattura"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={dataFattura}
            onChange={(e) => setDataFattura(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
            Crea Fattura
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateInvoice;
