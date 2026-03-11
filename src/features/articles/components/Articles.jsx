import { useState } from "react";
import {
    Container, Grid, Card, CardMedia, CardContent, CardActions,
    Typography, Button, IconButton, Box, Chip, TextField,
    InputAdornment, ToggleButton, ToggleButtonGroup, Snackbar, Alert,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";

import { useFavorites, useCart, products } from "../hooks/FavoriteContext";

const COLORS = {
    black: "#0a0a0a",
    darkGray: "#111111",
    midGray: "#1a1a1a",
    surface: "#242424",
    surfaceHover: "#2e2e2e",
    border: "#2e2e2e",
    white: "#ffffff",
    offWhite: "#e8e8e8",
    muted: "#888888",
    accent: "#0070d2",
    accentHover: "#005bb5",
    gold: "#f0a500",
    red: "#e8002d",
};

const categories = ["Todos", "TV y Teatro en Casa", "Camaras", "Audio", "Gaming"];

const badgeColors = {
    "Nuevo":       COLORS.accent,
    "Más vendido": COLORS.gold,
    "Oferta":      COLORS.red,
};

export const Articles = () => {
    const { favorites, toggleFav } = useFavorites();
    const { addToCart, cart }      = useCart();

    const [search, setSearch]           = useState("");
    const [activeCategory, setCategory] = useState("Todos");
    const [layout, setLayout]           = useState("grid");
    const [snack, setSnack]             = useState({ open: false, msg: "", type: "success" });

    const showSnack = (msg, type = "success") =>
        setSnack({ open: true, msg, type });

    const handleAddToCart = (product) => {
        addToCart(product.id);
        const inCart = cart.find((i) => i.id === product.id);
        showSnack(
            inCart
                ? `+1 "${product.name}" en el carrito`
                : `"${product.name}" añadido al carrito`,
            "success"
        );
    };

    const handleToggleFav = (product) => {
        const isFav = favorites.includes(product.id);
        toggleFav(product.id);
        showSnack(
            isFav
                ? `"${product.name}" eliminado de favoritos`
                : `"${product.name}" añadido a favoritos`,
            isFav ? "warning" : "success"
        );
    };

    const filtered = products.filter((p) => {
        const matchCat    = activeCategory === "Todos" || p.category === activeCategory;
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <Box sx={{ background: COLORS.black, minHeight: "100vh", pb: 10 }}>

        {/* ── Encabezado ── */}
        <Box sx={{
            background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${COLORS.accent}18 0%, transparent 70%),
                        linear-gradient(180deg, #0a0f1e 0%, ${COLORS.black} 100%)`,
            pt: { xs: 6, md: 8 }, pb: { xs: 4, md: 6 },
            textAlign: "center",
        }}>
            <Typography sx={{
                color: COLORS.accent, fontWeight: 700, fontSize: "0.78rem",
                letterSpacing: "2.5px", textTransform: "uppercase", mb: 1,
            }}>
                Catálogo
            </Typography>
            <Typography variant="h3" sx={{
                fontWeight: 900, color: COLORS.white,
                fontSize: { xs: "1.8rem", md: "2.6rem" },
                letterSpacing: "-1px", mb: 1,
            }}>
                Nuestros Artículos
            </Typography>
            <Typography sx={{ color: COLORS.muted, fontSize: "0.95rem" }}>
                {filtered.length} producto{filtered.length !== 1 ? "s" : ""} disponible{filtered.length !== 1 ? "s" : ""}
            </Typography>
        </Box>

        <Container maxWidth="xl">

            {/* ── Barra de búsqueda + layout toggle ── */}
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap", mb: 3 }}>
                <TextField
                    placeholder="Buscar producto..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    size="small"
                    sx={{
                        flexGrow: 1, minWidth: 80,
                        "& .MuiOutlinedInput-root": {
                            background: COLORS.surface, borderRadius: "10px", color: COLORS.white,
                            "& fieldset": { borderColor: COLORS.border },
                            "&:hover fieldset": { borderColor: COLORS.accent },
                            "&.Mui-focused fieldset": { borderColor: COLORS.accent },
                        },
                        "& input::placeholder": { color: COLORS.muted, opacity: 1 },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: COLORS.muted, fontSize: 20 }} />
                            </InputAdornment>
                        ),
                    }}
                />


            </Box>

            {/* ── Filtros de categoría ── */}
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 4 }}>
                {categories.map((cat) => (
                    <Chip
                        key={cat} label={cat}
                        onClick={() => setCategory(cat)}
                        sx={{
                            fontWeight: 600, fontSize: "0.78rem", cursor: "pointer",
                            background: activeCategory === cat ? COLORS.accent : COLORS.surface,
                            color:      activeCategory === cat ? COLORS.white  : COLORS.muted,
                            border: `1px solid ${activeCategory === cat ? COLORS.accent : COLORS.border}`,
                            "&:hover": {
                                background: activeCategory === cat ? COLORS.accentHover : COLORS.surfaceHover,
                                color: COLORS.white,
                            },
                            transition: "all 0.2s",
                        }}
                    />
                ))}
            </Box>

            {/* ── Sin resultados ── */}
            {filtered.length === 0 && (
                <Box sx={{ textAlign: "center", py: 12 }}>
                    <Typography sx={{ fontSize: "3rem", mb: 2 }}>🔍</Typography>
                    <Typography sx={{ color: COLORS.white, fontWeight: 700, fontSize: "1.1rem" }}>
                        Sin resultados para "{search}"
                    </Typography>
                    <Typography sx={{ color: COLORS.muted, mt: 1 }}>
                        Intenta con otro nombre o categoría
                    </Typography>
                </Box>
            )}

            {/* ── Grid de productos ── */}
            <Grid container spacing={2.5}>
                {filtered.map((product) => (
                    <Grid
                        key={product.id}
                        size={{
                            xs: 12,
                            sm: layout === "list" ? 12 : 6,
                            md: layout === "list" ? 12 : 4,
                            lg: layout === "list" ? 12 : 3,
                        }}
                    >
                        <Card sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: layout === "list" ? "row" : "column",
                            background: COLORS.surface,
                            border: `1px solid ${COLORS.border}`,
                            borderRadius: "16px",
                            overflow: "hidden",
                            transition: "all 0.25s",
                            "&:hover": {
                                transform: "translateY(-5px)",
                                borderColor: `${COLORS.accent}66`,
                                boxShadow: `0 20px 50px #00000077`,
                            },
                        }}>
                            {/* Imagen */}
                            <Box sx={{
                                position: "relative",
                                background: "#ffffff",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0,
                                width:  layout === "list" ? { xs: 130, md: 180 } : "100%",
                                height: layout === "list" ? "auto" : 220,
                            }}>
                                <CardMedia
                                    component="img"
                                    image={product.image || "/img/placeholder.png"}
                                    alt={product.name}
                                    sx={{
                                        width:     layout === "list" ? 300 : 200,
                                        height:    layout === "list" ? 300 : 200,
                                        objectFit: "contain",
                                        p: 2,
                                    }}
                                />

                                {product.badge && (
                                    <Chip
                                        label={product.badge} size="small"
                                        sx={{
                                            position: "absolute", top: 10, left: 10,
                                            background: badgeColors[product.badge],
                                            color: "white", fontWeight: 700,
                                            fontSize: "0.68rem", height: 20,
                                        }}
                                    />
                                )}

                                {/* Favorito flotante */}
                                <IconButton
                                    onClick={() => handleToggleFav(product)}
                                    size="small"
                                    sx={{
                                        position: "absolute", top: 8, right: 8,
                                        background: `${COLORS.darkGray}cc`,
                                        backdropFilter: "blur(4px)",
                                        border: `1px solid ${COLORS.border}`,
                                        color: favorites.includes(product.id) ? COLORS.red : COLORS.muted,
                                        "&:hover": { color: COLORS.red, background: `${COLORS.surface}ee` },
                                        transition: "all 0.2s",
                                    }}
                                >
                                    {favorites.includes(product.id)
                                        ? <FavoriteIcon sx={{ fontSize: 16 }} />
                                        : <FavoriteBorderIcon sx={{ fontSize: 16 }} />
                                    }
                                </IconButton>
                            </Box>

                            {/* Contenido */}
                            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                                    <Typography sx={{
                                        color: COLORS.muted, fontSize: "0.7rem",
                                        textTransform: "uppercase", letterSpacing: "1px", mb: 0.5,
                                    }}>
                                        {product.category}
                                    </Typography>
                                    <Typography sx={{
                                        color: COLORS.white, fontWeight: 700,
                                        fontSize: layout === "list" ? "1rem" : "0.92rem",
                                        lineHeight: 1.3,
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                        mb: 1.5,
                                    }}>
                                        {product.name}
                                    </Typography>
                                    <Typography sx={{
                                        fontWeight: 500,
                                        fontSize: layout === "list" ? "1.2rem" : "1.05rem",
                                        color: COLORS.white,
                                    }}>
                                        <Box component="span" sx={{ color: COLORS.accent, mr: "2px", fontWeight: 700, fontSize: "0.8em" }}>$</Box>
                                        {product.price}
                                    </Typography>
                                </CardContent>

                                <CardActions sx={{ px: 10, pb: 2, pt: 0, gap: 1.5 }}>
                                    <Button
                                        fullWidth variant="contained"
                                        startIcon={<ShoppingCartIcon fontSize="small" />}
                                        onClick={() => handleAddToCart(product)}
                                        sx={{
                                            background: `linear-gradient(90deg, ${COLORS.accent}, #005bb5)`,
                                            color: "white", fontWeight: 700, textTransform: "none",
                                            borderRadius: "8px", py: 0.9, fontSize: "0.82rem",
                                            boxShadow: "none",
                                            "&:hover": {
                                                background: `linear-gradient(90deg, ${COLORS.accentHover}, #004a9e)`,
                                                boxShadow: `0 6px 20px ${COLORS.accent}44`,
                                            },
                                        }}
                                    >
                                        Agregar
                                    </Button>
                                </CardActions>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>

        {/* ── Snackbar de confirmación ── */}
        <Snackbar
            open={snack.open}
            autoHideDuration={2500}
            onClose={() => setSnack((s) => ({ ...s, open: false }))}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert
                severity={snack.type}
                onClose={() => setSnack((s) => ({ ...s, open: false }))}
                sx={{
                    background: COLORS.surface, color: COLORS.white,
                    border: `1px solid ${COLORS.border}`,
                    "& .MuiAlert-icon": { color: snack.type === "warning" ? COLORS.gold : COLORS.accent },
                }}
            >
                {snack.msg}
            </Alert>
        </Snackbar>
        </Box>
    );
};