import {
    Box, Container, Typography, Grid, Card, CardMedia,
    CardContent, Button, IconButton, Divider, Chip,
} from "@mui/material";
import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useCart, products } from "../../articles/hooks/FavoriteContext";

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

// Convierte "1.999.000" → 1999000 para cálculos
const parsePrice = (str) => parseInt(str.replace(/\./g, ""), 10);

// Formatea número → "1.999.000"
const formatPrice = (num) =>
    num.toLocaleString("es-CO", { minimumFractionDigits: 0 });

export const MyBuys = () => {
    const { cart, removeFromCart, updateQuantity, clearCart, cartCount } = useCart();

    const cartProducts = cart.map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.id),
    }));

    const subtotal = cartProducts.reduce((acc, { product, quantity }) => {
        return acc + parsePrice(product.price) * quantity;
    }, 0);

    const shipping = cartCount > 0 ? 0 : 0; // envío gratis
    const total    = subtotal + shipping;

    return (
        <Box sx={{ background: COLORS.black, minHeight: "100vh", pb: 10 }}>

            {/* ── Encabezado ── */}
            <Box sx={{
                background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${COLORS.accent}18 0%, transparent 70%),
                            linear-gradient(180deg, #0a0f1e 0%, ${COLORS.black} 100%)`,
                pt: { xs: 6, md: 8 }, pb: { xs: 4, md: 6 },
                textAlign: "center",
            }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5, mb: 1 }}>
                    <ShoppingCartIcon sx={{ color: COLORS.accent, fontSize: 26 }} />
                    <Typography sx={{
                        color: COLORS.accent, fontWeight: 700, fontSize: "0.78rem",
                        letterSpacing: "2.5px", textTransform: "uppercase",
                    }}>
                        Carrito
                    </Typography>
                </Box>
                <Typography variant="h3" sx={{
                    fontWeight: 900, color: COLORS.white,
                    fontSize: { xs: "1.8rem", md: "2.6rem" },
                    letterSpacing: "-1px", mb: 1,
                }}>
                    Mi Carrito
                </Typography>
                <Typography sx={{ color: COLORS.muted, fontSize: "0.95rem" }}>
                    {cartCount} producto{cartCount !== 1 ? "s" : ""} en tu carrito
                </Typography>
            </Box>

            <Container maxWidth="lg">

                {/* ── Carrito vacío ── */}
                {cartCount === 0 && (
                    <Box sx={{ textAlign: "center", py: 14 }}>
                        <Typography sx={{ fontSize: "4rem", mb: 2 }}>🛒</Typography>
                        <Typography sx={{ color: COLORS.white, fontWeight: 700, fontSize: "1.2rem", mb: 1 }}>
                            Tu carrito está vacío
                        </Typography>
                        <Typography sx={{ color: COLORS.muted, mb: 4 }}>
                            Agrega productos desde el catálogo
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

                {/* ── Layout carrito + resumen ── */}
                {cartCount > 0 && (
                    <Grid container spacing={3}>

                        {/* ── Lista de productos ── */}
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Box sx={{
                                display: "flex", justifyContent: "space-between",
                                alignItems: "center", mb: 2,
                            }}>
                                <Typography sx={{ color: COLORS.white, fontWeight: 700, fontSize: "1rem" }}>
                                    Productos ({cartCount})
                                </Typography>
                                <Button
                                    onClick={clearCart}
                                    size="small"
                                    startIcon={<DeleteOutlineIcon fontSize="small" />}
                                    sx={{
                                        color: COLORS.muted, textTransform: "none", fontSize: "0.8rem",
                                        "&:hover": { color: COLORS.red },
                                    }}
                                >
                                    Vaciar carrito
                                </Button>
                            </Box>

                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                {cartProducts.map(({ product, quantity }) => (
                                    <Card key={product.id} sx={{
                                        display: "flex", flexDirection: "row",
                                        background: COLORS.surface,
                                        border: `1px solid ${COLORS.border}`,
                                        borderRadius: "14px", overflow: "hidden",
                                        transition: "border-color 0.2s",
                                        "&:hover": { borderColor: `${COLORS.accent}55` },
                                    }}>
                                        {/* Imagen */}
                                        <Box sx={{
                                            background: "#ffffff",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            flexShrink: 0, width: { xs: 100, sm: 130 },
                                        }}>
                                            <CardMedia
                                                component="img"
                                                image={product.image || "/img/placeholder.png"}
                                                alt={product.name}
                                                sx={{ width: 90, height: 90, objectFit: "contain", p: 1 }}
                                            />
                                        </Box>

                                        {/* Info */}
                                        <CardContent sx={{
                                            flexGrow: 1, p: 2,
                                            display: "flex", flexDirection: "column", justifyContent: "space-between",
                                        }}>
                                            <Box>
                                                <Typography sx={{
                                                    color: COLORS.muted, fontSize: "0.68rem",
                                                    textTransform: "uppercase", letterSpacing: "1px", mb: 0.3,
                                                }}>
                                                    {product.category}
                                                </Typography>
                                                <Typography sx={{
                                                    color: COLORS.white, fontWeight: 700, fontSize: "0.9rem", mb: 1,
                                                }}>
                                                    {product.name}
                                                </Typography>
                                                <Typography sx={{ color: COLORS.white, fontWeight: 800, fontSize: "1rem" }}>
                                                    <Box component="span" sx={{ color: COLORS.accent, fontWeight: 700, fontSize: "0.8em", mr: "2px" }}>$</Box>
                                                    {formatPrice(parsePrice(product.price) * quantity)}
                                                </Typography>
                                                {quantity > 1 && (
                                                    <Typography sx={{ color: COLORS.muted, fontSize: "0.75rem" }}>
                                                        ${product.price} c/u
                                                    </Typography>
                                                )}
                                            </Box>

                                            {/* Controles cantidad */}
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1.5 }}>
                                                <Box sx={{
                                                    display: "flex", alignItems: "center", gap: 0.5,
                                                    background: COLORS.surfaceHover,
                                                    borderRadius: "8px", border: `1px solid ${COLORS.border}`,
                                                    px: 0.5,
                                                }}>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => updateQuantity(product.id, quantity - 1)}
                                                        sx={{ color: COLORS.muted, "&:hover": { color: COLORS.white } }}
                                                    >
                                                        <RemoveIcon sx={{ fontSize: 16 }} />
                                                    </IconButton>
                                                    <Typography sx={{
                                                        color: COLORS.white, fontWeight: 700,
                                                        fontSize: "0.9rem", minWidth: 24, textAlign: "center",
                                                    }}>
                                                        {quantity}
                                                    </Typography>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => updateQuantity(product.id, quantity + 1)}
                                                        sx={{ color: COLORS.muted, "&:hover": { color: COLORS.white } }}
                                                    >
                                                        <AddIcon sx={{ fontSize: 16 }} />
                                                    </IconButton>
                                                </Box>

                                                <IconButton
                                                    size="small"
                                                    onClick={() => removeFromCart(product.id)}
                                                    sx={{
                                                        color: COLORS.muted, border: `1px solid ${COLORS.border}`,
                                                        borderRadius: "8px",
                                                        "&:hover": { color: COLORS.red, borderColor: COLORS.red },
                                                    }}
                                                >
                                                    <DeleteOutlineIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        </Grid>

                        {/* ── Resumen del pedido ── */}
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Box sx={{
                                background: COLORS.surface,
                                border: `1px solid ${COLORS.border}`,
                                borderRadius: "16px", p: 3,
                                position: { md: "sticky" }, top: { md: 90 },
                            }}>
                                <Typography sx={{ color: COLORS.white, fontWeight: 800, fontSize: "1rem", mb: 2.5 }}>
                                    Resumen del pedido
                                </Typography>

                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
                                    <Typography sx={{ color: COLORS.muted, fontSize: "0.88rem" }}>
                                        Subtotal ({cartCount} items)
                                    </Typography>
                                    <Typography sx={{ color: COLORS.white, fontWeight: 600, fontSize: "0.88rem" }}>
                                        ${formatPrice(subtotal)}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                    <Typography sx={{ color: COLORS.muted, fontSize: "0.88rem" }}>Envío</Typography>
                                    <Chip
                                        label="Gratis"
                                        size="small"
                                        sx={{
                                            background: `${COLORS.accent}22`, color: COLORS.accent,
                                            fontWeight: 700, fontSize: "0.7rem", height: 20,
                                            border: `1px solid ${COLORS.accent}44`,
                                        }}
                                    />
                                </Box>

                                <Divider sx={{ borderColor: COLORS.border, mb: 2 }} />

                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                                    <Typography sx={{ color: COLORS.white, fontWeight: 800, fontSize: "1rem" }}>
                                        Total
                                    </Typography>
                                    <Typography sx={{ color: COLORS.white, fontWeight: 900, fontSize: "1.15rem" }}>
                                        <Box component="span" sx={{ color: COLORS.accent, fontWeight: 700, fontSize: "0.8em", mr: "2px" }}>$</Box>
                                        {formatPrice(total)}
                                    </Typography>
                                </Box>

                                <Button
                                    fullWidth variant="contained"
                                    size="large"
                                    sx={{
                                        background: `linear-gradient(90deg, ${COLORS.accent}, #005bb5)`,
                                        color: "white", fontWeight: 700, textTransform: "none",
                                        borderRadius: "10px", py: 1.3, fontSize: "0.95rem",
                                        boxShadow: `0 8px 24px ${COLORS.accent}44`,
                                        "&:hover": {
                                            background: `linear-gradient(90deg, ${COLORS.accentHover}, #004a9e)`,
                                            transform: "translateY(-1px)",
                                        },
                                        transition: "all 0.2s",
                                    }}
                                >
                                    Proceder al pago
                                </Button>

                                <Button
                                    fullWidth component={Link} to="/articles"
                                    sx={{
                                        mt: 1.5, color: COLORS.muted, textTransform: "none",
                                        fontSize: "0.82rem",
                                        "&:hover": { color: COLORS.white },
                                    }}
                                >
                                    ← Seguir comprando
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </Box>
    );
};