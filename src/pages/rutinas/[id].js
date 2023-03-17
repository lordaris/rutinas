import { useRouter } from "next/router";
import { useState } from "react";
import { IoCaretBackOutline } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import workouts from "../api/data/ejercicios.json";
import Link from "next/link";
const WorkoutPage = ({ workout }) => {
  const router = useRouter();
  // This is the fallback case, where the page is being rendered
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { Dias } = workout;

  const [selectedDay, setSelectedDay] = useState(null);
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
                <ul>
                  {Ejercicios.map(
                    ({ Ejercicio, Series, Repeticiones, Cadencia, Notas }) => (
                      <li key={Ejercicio} className={"mb-4"}>
                        <h4 className={"font-medium"}>
                          Ejercicio: {Ejercicio}
                        </h4>

                        <p className={"text-gray-700 mb-1"}>Series: {Series}</p>
                        <p className="text-gray-700 mb-1">
                          Repeticiones: {Repeticiones}
                        </p>
                        {Cadencia && Cadencia.trim() !== "" && (
                          <p className="text-gray-700 mb-1">
                            Cadencia: {Cadencia}
                          </p>
                        )}
                        {Notas && Notas.trim() !== "" && (
                          <p className="text-gray-700 mb-1">Notas: {Notas}</p>
                        )}
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  const paths = workouts.map(({ ID }) => ({
    params: { id: ID.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const workout = workouts.find(({ ID }) => ID === parseInt(params.id));

  return {
    props: {
      workout,
    },
  };
};

export default WorkoutPage;
