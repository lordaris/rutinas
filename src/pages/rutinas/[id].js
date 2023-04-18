import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoCaretBackOutline } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";

export default function Routine() {
  const [routine, setRoutine] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchRoutine() {
      const res = await fetch(
        `https://lordaris.pythonanywhere.com/rutinas/${id}`
      );
      const data = await res.json();
      console.log(data);
      setRoutine(data);
    }

    if (id) {
      fetchRoutine();
    }
  }, [id]);

  useEffect(() => {
    if (routine.id === 46 || routine.id === 47) {
      document.body.classList.add("honey");
    } else {
      document.body.classList.remove("honey");
    }
  }, [routine]);

  const toggleDetails = (dia) => {
    if (selectedDay === dia) {
      setSelectedDay(null);
    } else {
      setSelectedDay(dia);
    }
  };
  return (
    <div>
      <nav className="flex justify-center navbar shadows">
        <Link
          href="/rutinas"
          className="flex items-center text-gray-700 hover:text-gray-900 py-10"
        >
          <IoCaretBackOutline className="w-6 h-6 mr-2" />
          <span className="font-bold">Regresar</span>
        </Link>
        <Link
          href={"/"}
          className="flex items-center text-gray-700 px-10 hover:text-gray-900 py-10"
        >
          <AiFillHome className="w-6 h-6 mr-2" />
        </Link>
      </nav>
      <div className={"container mx-auto my-10"}>
        <h1 className={"text-3xl font-bold mb-6 text-center"}>
          Rutina: {routine.nombre}
        </h1>
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
          {routine.dias &&
            routine.dias.map((dia) => (
              <div
                key={dia.id}
                className={
                  " rounded-lg shadow p-6" +
                  // Arreglar la condición para hacer que sea posible cambiar el estilo de la página
                  (routine.id === 46 || routine.id === 47
                    ? " bg-amber-300 bg-opacity-30"
                    : " bg-white")
                }
              >
                <div>
                  <h2
                    className={"text-xl font-bold mb-2 text-gray-700 mb-1"}
                    onClick={() => toggleDetails(dia)}
                  >
                    Día: {dia.dia} ({dia.enfoque})
                  </h2>
                </div>
                {selectedDay === dia && (
                  <ul>
                    {dia.ejercicios &&
                      dia.ejercicios.map((ejercicio) => (
                        <li key={ejercicio.id} className={"mb-4"}>
                          <h4 className={"font-medium"}>
                            Ejercicio: {ejercicio.nombre}
                          </h4>
                          <p className={"text-gray-700 mb-1"}>
                            Series: {ejercicio.series}
                          </p>
                          <p className={"text-gray-700 mb-1"}>
                            Repeticiones: {ejercicio.repeticiones}
                          </p>
                          {ejercicio.cadencia &&
                            ejercicio.cadencia.trim() !== "" && (
                              <p className={"text-gray-700 mb-1"}>
                                Cadencia: {ejercicio.cadencia}
                              </p>
                            )}
                          {ejercicio.notas && ejercicio.notas.trim() !== "" && (
                            <p className={"text-gray-700 mb-1"}>
                              Notas: {ejercicio.notas}
                            </p>
                          )}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
