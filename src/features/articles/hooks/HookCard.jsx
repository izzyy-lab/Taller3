import React from "react";
import { Box, Typography } from "@mui/material";

const HookCard = ({ nombre, color, descripcion, children }) => (
  <Box sx={{
    background: "#fff",
    borderRadius: "16px",
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    overflow: "hidden"
  }}>
    {/* Franja superior de color */}
    <Box sx={{ height: "4px", background: color }} />

    <Box sx={{ p: 2.5 }}>
      {/* Etiqueta del hook */}
      <Box sx={{
        display: "inline-block",
        background: color,
        color: "#fff",
        fontFamily: "'DM Sans',sans-serif",
        fontWeight: 700,
        fontSize: "0.7rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        px: 1.4, py: 0.5,
        borderRadius: "6px",
        mb: 1.5
      }}>
        {nombre}
      </Box>

      {/* Descripción */}
      <Typography sx={{
        fontFamily: "'DM Sans',sans-serif",
        fontSize: "0.8rem",
        color: "#777",
        lineHeight: 1.6,
        mb: 2
      }}>
        {descripcion}
      </Typography>

      {/* Demo */}
      {children}
    </Box>
  </Box>
);

export default HookCard;
