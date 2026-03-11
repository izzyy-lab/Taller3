import React, { useContext, createContext } from "react";
import { Typography, Box } from "@mui/material";
import HookCard from "./HookCard";

export const TemaContext = createContext("claro");

const HookUseContext = () => {
  const tema = useContext(TemaContext);

  return (
    <HookCard nombre="useContext" color="#8b5cf6"
      descripcion="Consume un valor global sin pasar props manualmente por cada nivel.">
      <Box sx={{ display: "flex", alignItems: "center", gap: 1,
        background: tema === "claro" ? "#f9fafb" : "#111",
        px: 2, py: 1, borderRadius: "8px", border: "1px solid rgba(0,0,0,0.06)" }}>
        <Typography sx={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem",
          color: tema === "claro" ? "#111" : "#fff" }}>
          Tema leído del contexto: <strong>{tema}</strong>
        </Typography>
      </Box>
    </HookCard>
  );
};

export default HookUseContext;
