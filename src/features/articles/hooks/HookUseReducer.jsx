import React, { useReducer } from "react";
import { Box, Button, Typography } from "@mui/material";
import HookCard from "./HookCard";

const reducer = (state, action) => {
  switch (action.type) {
    case "AGREGAR": return { cantidad: state.cantidad + 1 };
    case "QUITAR":  return { cantidad: Math.max(0, state.cantidad - 1) };
    case "LIMPIAR": return { cantidad: 0 };
    default:        return state;
  }
};

const HookUseReducer = () => {
  const [state, dispatch] = useReducer(reducer, { cantidad: 0 });

  return (
    <HookCard nombre="useReducer" color="#ef4444"
      descripcion="Maneja estados complejos con acciones explícitas, similar a Redux.">
      <Typography sx={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem",
        color: "#555", mb: 2 }}>
        Items en carrito: <strong style={{ color: "#111" }}>{state.cantidad}</strong>
      </Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {[
          { label: "+ Agregar", type: "AGREGAR", bg: "#111" },
          { label: "- RESTAR",  type: "QUITAR",  bg: "#555" },
          { label: "Limpiar",   type: "LIMPIAR",  bg: "#ef4444" },
        ].map(btn => (
          <Button key={btn.type} size="small" variant="contained"
            onClick={() => dispatch({ type: btn.type })}
            sx={{ background: btn.bg, borderRadius: "8px", textTransform: "none",
              fontFamily: "'DM Sans',sans-serif", boxShadow: "none",
              "&:hover": { background: btn.bg, opacity: 0.85 } }}>
            {btn.label}
          </Button>
        ))}
      </Box>
    </HookCard>
  );
};

export default HookUseReducer;
