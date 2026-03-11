import {
    Box, Typography, Button, Container, Grid, Card, CardContent, Chip,
} from "@mui/material";
import { Link } from "react-router-dom";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BoltIcon from "@mui/icons-material/Bolt";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import TvIcon from "@mui/icons-material/Tv";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import GitHubIcon from "@mui/icons-material/GitHub";

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

const categories = [
    { label: "Audio",       icon: <HeadphonesIcon sx={{ fontSize: 32 }} />, count: "124 productos" },
    { label: "Televisores", icon: <TvIcon sx={{ fontSize: 32 }} />,          count: "89 productos" },
    { label: "Cámaras",     icon: <CameraAltIcon sx={{ fontSize: 32 }} />,   count: "67 productos" },
    { label: "Gaming",      icon: <SportsEsportsIcon sx={{ fontSize: 32 }} />,count: "203 productos" },
    { label: "Móviles",     icon: <PhoneAndroidIcon sx={{ fontSize: 32 }} />, count: "45 productos" },
];

const featuredProducts = [
    {
        name: "Sony WH-1000XM5",
        category: "Audio",
        price: "$349.99",
        oldPrice: "$399.99",
        badge: "Más vendido",
        badgeColor: "#0070d2",
        rating: 4.9,
        reviews: 2847,
        gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        emoji: "🎧",
    },
    {
        name: "Sony A7R V",
        category: "Cámara",
        price: "$3,499.99",
        oldPrice: null,
        badge: "Nuevo",
        badgeColor: "#f0a500",
        rating: 4.8,
        reviews: 431,
        gradient: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        emoji: "📷",
    },
    {
        name: "PlayStation 5",
        category: "Gaming",
        price: "$499.99",
        oldPrice: "$549.99",
        badge: "Oferta",
        badgeColor: "#e8002d",
        rating: 4.9,
        reviews: 15203,
        gradient: "linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #003366 100%)",
        emoji: "🎮",
    },
    {
        name: 'Sony Bravia XR 65"',
        category: "TV",
        price: "$1,799.99",
        oldPrice: "$2,199.99",
        badge: "18% OFF",
        badgeColor: "#e8002d",
        rating: 4.7,
        reviews: 892,
        gradient: "linear-gradient(135deg, #1a1a1a 0%, #0a1628 100%)",
        emoji: "📺",
    },
];

const stats = [
    { value: "500+", label: "Productos Sony" },
    { value: "50K+", label: "Clientes felices" },
    { value: "4.9★", label: "Valoración media" },
    { value: "24h",  label: "Envío express" },
];

export const Content = () => {
    return (
        <Box sx={{ background: COLORS.black, minHeight: "100vh" }}>

        {/* ── HERO ── */}
        <Box
            sx={{
            position: "relative",
            overflow: "hidden",
            py: { xs: 8, md: 14 },
            background: `radial-gradient(ellipse 80% 60% at 50% 0%, #0070d222 0%, transparent 70%),
                        linear-gradient(180deg, #0a0f1e 0%, ${COLORS.black} 100%)`,
            }}
        >
            <Box sx={{
            position: "absolute", top: -120, right: -120,
            width: 500, height: 500, borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.accent}18 0%, transparent 70%)`,
            pointerEvents: "none",
            }} />
            <Box sx={{
            position: "absolute", bottom: -80, left: -80,
            width: 350, height: 350, borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.red}18 0%, transparent 70%)`,
            pointerEvents: "none",
            }} />

            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
            <Grid container alignItems="center" spacing={{ xs: 4, md: 8 }}>

                {/* Texto */}
                <Grid item xs={12} md={6}>
                <Chip
                    icon={<BoltIcon sx={{ fontSize: "14px !important", color: `${COLORS.accent} !important` }} />}
                    label="Tecnología de última generación"
                    size="small"
                    sx={{
                    mb: 3,
                    background: `${COLORS.accent}18`,
                    color: COLORS.accent,
                    border: `1px solid ${COLORS.accent}44`,
                    fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.5px",
                    "& .MuiChip-icon": { ml: 1 },
                    }}
                />
                <Typography
                    variant="h2"
                    sx={{
                    fontWeight: 900,
                    fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.5rem" },
                    lineHeight: 1.1,
                    color: COLORS.white,
                    letterSpacing: "-1.5px",
                    mb: 2.5,
                    }}
                >
                    Productos Sony{" "}
                    <Box component="span" sx={{
                    background: `linear-gradient(90deg, ${COLORS.accent}, #00aaff)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    }}>
                    Originales
                    </Box>
                </Typography>
                <Typography sx={{
                    color: COLORS.muted, fontSize: { xs: "1rem", md: "1.1rem" },
                    lineHeight: 1.7, mb: 4, maxWidth: 480,
                }}>
                    Descubre el catálogo oficial Sony: audio premium, televisores BRAVIA,
                    cámaras Alpha y la última PlayStation. Todo con garantía oficial.
                </Typography>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <Button
                    component={Link}
                    to="/articles"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                        background: `linear-gradient(90deg, ${COLORS.accent}, #005bb5)`,
                        color: "white", fontWeight: 700, textTransform: "none",
                        borderRadius: "10px", px: 3.5, py: 1.4, fontSize: "0.95rem",
                        boxShadow: `0 8px 24px ${COLORS.accent}44`,
                        "&:hover": { background: `linear-gradient(90deg, ${COLORS.accentHover}, #004a9e)`, transform: "translateY(-1px)" },
                        transition: "all 0.2s",
                    }}
                    >
                    Ver catálogo
                    </Button>
                    <Button
                    component={Link}
                    to="/offers"
                    variant="outlined"
                    size="large"
                    startIcon={<LocalOfferIcon />}
                    sx={{
                        borderColor: COLORS.border, color: COLORS.offWhite,
                        fontWeight: 600, textTransform: "none", borderRadius: "10px",
                        px: 3.5, py: 1.4, fontSize: "0.95rem",
                        "&:hover": { borderColor: COLORS.accent, color: COLORS.accent, background: `${COLORS.accent}11` },
                    }}
                    >
                    Ofertas activas
                    </Button>
                </Box>
                </Grid>

                {/* Visual hero */}
                <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
                <Box
                    sx={{
                    width: { xs: 280, md: 380 }, height: { xs: 280, md: 380 },
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${COLORS.surface} 0%, ${COLORS.midGray} 100%)`,
                    border: `1px solid ${COLORS.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative",
                    boxShadow: `0 0 80px ${COLORS.accent}22, 0 40px 80px #00000088`,
                    fontSize: "8rem",
                    }}
                >
                    🎧
                    {["📺", "🎮", "📷"].map((emoji, i) => (
                    <Box
                        key={i}
                        sx={{
                        position: "absolute",
                        top: `${[10, 75, 40][i]}%`,
                        left: `${[80, 85, -10][i]}%`,
                        width: { xs: 48, md: 60 }, height: { xs: 48, md: 60 },
                        borderRadius: "14px",
                        background: COLORS.surface,
                        border: `1px solid ${COLORS.border}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: { xs: "1.4rem", md: "1.8rem" },
                        boxShadow: "0 8px 24px #00000066",
                        transform: `rotate(${[-8, 6, -5][i]}deg)`,
                        }}
                    >
                        {emoji}
                    </Box>
                    ))}
                </Box>
                </Grid>
            </Grid>

            {/* Stats */}
            <Grid container spacing={2} sx={{ mt: { xs: 6, md: 8 } }}>
                {stats.map((s) => (
                <Grid item xs={6} md={3} key={s.label}>
                    <Box sx={{
                    p: { xs: 2, md: 3 },
                    borderRadius: "12px",
                    background: COLORS.surface,
                    border: `1px solid ${COLORS.border}`,
                    textAlign: "center",
                    }}>
                    <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.4rem", md: "1.8rem" }, color: COLORS.white, letterSpacing: "-0.5px" }}>
                        {s.value}
                    </Typography>
                    <Typography sx={{ color: COLORS.muted, fontSize: "0.8rem", mt: 0.3 }}>
                        {s.label}
                    </Typography>
                    </Box>
                </Grid>
                ))}
            </Grid>
            </Container>
        </Box>

        {/* ── CATEGORÍAS ── */}
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
            <Box sx={{ mb: 5 }}>
            <Typography sx={{ color: COLORS.accent, fontWeight: 700, fontSize: "0.8rem", letterSpacing: "2px", textTransform: "uppercase", mb: 1 }}>
                Explorar
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: COLORS.white, letterSpacing: "-1px" }}>
                Categorías
            </Typography>
            </Box>

            <Grid container spacing={2}>
            {categories.map((cat) => (
                <Grid item xs={6} sm={4} md={2.4} key={cat.label}>
                <Box
                    component={Link}
                    to="/articles"
                    sx={{
                    display: "block", textDecoration: "none",
                    p: { xs: 2, md: 3 },
                    borderRadius: "14px",
                    background: COLORS.surface,
                    border: `1px solid ${COLORS.border}`,
                    textAlign: "center",
                    transition: "all 0.25s",
                    "&:hover": {
                        background: `linear-gradient(135deg, ${COLORS.surface}, ${COLORS.accent}18)`,
                        borderColor: COLORS.accent,
                        transform: "translateY(-4px)",
                        boxShadow: `0 16px 40px ${COLORS.accent}22`,
                        "& .cat-icon": { color: COLORS.accent },
                    },
                    }}
                >
                    <Box className="cat-icon" sx={{ color: COLORS.muted, mb: 1.5, transition: "color 0.25s" }}>
                    {cat.icon}
                    </Box>
                    <Typography sx={{ color: COLORS.white, fontWeight: 700, fontSize: "0.9rem" }}>
                    {cat.label}
                    </Typography>
                    <Typography sx={{ color: COLORS.muted, fontSize: "0.72rem", mt: 0.3 }}>
                    {cat.count}
                    </Typography>
                </Box>
                </Grid>
            ))}
            </Grid>
        </Container>

        {/* ── GITHUB SECTION ── */}
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
            <Box
                sx={{
                    p: { xs: 4, md: 6 },
                    borderRadius: "16px",
                    background: `linear-gradient(135deg, ${COLORS.surface}dd 0%, ${COLORS.midGray}dd 100%)`,
                    border: `1px solid ${COLORS.border}`,
                    textAlign: "center",
                    boxShadow: `0 8px 32px #00000044`,
                }}
            >
                <Typography
                    sx={{
                        color: COLORS.white,
                        fontWeight: 800,
                        fontSize: { xs: "1.6rem", md: "2.2rem" },
                        mb: 2,
                        letterSpacing: "-0.5px",
                    }}
                >
                    ¿Quieres ver el código?
                </Typography>
                <Typography
                    sx={{
                        color: COLORS.muted,
                        fontSize: "1rem",
                        mb: 4,
                        maxWidth: 500,
                        mx: "auto",
                    }}
                >
                    Explora nuestro repositorio en GitHub y contribuye con tu código
                </Typography>
                <Button
                    href="https://github.com/izzyy-lab/Taller3"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    size="large"
                    startIcon={<GitHubIcon />}
                    sx={{
                        background: `linear-gradient(90deg, #1a1a1a, #333333)`,
                        border: `2px solid ${COLORS.accent}`,
                        color: COLORS.white,
                        fontWeight: 700,
                        textTransform: "none",
                        borderRadius: "10px",
                        px: 4,
                        py: 1.4,
                        fontSize: "1rem",
                        "&:hover": {
                            background: `linear-gradient(90deg, ${COLORS.accent}, #005bb5)`,
                            borderColor: COLORS.accentHover,
                            transform: "translateY(-2px)",
                            boxShadow: `0 12px 28px ${COLORS.accent}44`,
                        },
                        transition: "all 0.3s",
                    }}
                >
                    Ver en GitHub
                </Button>
            </Box>
        </Container>
        </Box>
    );
};