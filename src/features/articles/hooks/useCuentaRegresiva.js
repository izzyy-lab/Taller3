import { useState, useEffect } from "react";

const useCuentaRegresiva = (segundosIniciales) => {
  const [segundos, setSegundos] = useState(segundosIniciales);

  useEffect(() => {
    if (segundos <= 0) return;
    const intervalo = setInterval(() => {
      setSegundos((s) => s - 1);
    }, 1000);
    return () => clearInterval(intervalo);
  }, [segundos]);

  const mm = String(Math.floor(segundos / 60)).padStart(2, "0");
  const ss = String(segundos % 60).padStart(2, "0");
  return `${mm}:${ss}`;
};

export default useCuentaRegresiva;
