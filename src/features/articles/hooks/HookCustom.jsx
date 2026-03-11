import React from "react";
import { Box, Typography } from "@mui/material";
import HookCard from "./HookCard";
import useCuentaRegresiva from "./useCuentaRegresiva";

const HookCustom = () => {
  const tiempo = useCuentaRegresiva(3599);

  return (
    <HookCard nombre="Custom Hook" color="#ec4899"
      descripcion="Encapsula lógica reutilizable. useCuentaRegresiva combina useState + useEffect para exponer un timer.">
      <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1.5,
        background: "#111", px: 2.5, py: 1, borderRadius: "10px" }}>
        <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80",
          animation: "parpadeo 1s infinite",
          "@keyframes parpadeo": { "0%,100%": { opacity: 1 }, "50%": { opacity: 0.2 } }
        }} />
        <Typography sx={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700,
          fontSize: "1.1rem", color: "#fff", letterSpacing: "0.08em" }}>
          {tiempo}
        </Typography>
      </Box>
      <Typography sx={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem",
        color: "#999", mt: 1.5 }}>
        Tiempo restante de oferta
      </Typography>
    </HookCard>
  );
};

export default HookCustom;
