import { useEffect, useState } from "react";
import fetch from "isomorphic-unfetch";
import Link from "next/link";

function Routines() {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const getRutinas = async () => {
      const res = await fetch("http://localhost:8000/rutinas/");
      const data = await res.json();
      console.log("Rutinas:");
      console.log(data.results);
      setRoutines(data.results);
    };

    getRutinas();
  }, []);

  const getRutinaDias = (rutinaId) => {
    const rutina = routines.find((r) => r.id === rutinaId);
    return rutina.dias;
  };
  return (
    <div>
      <h1>Rutinas: </h1>
      <ul>
        {routines.map((routine) => (
          <li key={routine.id}>
            <Link href={`/rutinasfetch/${routine.id}`}>
              <h2>{routine.nombre}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Routines;
