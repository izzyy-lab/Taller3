import { createContext, useContext, useState } from "react";

// Lista de productos centralizada — importada por Articles, MyFavorites y MyBuys
export const products = [
    { id: 1,  name: "Televisor QD OLED 55'",   price: "8.330.241",  image: "/img/televisor2.png",       category: "TV y Teatro en Casa", badge: "Nuevo" },
    { id: 2,  name: "Televisor de 55'",         price: "2.945.078",  image: "/img/televisor.png",        category: "TV y Teatro en Casa", badge: null },
    { id: 3,  name: "Audífonos Sony WH",        price: "2.249.896",  image: "/img/wh100xm5.png",         category: "Audio",               badge: "Más vendido" },
    { id: 4,  name: "Cámara híbrida",           price: "11.569.902", image: "/img/camara1.png",          category: "Camaras",             badge: null },
    { id: 5,  name: "Control Wh PS5",           price: "329.668",    image: "/img/controlPs5.png",       category: "Gaming",              badge: "Oferta" },
    { id: 6,  name: "PS5 Slim Estándar",        price: "2.999.661",  image: "/img/ps5.png",              category: "Gaming",              badge: null },
    { id: 7,  name: "Parlante Portátil",        price: "2.459.000",  image: "/img/parlante.png",         category: "Audio",               badge: null },
    { id: 8,  name: "PS5 Portal Remote",        price: "1.277.909",  image: "/img/Ps5RemotePlayer.png",  category: "Gaming",              badge: null },
    { id: 9,  name: "Parlante Field Ult",       price: "599.940",    image: "/img/parlanteFieldUlt.png", category: "Audio",               badge: "Oferta" },
    { id: 10, name: "Subwoofer Theatre sub 7",  price: "583.199",    image: "/img/teatroencasa.png",     category: "TV y Teatro en Casa", badge: null },
    { id: 11, name: "BRAVIA Theatre System 6",  price: "2.176.427",  image: "/img/teatroencasa2.png",    category: "TV y Teatro en Casa", badge: null },
    { id: 12, name: "Televisor Mini LED 55",    price: "7.819.901",  image: "/img/bravia2.png",          category: "TV",                  badge: "Nuevo" },
    { id: 13, name: "Cámara ZV-1",              price: "3.089.900",  image: "/img/camara3.png",          category: "Camaras",             badge: null },
    { id: 14, name: "Lente FE de 28-70",        price: "11.979.900", image: "/img/lente1.png",           category: "Camaras",             badge: null },
    { id: 15, name: "Combo Victoria Inzone",    price: "1.236.151",  image: "/img/combo1.png",           category: "Gaming",              badge: null },
];

// ── Favorites Context ──────────────────────────────────────
const FavoritesContext = createContext();

// ── Cart Context ───────────────────────────────────────────
const CartContext = createContext();

// ── Provider combinado ─────────────────────────────────────
export const FavoritesProvider = ({ children }) => {
    // Favoritos: array de ids
    const [favorites, setFavorites] = useState([]);

    const toggleFav = (id) =>
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
        );

    // Carrito: array de { id, quantity }
    const [cart, setCart] = useState([]);

    const addToCart = (id) =>
        setCart((prev) => {
            const exists = prev.find((item) => item.id === id);
            if (exists) {
                return prev.map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { id, quantity: 1 }];
        });

    const removeFromCart = (id) =>
        setCart((prev) => prev.filter((item) => item.id !== id));

    const updateQuantity = (id, quantity) => {
        if (quantity <= 0) return removeFromCart(id);
        setCart((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const clearCart = () => setCart([]);

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFav }}>
            <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount }}>
                {children}
            </CartContext.Provider>
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);
export const useCart     = () => useContext(CartContext);