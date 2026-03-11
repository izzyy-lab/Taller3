import { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existente = prev.find(p => p.nombre === producto.nombre);
      if (existente) {
        return prev.map(p =>
          p.nombre === producto.nombre
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const quitarDelCarrito = (nombre) => {
    setCarrito(prev => prev.filter(p => p.nombre !== nombre));
  };

  const cambiarCantidad = (nombre, delta) => {
    setCarrito(prev =>
      prev.map(p =>
        p.nombre === nombre
          ? { ...p, cantidad: Math.max(1, p.cantidad + delta) }
          : p
      )
    );
  };

  const vaciarCarrito = () => setCarrito([]);

  const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);

  const totalPrecio = carrito.reduce((acc, p) => {
    const num = parseInt(p.precio.replace(/\./g, ""), 10) || 0;
    return acc + num * p.cantidad;
  }, 0);

  return (
    <CarritoContext.Provider value={{
      carrito,
      agregarAlCarrito,
      quitarDelCarrito,
      cambiarCantidad,
      vaciarCarrito,
      totalItems,
      totalPrecio
    }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => useContext(CarritoContext);
