import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoCaretBackOutline } from "react-icons/io5";

export default function Rutinas() {
  const [rutina, setRutina] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  async function fetchWorkout(page) {
    const res = await fetch(
      `https://lordaris.pythonanywhere.com/rutinas/?page=${page}`
    );
    const data = await res.json();
    setRutina(data.results);
    console.log(data.results);
  }

  useEffect(() => {
    fetchWorkout(currentPage);
  }, [currentPage]);

  function handleNextPage() {
    setCurrentPage(currentPage + 1);
  }

  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <div>
      <nav className="flex justify-center navbar shadows ">
        <Link
          href="/"
          className="flex items-center text-gray-700 hover:text-gray-900 py-10"
        >
          <IoCaretBackOutline className="w-6 h-6 mr-2" />
          <span className="font-bold">Regresar a la página principal</span>
        </Link>
      </nav>
      <div className={"mx-auto max-w-3xl px-4 py-8"}>
        <h1 className={"text-2xl font-bold mb-4"}>Rutinas</h1>
        <ul className={"space-y-4"}>
          {rutina.map((routine) => (
            <li key={routine.id}>
              <Link href={`/rutinasocultas/${routine.id}`}>
                <div className="block border border-gray-400 rounded p-4 hover:bg-gray-200">
                  <h2 className="text-lg font-bold mb-2">{routine.nombre}</h2>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 mr-2"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            onClick={handleNextPage}
            disabled={rutina.length < 10}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
