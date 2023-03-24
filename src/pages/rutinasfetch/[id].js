import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function RutinaDetalle() {
  const router = useRouter();
  const { id } = router.query;
  const [rutina, setRutina] = useState(null);
  const [dias, setDias] = useState(null);

  useEffect(() => {
    async function fetchRutina() {
      const res = await fetch(`http://localhost:8000/rutinas/${id}/`);
      const data = await res.json();
      setRutina(data);
      console.log(data);
    }

    async function fetchDias() {
      const res = await fetch(`http://localhost:8000/dias/`);
      const data = await res.json();
      setDias(data);
      console.log(data);
    }
    if (id) {
      fetchRutina();
      fetchDias();
    }
  }, [id]);

  if (!rutina) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{rutina.nombre}</h1>
      {rutina.dias.map((dia) => (
        <div key={dia.id}>
          <h2>
            {dia.dia} - {dia.enfoque}
          </h2>
          <ul>
            {dia.ejercicios.map((ejercicio) => (
              <li key={ejercicio.id}>
                <h3>{ejercicio.nombre}</h3>
                <p>Series: {ejercicio.series}</p>
                <p>Repeticiones: {ejercicio.repeticiones}</p>
                <p>Cadencia: {ejercicio.cadencia}</p>
                {ejercicio.notas && <p>Notas: {ejercicio.notas}</p>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
