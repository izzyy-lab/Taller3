import React, { useRef } from "react";
import { Box, Button, TextField } from "@mui/material";
import HookCard from "./HookCard";

const HookUseRef = () => {
  const inputRef = useRef(null);

  return (
    <HookCard nombre="useRef" color="#10b981"
      descripcion="Guarda una referencia directa a un elemento del DOM sin causar re-renders.">
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          inputRef={inputRef}
          size="small"
          placeholder="Haz clic en Enfocar..."
          sx={{ flex: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem",
              "&.Mui-focused fieldset": { borderColor: "#111" }
            }
          }}
        />
        <Button size="small" variant="contained"
          onClick={() => inputRef.current?.focus()}
          sx={{ background: "#111", borderRadius: "8px", textTransform: "none",
            fontFamily: "'DM Sans',sans-serif", boxShadow: "none", whiteSpace: "nowrap",
            "&:hover": { background: "#333" } }}>
          Enfocar
        </Button>
      </Box>
    </HookCard>
  );
};

export default HookUseRef;
