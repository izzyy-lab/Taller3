import React, { useState, useCallback } from "react";
import { Box, Button, Typography } from "@mui/material";
import HookCard from "./HookCard";

const HookUseCallback = () => {
  const [seleccionado, setSeleccionado] = useState(null);

  // Sin useCallback se recrearía en cada render
  const handleClick = useCallback((item) => {
    setSeleccionado(item);
  }, []); // solo se crea una vez

  return (
    <HookCard nombre="useCallback" color="#f97316"
      descripcion="Memoriza una función para que no se recree en cada render innecesariamente.">
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        {["Opción A", "Opción B", "Opción C"].map(item => (
          <Button key={item} size="small"
            variant={seleccionado === item ? "contained" : "outlined"}
            onClick={() => handleClick(item)}
            sx={{
              borderColor: "#111", color: seleccionado === item ? "#fff" : "#111",
              background: seleccionado === item ? "#111" : "transparent",
              borderRadius: "8px", textTransform: "none",
              fontFamily: "'DM Sans',sans-serif",
              "&:hover": { background: seleccionado === item ? "#333" : "#f5f5f5" }
            }}>
            {item}
          </Button>
        ))}
      </Box>
      <Typography sx={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", color: "#888" }}>
        Seleccionado: <strong style={{ color: "#111" }}>{seleccionado ?? "ninguno"}</strong>
      </Typography>
    </HookCard>
  );
};

export default HookUseCallback;
