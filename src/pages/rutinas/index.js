import Link from "next/link";
import workouts from "../api/data/ejercicios.json";
import { IoCaretBackOutline } from "react-icons/io5";
export default function Routines() {
  // Add a return button to the page
  return (
    <>
      <nav className="flex justify-center navbar shadows">
        <Link
          href="/"
          className="flex items-center text-gray-700 hover:text-gray-900 py-10"
        >
          <IoCaretBackOutline className="w-6 h-6 mr-2" />
          <span className="font-bold">Regresar a la página principal</span>
        </Link>
      </nav>

      <div className={"mx-auto max-w-3xl px-4 py-8"}>
        <h1 className="text-2xl font-bold mb-4">Rutinas</h1>
        <ul className="space-y-4">
          {workouts.map(({ ID, Descripcion }) => (
            <li key={ID}>
              <Link href={`/rutinas/${ID}`}>
                <div className="block border border-gray-400 rounded p-4 hover:bg-gray-200">
                  <h2 className="text-lg font-bold mb-2">{Descripcion}</h2>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
