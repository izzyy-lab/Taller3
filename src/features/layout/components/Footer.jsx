import { Box, Typography, Container, Grid, Divider } from "@mui/material";

const COLORS = {
    black: "#0a0a0a",
    darkGray: "#111111",
    midGray: "#1a1a1a",
    surface: "#242424",
    border: "#2e2e2e",
    white: "#ffffff",
    offWhite: "#e8e8e8",
    muted: "#888888",
    accent: "#0070d2",
    accentHover: "#005bb5",
    gold: "#f0a500",
    red: "#e8002d",
};

const Footer = () => (
    <Box
        component="footer"
        sx={{
        background: COLORS.darkGray,
        borderTop: `1px solid ${COLORS.border}`,
        py: { xs: 4, md: 5 },
        }}
    >
        <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 4 }}>

            {/* Columna marca */}
            <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                <Box sx={{
                width: 32, height: 32,
                background: `linear-gradient(135deg, ${COLORS.accent}, #00aaff)`,
                borderRadius: "8px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 900, fontSize: 13, color: "white",
                }}>
                S
                </Box>
                <Typography sx={{ fontWeight: 800, color: COLORS.white, "& span": { color: COLORS.accent } }}>
                Sony<span>Store</span>
                </Typography>
            </Box>
            <Typography sx={{ color: COLORS.muted, fontSize: "0.85rem", lineHeight: 1.7, maxWidth: 280 }}>
                Tu tienda oficial de productos Sony. Calidad garantizada y envío rápido a todo el país.
            </Typography>
            </Grid>

            {/* Columnas de navegación */}
            {[
            { title: "Tienda", links: ["Artículos", "Ofertas", "Novedades", "Más vendidos"] },
            { title: "Cuenta", links: ["Mi Cuenta", "Favoritos", "Mis Pedidos", "Soporte"] },
            ].map((col) => (
            <Grid item xs={6} md={2} key={col.title}>
                <Typography sx={{ color: COLORS.white, fontWeight: 700, fontSize: "0.85rem", mb: 2, letterSpacing: "0.3px" }}>
                {col.title}
                </Typography>
                {col.links.map((l) => (
                <Typography
                    key={l}
                    sx={{
                    color: COLORS.muted, fontSize: "0.82rem", mb: 1, cursor: "pointer",
                    "&:hover": { color: COLORS.white },
                    transition: "color 0.2s",
                    }}
                >
                    {l}
                </Typography>
                ))}
            </Grid>
            ))}

            {/* Columna contacto */}
            <Grid item xs={12} md={3}>
            <Typography sx={{ color: COLORS.white, fontWeight: 700, fontSize: "0.85rem", mb: 2 }}>
                Contacto
            </Typography>
            {["soporte@sonystore.com", "+57 300 123 4567", "Bogotá, Colombia"].map((t) => (
                <Typography key={t} sx={{ color: COLORS.muted, fontSize: "0.82rem", mb: 1 }}>
                {t}
                </Typography>
            ))}
            </Grid>
        </Grid>

        <Divider sx={{ borderColor: COLORS.border, mb: 3 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
            <Typography sx={{ color: COLORS.muted, fontSize: "0.78rem" }}>
            © 2026 SonyStore — Felipe Echeverri David. Todos los derechos reservados.
            </Typography>
            <Typography sx={{ color: COLORS.muted, fontSize: "0.78rem" }}>
            Productos oficiales Sony · Garantía incluida
            </Typography>
        </Box>
        </Container>
    </Box>
);

export default Footer;