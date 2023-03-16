import Link from "next/link";
import workouts from "../api/data/ejercicios.json";

export default function Routines() {
  return (
    <div className={"mx-auto max-w-3xl px-4 py-8"}>
      <h1 className="text-2xl font-bold mb-4">Rutinas</h1>
      <ul className="space-y-4">
        {workouts.map(({ ID, Descripcion }) => (
          <li key={ID}>
            <Link href={`/rutinas/${ID}`}>
              <div className="block border border-gray-400 rounded p-4 hover:bg-gray-200">
                <h2 className="text-lg font-bold mb-2">Rutina {ID}</h2>
                <p className="text-gray-700">{Descripcion}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
         <Link className={''} href="/">Volver a la página principal</Link>
    </div>
  );
}
