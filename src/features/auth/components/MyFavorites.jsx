import {
    Box, Container, Typography, Grid, Card, CardMedia,
    CardContent, CardActions, Button, IconButton, Chip,
} from "@mui/material";
import { Link } from "react-router-dom";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useFavorites, useCart, products } from "../../articles/hooks/FavoriteContext";

const COLORS = {
    black: "#0a0a0a",
    darkGray: "#111111",
    surface: "#242424",
    surfaceHover: "#2e2e2e",
    border: "#2e2e2e",
    white: "#ffffff",
    muted: "#888888",
    accent: "#0070d2",
    accentHover: "#005bb5",
    gold: "#f0a500",
    red: "#e8002d",
};

export const MyFavorites = () => {
    const { favorites, toggleFav } = useFavorites();
    const { addToCart }            = useCart();

    const favProducts = products.filter((p) => favorites.includes(p.id));

    return (
        <Box sx={{ background: COLORS.black, minHeight: "100vh", pb: 10 }}>

            {/* ── Encabezado ── */}
            <Box sx={{
                background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${COLORS.red}18 0%, transparent 70%),
                            linear-gradient(180deg, #1a0a0a 0%, ${COLORS.black} 100%)`,
                pt: { xs: 6, md: 8 }, pb: { xs: 4, md: 6 },
                textAlign: "center",
            }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5, mb: 1 }}>
                    <FavoriteIcon sx={{ color: COLORS.red, fontSize: 28 }} />
                    <Typography sx={{
                        color: COLORS.red, fontWeight: 700, fontSize: "0.78rem",
                        letterSpacing: "2.5px", textTransform: "uppercase",
                    }}>
                        Mi lista
                    </Typography>
                </Box>
                <Typography variant="h3" sx={{
                    fontWeight: 900, color: COLORS.white,
                    fontSize: { xs: "1.8rem", md: "2.6rem" },
                    letterSpacing: "-1px", mb: 1,
                }}>
                    Mis Favoritos
                </Typography>
                <Typography sx={{ color: COLORS.muted, fontSize: "0.95rem" }}>
                    {favProducts.length} producto{favProducts.length !== 1 ? "s" : ""} guardado{favProducts.length !== 1 ? "s" : ""}
                </Typography>
            </Box>

            <Container maxWidth="xl">

                {/* ── Sin favoritos ── */}
                {favProducts.length === 0 && (
                    <Box sx={{ textAlign: "center", py: 14 }}>
                        <Typography sx={{ fontSize: "4rem", mb: 2 }}>🤍</Typography>
                        <Typography sx={{ color: COLORS.white, fontWeight: 700, fontSize: "1.2rem", mb: 1 }}>
                            Aún no tienes favoritos
                        </Typography>
                        <Typography sx={{ color: COLORS.muted, mb: 4 }}>
                            Explora el catálogo y guarda los productos que te gusten
                        </Typography>
                        <Button
                            component={Link} to="/articles"
                            variant="contained"
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                background: `linear-gradient(90deg, ${COLORS.accent}, #005bb5)`,
                                color: "white", fontWeight: 700, textTransform: "none",
                                borderRadius: "10px", px: 3.5, py: 1.2,
                                "&:hover": { background: `linear-gradient(90deg, ${COLORS.accentHover}, #004a9e)` },
                            }}
                        >
                            Ver artículos
                        </Button>
                    </Box>
                )}

                {/* ── Grid de favoritos ── */}
                {favProducts.length > 0 && (
                    <Grid container spacing={2.5}>
                        {favProducts.map((product) => (
                            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                <Card sx={{
                                    height: "100%",
                                    display: "flex", flexDirection: "column",
                                    background: COLORS.surface,
                                    border: `1px solid ${COLORS.border}`,
                                    borderRadius: "16px", overflow: "hidden",
                                    transition: "all 0.25s",
                                    "&:hover": {
                                        transform: "translateY(-5px)",
                                        borderColor: `${COLORS.red}55`,
                                        boxShadow: `0 20px 50px #00000077`,
                                    },
                                }}>
                                    {/* Imagen */}
                                    <Box sx={{
                                        position: "relative",
                                        background: "#ffffff",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        height: 200,
                                    }}>
                                        <CardMedia
                                            component="img"
                                            image={product.image || "/img/placeholder.png"}
                                            alt={product.name}
                                            sx={{ width: 180, height: 180, objectFit: "contain", p: 2 }}
                                        />
                                        {/* Quitar de favoritos */}
                                        <IconButton
                                            onClick={() => toggleFav(product.id)}
                                            size="small"
                                            sx={{
                                                position: "absolute", top: 8, right: 8,
                                                background: `${COLORS.darkGray}cc`,
                                                backdropFilter: "blur(4px)",
                                                border: `1px solid ${COLORS.border}`,
                                                color: COLORS.red,
                                                "&:hover": { background: "#3a0000", borderColor: COLORS.red },
                                                transition: "all 0.2s",
                                            }}
                                        >
                                            <FavoriteIcon sx={{ fontSize: 16 }} />
                                        </IconButton>
                                    </Box>

                                    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                                        <CardContent sx={{ flexGrow: 1, p: 2 }}>
                                            <Typography sx={{
                                                color: COLORS.muted, fontSize: "0.7rem",
                                                textTransform: "uppercase", letterSpacing: "1px", mb: 0.5,
                                            }}>
                                                {product.category}
                                            </Typography>
                                            <Typography sx={{
                                                color: COLORS.white, fontWeight: 700, fontSize: "0.92rem",
                                                lineHeight: 1.3, mb: 1.5,
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                            }}>
                                                {product.name}
                                            </Typography>
                                            <Typography sx={{ fontWeight: 700, fontSize: "1.05rem", color: COLORS.white }}>
                                                <Box component="span" sx={{ color: COLORS.accent, mr: "2px", fontWeight: 700, fontSize: "0.8em" }}>$</Box>
                                                {product.price}
                                            </Typography>
                                        </CardContent>

                                        <CardActions sx={{ px: 2, pb: 2, pt: 0, gap: 1 }}>
                                            <Button
                                                fullWidth variant="contained"
                                                startIcon={<ShoppingCartIcon fontSize="small" />}
                                                onClick={() => addToCart(product.id)}
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
                                                Añadir al carrito
                                            </Button>
                                            <IconButton
                                                onClick={() => toggleFav(product.id)}
                                                size="small"
                                                sx={{
                                                    color: COLORS.muted, border: `1px solid ${COLORS.border}`,
                                                    borderRadius: "8px",
                                                    "&:hover": { color: COLORS.red, borderColor: COLORS.red },
                                                }}
                                            >
                                                <DeleteOutlineIcon fontSize="small" />
                                            </IconButton>
                                        </CardActions>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
};