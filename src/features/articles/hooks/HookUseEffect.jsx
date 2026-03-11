import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import HookCard from "./HookCard";

const HookUseEffect = () => {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSegundos(s => s + 1);
    }, 1000);
    return () => clearInterval(intervalo); // cleanup al desmontar
  }, []); // [] = solo al montar

  return (
    <HookCard nombre="useEffect" color="#3b82f6"
      descripcion="Ejecuta efectos secundarios. Aquí inicia un intervalo al montar el componente.">
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: "#3b82f6",
          animation: "pulse 1s infinite", "@keyframes pulse": {
            "0%,100%": { opacity: 1 }, "50%": { opacity: 0.3 } } }} />
        <Typography sx={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#555" }}>
          Componente montado hace <strong style={{ color: "#111" }}>{segundos}s</strong>
        </Typography>
      </Box>
    </HookCard>
  );
};

export default HookUseEffect;
