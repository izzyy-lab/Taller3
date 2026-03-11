import { useState } from "react";
import {
    AppBar, Toolbar, Typography, Button, IconButton, Box, Badge,
    Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider,
    useMediaQuery, useTheme,
} from "@mui/material";
import { NavLink } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { useFavorites, useCart } from "../../articles/hooks/FavoriteContext";

// Logo desde la carpeta public — no necesita import
const LOGO_IMG = "/img/logo-sony.png";

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

// Solo los links centrales del nav desktop
const navItems = [
    { label: "Inicio",    path: "/",         icon: <HomeIcon fontSize="small" /> },
    { label: "Artículos", path: "/articles", icon: <StorefrontIcon fontSize="small" /> },
    { label: "Ofertas",   path: "/offers",   icon: <LocalOfferIcon fontSize="small" /> },
];

// Array completo para el Drawer mobile
const allNavItems = [
    { label: "Inicio",    path: "/",            icon: <HomeIcon fontSize="small" /> },
    { label: "Artículos", path: "/articles",    icon: <StorefrontIcon fontSize="small" /> },
    { label: "Ofertas",   path: "/offers",      icon: <LocalOfferIcon fontSize="small" /> },
    { label: "Mi Cuenta", path: "/myaccount",   icon: <PersonIcon fontSize="small" /> },
    { label: "Favoritos", path: "/myfavorites", icon: <FavoriteIcon fontSize="small" /> },
];

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const { favorites } = useFavorites();
    const { cartCount } = useCart();

    return (
        <>
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
            background: `linear-gradient(90deg, ${COLORS.black} 0%, #0a0f1e 100%)`,
            borderBottom: `1px solid ${COLORS.border}`,
            backdropFilter: "blur(12px)",
            }}
        >
            <Toolbar sx={{ px: { xs: 2, md: 4 }, minHeight: { xs: 60, md: 68 } }}>

            {/* ── Logo ── */}
            <Box
                    component={NavLink}
                    to="/"
                    sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    width: 10000,
                    height: 1,
                    flexGrow: 1,
                    textDecoration: "none",
                    }}
                >
                    {LOGO_IMG ? (
                    <Box
                        component="img"
                        src={LOGO_IMG}
                        alt="SonyStore logo"
                        sx={{
                        height: { xs: 32, md: 38 },
                        width: 100,
                        objectFit: "contain",
                        }}
                    />
                ) : (
                <>
                    <Box
                    sx={{
                        width: 36, height: 36,
                        background: `linear-gradient(135deg, ${COLORS.accent}, #00aaff)`,
                        borderRadius: "8px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 900, fontSize: 14, color: "white",
                        letterSpacing: "-0.5px",
                        boxShadow: `0 0 16px ${COLORS.accent}55`,
                        flexShrink: 0,
                    }}
                    >
                    S
                    </Box>
                    <Typography
                    sx={{
                        fontWeight: 800,
                        fontSize: { xs: "1rem", md: "1.15rem" },
                        letterSpacing: "-0.5px",
                        color: COLORS.white,
                        "& span": { color: COLORS.accent },
                    }}
                    >
                    Sony<span>Store</span>
                    </Typography>
                </>
                )}
            </Box>

            {/* ── Nav desktop ── */}
            {!isMobile && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>

                {navItems.map((item) => (
                    <Button
                    key={item.label}
                    component={NavLink}
                    to={item.path}
                    startIcon={item.icon}
                    sx={{
                        textTransform: "none",
                        color: COLORS.muted,
                        fontWeight: 500,
                        fontSize: "0.85rem",
                        px: 5,
                        py: 0.8,
                        borderRadius: "8px",
                        transition: "all 0.2s",
                        "&:hover": { color: COLORS.white, background: COLORS.surface },
                        "&.active": {
                        color: COLORS.white,
                        background: `${COLORS.accent}22`,
                        "& .MuiButton-startIcon": { color: COLORS.accent },
                        },
                    }}
                    >
                    {item.label}
                    </Button>
                ))}

                <Box sx={{ width: 1, height: 28, background: COLORS.border, mx: 1 }} />

                {/* ── Icono Favoritos con badge ── */}
                <IconButton
                    component={NavLink}
                    to="/myfavorites"
                    sx={{
                    color: favorites.length > 0 ? COLORS.red : COLORS.muted,
                    "&:hover": { color: COLORS.red },
                    "&.active": { color: COLORS.red },
                    transition: "color 0.2s",
                    }}
                >
                    <Badge
                    badgeContent={favorites.length}
                    sx={{
                        "& .MuiBadge-badge": {
                        background: COLORS.red,
                        color: "white",
                        fontWeight: 700,
                        fontSize: "0.65rem",
                        minWidth: 16,
                        height: 16,
                        padding: "0 4px",
                        },
                    }}
                    >
                    <FavoriteIcon fontSize="small" />
                    </Badge>
                </IconButton>

                <IconButton
                    component={NavLink}
                    to="/MyBuys"
                    sx={{
                    color: COLORS.muted,
                    "&:hover": { color: COLORS.accent },
                    "&.active": { color: COLORS.accent },
                    }}
                >
                    <Badge badgeContent={cartCount} color="error">
                    <ShoppingCartIcon fontSize="small" />
                    </Badge>
                </IconButton>

                {/* Botón Mi Cuenta */}
                <Button
                    component={NavLink}
                    to="/myaccount"
                    variant="outlined"
                    startIcon={<PersonIcon fontSize="small" />}
                    sx={{
                    ml: 1, textTransform: "none", color: COLORS.white,
                    borderColor: COLORS.border, fontWeight: 600, fontSize: "0.8rem",
                    borderRadius: "8px", px: 5,
                    "&:hover": { borderColor: COLORS.accent, color: COLORS.accent, background: `${COLORS.accent}11` },
                    "&.active": { borderColor: COLORS.accent, color: COLORS.accent },
                    }}
                >
                    MiCuenta
                </Button>
                </Box>
            )}

            {/* ── Mobile: carrito + hamburguesa ── */}
            {isMobile && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <IconButton
                    component={NavLink}
                    to="/MyBuys"
                    sx={{ color: COLORS.muted, "&.active": { color: COLORS.accent } }}
                >
                    <Badge badgeContent={cartCount} color="error">
                    <ShoppingCartIcon fontSize="small" />
                    </Badge>
                </IconButton>
                <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: COLORS.white }}>
                    <MenuIcon />
                </IconButton>
                </Box>
            )}
            </Toolbar>
        </AppBar>

        {/* ── Drawer mobile ── */}
        <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{
            sx: {
                width: 280,
                background: COLORS.darkGray,
                borderLeft: `1px solid ${COLORS.border}`,
            },
            }}
        >
            <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {LOGO_IMG ? (
                <Box
                component="img"
                src={LOGO_IMG}
                alt="SonyStore logo"
                sx={{ height: 28, width: "auto", objectFit: "contain" }}
                />
            ) : (
                <Typography sx={{ color: COLORS.white, fontWeight: 700 }}>SonyStore</Typography>
            )}
            <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: COLORS.muted }}>
                <CloseIcon />
            </IconButton>
            </Box>

            <Divider sx={{ borderColor: COLORS.border }} />

            <List sx={{ pt: 1 }}>
            {allNavItems.map((item) => (
                <ListItem key={item.label} disablePadding>
                <ListItemButton
                    component={NavLink}
                    to={item.path}
                    onClick={() => setDrawerOpen(false)}
                    sx={{
                    px: 3, py: 1.2,
                    color: COLORS.muted,
                    "&.active": { color: COLORS.accent, background: `${COLORS.accent}11` },
                    "&:hover": { color: COLORS.white, background: COLORS.surface },
                    }}
                >
                    <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>
                    {/* Badge en favoritos dentro del drawer */}
                    {item.label === "Favoritos" ? (
                        <Badge
                        badgeContent={favorites.length}
                        sx={{
                            "& .MuiBadge-badge": {
                            background: COLORS.red,
                            color: "white",
                            fontWeight: 700,
                            fontSize: "0.6rem",
                            minWidth: 15,
                            height: 15,
                            padding: "0 3px",
                            },
                        }}
                        >
                        {item.icon}
                        </Badge>
                    ) : (
                        item.icon
                    )}
                    </ListItemIcon>
                    <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 500 }}
                    />
                </ListItemButton>
                </ListItem>
            ))}
            </List>

            <Divider sx={{ borderColor: COLORS.border, mt: "auto" }} />
            <Box sx={{ p: 2 }}>
            <Button
                component={NavLink}
                to="/MyBuys"
                fullWidth
                variant="contained"
                startIcon={<ShoppingCartIcon fontSize="small" />}
                onClick={() => setDrawerOpen(false)}
                sx={{
                background: `linear-gradient(90deg, ${COLORS.accent}, #005bb5)`,
                color: "white", fontWeight: 700, textTransform: "none",
                borderRadius: "8px", py: 1,
                }}
            >
            Ver carrito ({cartCount})
            </Button>
            </Box>
        </Drawer>
        </>
    );
};

export default Header;