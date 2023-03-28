import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoCaretBackOutline } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import Link from "next/link";
import fetch from "isomorphic-unfetch";

const workoutList = () => {
  const [workout, setWorkout] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchWorkout = async () => {
      const res = await fetch(`http://localhost:3000/api/routines/${id}`);
      const newWorkout = await res.json();
      setWorkout(newWorkout);
    };
    fetchWorkout();
  }, [id]);

  if (!workout) {
    return <div>Loading...</div>;
  }

  const { Dias } = workout;

  const toggleDetails = (dia) => {
    if (selectedDay === dia) {
      setSelectedDay(null);
    } else {
      setSelectedDay(dia);
    }
  };

  return (
    <>
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
          Rutina: {workout.Descripcion}
        </h1>
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
          {Dias.map(({ Dia, Rutina, Ejercicios }) => (
            <div key={Dia} className={"bg-white rounded-lg shadow p-6"}>
              <div>
                <h2
                  className={"text-xl font-bold mb-2 text-gray-700 mb-1"}
                  onClick={() => toggleDetails(Dia)}
                >
                  Día: {Dia} ({Rutina})
                </h2>
              </div>
              {selectedDay === Dia && (
                <div className={"mt-4"}>
                  <h3 className={"text-lg font-bold mb-2 text-gray-700"}>
                    Ejercicios:
                  </h3>
                  <ul>
                    {Ejercicios.map(({ Ejercicio, Repeticiones, Series }) => (
                      <li
                        key={Ejercicio}
                        className={"text-gray-700 mb-2"}
                      >{`${Ejercicio} - ${Repeticiones} repeticiones x ${Series} series`}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default workoutList;
