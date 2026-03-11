import React from "react";
import { Box, Typography } from "@mui/material";
import { TemaContext } from "../hooks/HookUseContext";

import HookUseState    from "../hooks/HookUseState";
import HookUseEffect   from "../hooks/HookUseEffect";
import HookUseContext  from "../hooks/HookUseContext";
import HookUseRef      from "../hooks/HookUseRef";
import HookUseReducer  from "../hooks/HookUseReducer";
import HookUseCallback from "../hooks/HookUseCallback";
import HookUseMemo     from "../hooks/HookUseMemo";
import HookCustom      from "../hooks/HookCustom";

const Offers = () => (
  <TemaContext.Provider value="oscuro">
    <Box sx={{
      width: "100%",
      minHeight: "100vh",
      background: "linear-gradient(160deg, #fafafa, #f0f0f0)",
      py: 8,
      px: { xs: 2, md: 4 },
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');`}</style>

      {/* Encabezado */}
      <Box sx={{ textAlign: "center", mb: 7 }}>
        <Typography sx={{
          fontFamily: "'DM Sans',sans-serif", fontWeight: 800,
          fontSize: { xs: "2rem", md: "2.8rem" }, color: "#111",
          letterSpacing: "-0.04em", lineHeight: 1.1, mb: 1.5
        }}>
          Ofertas del día
        </Typography>
        <Typography sx={{
          fontFamily: "'DM Sans',sans-serif", fontSize: "1rem",
          color: "#999", maxWidth: 440, mx: "auto", lineHeight: 1.6
        }}>
          Ejemplos interactivos de los React Hooks más importantes
        </Typography>
        <Box sx={{
          width: 48, height: 4,
          background: "linear-gradient(90deg,#ef4444,#f97316)",
          borderRadius: 2, mx: "auto", mt: 2.5
        }} />
      </Box>

      {/* Grid de hooks */}
      <Box sx={{
        maxWidth: 1100, mx: "auto",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", md: "repeat(2,1fr)" },
        gap: 3
      }}>
        <HookUseState />
        <HookUseEffect />
        <HookUseContext />
        <HookUseRef />
        <HookUseReducer />
        <HookUseCallback />
        <HookUseMemo />
        <HookCustom />
      </Box>
    </Box>
  </TemaContext.Provider>
);

export default Offers;