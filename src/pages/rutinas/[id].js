import { useRouter } from "next/router";
import workouts from "../api/data/ejercicios.json";
import Link from "next/link";
const WorkoutPage = ({ workout }) => {
  const router = useRouter();
  // This is the fallback case, where the page is being rendered
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { Dias } = workout;
  return (
    <div className={"container mx-auto my-10"}>
      <h1 className={"text-3xl font-bold mb-6"}>
        Rutina {workout.Descripcion}
      </h1>
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
        {Dias.map(({ Dia, Rutina, Ejercicios }) => (
          <div key={Dia} className={"bg-white rounded-lg shadow p-6"}>
            <h2 className={"text-xl font-bold mb-2"}>Día {Dia}</h2>
            <h3 className={"text-lg font-medium mb-1"}>Rutina: {Rutina}</h3>


            <ul>
              {Ejercicios.map(
                ({ Ejercicio, Series, Repeticiones, Cadencia, Notas }) => (
                  <li key={Ejercicio} className={"mb-4"}>
                    <h4 className={""}>Ejercicio: {Ejercicio}</h4>

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
                        <p className="text-gray-700 mb-1">
                            Notas: {Notas}
                        </p>
                    )}


                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>
        <Link href="/rutinas" className={"text-blue-500 hover:underline"}>
           Atrás
        </Link>

    </div>
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
