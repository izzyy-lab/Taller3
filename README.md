# 🎮 SonyStore — Tienda de Productos Sony

> Proyecto académico de e-commerce desarrollado con React, MUI y React Router DOM.  
> Estructura Feature-Based | Material UI v6 | React 18 | Context API | React Router DOM

---

## 🚀 Características principales

✔ Arquitectura Feature-Based escalable  
✔ Catálogo de productos con búsqueda y filtros por categoría  
✔ Vista en cuadrícula y lista (toggle)  
✔ Carrito de compras con manejo de cantidad y resumen de pedido  
✔ Sistema de favoritos con contador en tiempo real en el Header  
✔ Autenticación simulada: Login, Registro y Perfil de usuario  
✔ Validaciones de formulario en tiempo real  
✔ Diseño responsivo con menú hamburguesa en mobile  
✔ Paleta de colores oscura inspirada en la identidad visual de Sony  
✔ Navegación con React Router DOM  
✔ Estado global compartido con Context API  

---

## 📦 Estructura del Proyecto (Feature-Based)

```
TALLERMUI/
├── node_modules/
├── public/                        # Archivos estáticos (imágenes, logo)
│   └── img/
│       └── logo-sony.png
│
├── src/
│   ├── features/
│   │   ├── articles/
│   │   │   ├── components/
│   │   │   │   ├── Articles.jsx   # Catálogo con búsqueda, filtros y toggle de vista
│   │   │   │   └── Offers.jsx     # Sección de ofertas
│   │   │   ├── hooks/
│   │   │   │   └── FavoriteContext.jsx  # Context combinado: Favoritos + Carrito + productos[]
│   │   │   └── pages/
│   │   │
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── MyAccount.jsx  # Login / Registro / Perfil de usuario
│   │   │   │   ├── MyBuys.jsx     # Carrito de compras con resumen y totales
│   │   │   │   └── MyFavorites.jsx # Lista de productos guardados como favoritos
│   │   │   ├── hooks/
│   │   │   └── pages/
│   │   │
│   │   └── layout/
│   │       ├── components/
│   │       │   ├── Content.jsx    # Página de inicio (Hero, Categorías, Productos destacados)
│   │       │   ├── Footer.jsx     # Footer con columnas de navegación
│   │       │   └── Header.jsx     # Navbar responsive con badges dinámicos
│   │       ├── hooks/
│   │       └── pages/
│   │
│   ├── shared/
│   │   └── styles/                # Estilos globales compartidos
│   │
│   ├── App.jsx                    # Componente raíz con rutas y FavoritesProvider
│   └── main.jsx                   # Punto de entrada de la aplicación
│
├── .eslintrc.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

---

## 🗺️ Rutas de la aplicación

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `Content` | Página de inicio |
| `/articles` | `Articles` | Catálogo completo de productos |
| `/offers` | `Offers` | Productos en oferta |
| `/myaccount` | `MyAccount` | Login, registro y perfil |
| `/myfavorites` | `MyFavorites` | Lista de favoritos del usuario |
| `/mybuys` | `MyBuys` | Carrito de compras |

---

## 🧠 Estado global — Context API

El proyecto usa un **Context combinado** (`FavoriteContext.jsx`) que centraliza:

### `useFavorites()`
```js
const { favorites, toggleFav } = useFavorites();
```
| Valor | Tipo | Descripción |
|---|---|---|
| `favorites` | `number[]` | IDs de productos marcados como favoritos |
| `toggleFav(id)` | `function` | Agrega o quita un producto de favoritos |

### `useCart()`
```js
const { cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount } = useCart();
```
| Valor | Tipo | Descripción |
|---|---|---|
| `cart` | `{ id, quantity }[]` | Items actuales en el carrito |
| `addToCart(id)` | `function` | Agrega producto o incrementa cantidad |
| `removeFromCart(id)` | `function` | Elimina un producto del carrito |
| `updateQuantity(id, qty)` | `function` | Actualiza la cantidad de un producto |
| `clearCart()` | `function` | Vacía el carrito completo |
| `cartCount` | `number` | Total de unidades en el carrito |

### `products`
```js
import { products } from "../hooks/FavoriteContext";
```
Array de productos centralizado — compartido entre `Articles`, `MyFavorites` y `MyBuys`.

---

## 🛒 Carrito de Compras (`MyBuys`)

- Lista de productos con imagen, nombre, categoría y precio
- Controles `+` / `−` para modificar la cantidad de cada item
- Eliminar producto individual o vaciar el carrito completo
- Resumen lateral con subtotal, envío (gratis) y total calculado
- Panel sticky en desktop para que el resumen sea siempre visible
- Estado vacío con link de regreso al catálogo

---

## ❤️ Favoritos (`MyFavorites`)

- Muestra los productos marcados con el corazón desde el catálogo
- Botón para añadir directamente al carrito desde favoritos
- Botón para quitar de favoritos (icono de papelera o corazón)
- Estado vacío con call-to-action al catálogo
- El contador de favoritos se refleja en tiempo real en el ícono ❤️ del Header

---

## 🔐 Mi Cuenta (`MyAccount`)

El componente maneja tres estados internos:

### Sin sesión → Tabs con Login y Registro

**Login**
- Campos: Correo electrónico, Contraseña
- Validación de formato de email y longitud de contraseña
- Spinner de carga que simula llamada a API

**Registro**
- Campos: Nombre, Apellido, Correo, Teléfono, Contraseña, Confirmar contraseña
- Barra de fuerza de contraseña (5 niveles: Muy débil → Muy fuerte)
- Indicadores visuales de requisitos en tiempo real:
  - ✅ Mínimo 8 caracteres
  - ✅ Al menos una mayúscula
  - ✅ Al menos un número
  - ✅ Un carácter especial

### Con sesión → Vista de perfil

- Avatar con iniciales generadas automáticamente
- Edición de datos personales con validaciones
- Cambio de contraseña con barra de fuerza y requisitos visuales
- Toggle de visibilidad en campos de contraseña
- Botón **Cerrar sesión** que regresa al login

---

## 📋 Validaciones implementadas

| Campo | Regla |
|---|---|
| Nombre / Apellido | Obligatorio, mín. 2 caracteres, solo letras |
| Correo | Formato válido `usuario@dominio.com` |
| Teléfono | Formato numérico internacional `+57 300...` |
| Contraseña (login) | Obligatoria, mín. 8 caracteres |
| Contraseña (registro) | Mín. 8 chars + mayúscula + número + carácter especial |
| Confirmar contraseña | Debe coincidir exactamente con la nueva contraseña |

---

## 🎨 Diseño e Interfaz

### Paleta de colores Sony

```js
const COLORS = {
  black:       "#0a0a0a",   // Fondo principal
  darkGray:    "#111111",   // Fondo secundario (footer, secciones)
  surface:     "#242424",   // Tarjetas y contenedores
  border:      "#2e2e2e",   // Bordes sutiles
  white:       "#ffffff",   // Texto principal
  muted:       "#888888",   // Texto secundario
  accent:      "#0070d2",   // Azul Sony — color primario
  accentHover: "#005bb5",   // Azul Sony al hacer hover
  gold:        "#f0a500",   // Badges "Más vendido"
  red:         "#e8002d",   // Favoritos, badges "Oferta", alertas
  green:       "#00c853",   // Confirmaciones y validaciones OK
};
```

### Componentes destacados

- **Header**: `AppBar` sticky con nav desktop + `Drawer` mobile, badges dinámicos en ❤️ y 🛒
- **Cards de producto**: imagen con fondo blanco, badge flotante, corazón interactivo, hover con elevación
- **Barra de búsqueda**: filtro en tiempo real combinado con chips de categoría
- **Toggle grid/lista**: cambia el layout del catálogo sin recargar
- **Snackbar**: confirmación visual al agregar al carrito o cambiar favoritos

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| React | 18 | Librería principal de UI |
| React Router DOM | v6 | Navegación entre páginas |
| Material UI (MUI) | v6 | Componentes y sistema de diseño |
| MUI Icons | v6 | Iconografía |
| Context API | — | Estado global (carrito + favoritos) |
| Vite | — | Bundler y servidor de desarrollo |

---

## ⚙️ Instalación y uso

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/sony-store.git

# Instalar dependencias
cd sony-store
npm install

# Iniciar servidor de desarrollo
npm run dev
```

---

## 📌 Consideraciones técnicas

- Las imágenes de productos deben estar en `public/img/` y coincidir con las rutas definidas en el array `products` de `FavoriteContext.jsx`.
- El logo del header se lee desde `public/img/logo-sony.png`. Si no existe, se muestra el ícono "S" por defecto.
- El login y registro son simulados (sin backend). Cualquier email válido con contraseña ≥ 8 caracteres permite el acceso.
- Para conectar con un backend real, reemplaza los `await new Promise(...)` en `MyAccount.jsx` por llamadas `fetch` o `axios`.

---

## 🎯 Objetivo educativo

Este proyecto tiene como finalidad:

- Comprender la **arquitectura Feature-Based** en proyectos React reales
- Manejar **estado global** con Context API (`createContext`, `useContext`, `useState`)
- Implementar **rutas dinámicas** con React Router DOM v6
- Consumir y compartir datos entre componentes distantes (Header ↔ Articles ↔ MyFavorites)
- Construir **formularios con validaciones** controladas en React
- Diseñar interfaces responsivas con **Material UI v6**
- Organizar código de forma **escalable y mantenible**

---

## 👨‍💻 Autor

**Felipe Echeverri David**  
Proyecto académico — Desarrollo de aplicaciones con React  
2026
