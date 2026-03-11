import React, { useState } from "react";
import { Box, Typography, Button, Chip } from "@mui/material";
import HookCard from "./HookCard";

const HookUseState = () => {
  const [contador, setContador] = useState(0);

  return (
    <HookCard nombre="useState" color="#f59e0b"
      descripcion="Almacena y actualiza valores locales en el componente.">
      <Typography sx={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#555", mb: 2 }}>
        Contador: <strong style={{ color: "#111" }}>{contador}</strong>
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button size="small" variant="contained"
          onClick={() => setContador(c => c + 1)}
          sx={{ background: "#111", borderRadius: "8px", textTransform: "none",
            fontFamily: "'DM Sans',sans-serif", boxShadow: "none",
            "&:hover": { background: "#333" } }}>
          +1
        </Button>
        <Button size="small" variant="outlined"
          onClick={() => setContador(0)}
          sx={{ borderColor: "#111", color: "#111", borderRadius: "8px",
            textTransform: "none", fontFamily: "'DM Sans',sans-serif",
            "&:hover": { background: "#f5f5f5" } }}>
          Reset
        </Button>
      </Box>
    </HookCard>
  );
};

export default HookUseState;
