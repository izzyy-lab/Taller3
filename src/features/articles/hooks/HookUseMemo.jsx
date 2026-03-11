import React, { useState, useMemo } from "react";
import { Box, Slider, Typography } from "@mui/material";
import HookCard from "./HookCard";

const HookUseMemo = () => {
  const [cantidad, setCantidad] = useState(1);

  // Solo recalcula cuando cambia "cantidad"
  const total = useMemo(() => {
    return (cantidad * 89900).toLocaleString("es-CO");
  }, [cantidad]);

  return (
    <HookCard nombre="useMemo" color="#06b6d4"
      descripcion="Memoriza el resultado de un cálculo costoso y solo lo recalcula si cambian sus dependencias.">
      <Typography sx={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", color: "#555", mb: 1 }}>
        Unidades: <strong style={{ color: "#111" }}>{cantidad}</strong>
      </Typography>
      <Slider
        value={cantidad}
        min={1} max={10}
        onChange={(_, v) => setCantidad(v)}
        sx={{ color: "#111", mb: 1.5 }}
      />
      <Typography sx={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#555" }}>
        Total (useMemo): <strong style={{ color: "#10b981" }}>COP ${total}</strong>
      </Typography>
    </HookCard>
  );
};

export default HookUseMemo;
