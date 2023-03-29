import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

const NewRoutine = () => {
  const [csrfToken, setCsrfToken] = useState("");
  const [routine, setRoutine] = useState({
    nombre: "",
    dias: [],
  });

  useEffect(() => {
    async function fetchCsrfToken() {
      const res = await fetch(
        "http://lordaris.pythonanywhere.com/csrf-token//"
      );
      const data = await res.json();
      setCsrfToken(data.csrfToken);
    }

    fetchCsrfToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando objeto:", JSON.stringify(routine));
    const response = await fetch(
      "http://lordaris.pythonanywhere.com/rutinas/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(routine),
      }
    );
    if (response.ok) {
      alert("Rutina creada exitosamente!");
      setRoutine({
        nombre: "",
        dias: [],
      });
    } else {
      alert("Error al crear rutina");
    }
  };

  const handleInputChange = (e, dayIndex, exerciseIndex) => {
    const { name, value } = e.target;
    const dias = [...routine.dias];
    if (dayIndex !== undefined && exerciseIndex !== undefined) {
      dias[dayIndex].ejercicios[exerciseIndex][
        name === "ejercicio" ? "nombre" : name
      ] = value;
    } else if (dayIndex !== undefined) {
      dias[dayIndex][name] = value;
    } else {
      setRoutine({ ...routine, [name]: value });
      return;
    }
    const updatedRoutine = { ...routine, dias };
    setRoutine(updatedRoutine);
  };

  const addDay = () => {
    const dias = [...routine.dias];
    dias.push({
      dia: "",
      enfoque: "",
      ejercicios: [
        {
          nombre: "",
          series: "",
          repeticiones: "",
          cadencia: "",
          notas: "",
        },
      ],
    });
    const updatedRoutine = { ...routine, dias };
    setRoutine(updatedRoutine);
  };

  const addExercise = (dayIndex) => {
    const dias = [...routine.dias];
    dias[dayIndex].ejercicios.push({
      nombre: "",
      series: "",
      repeticiones: "",
      cadencia: "",
      notas: "",
    });
    const updatedRoutine = { ...routine, dias };
    setRoutine(updatedRoutine);
  };
  const removeDay = (dayIndex) => {
    const dias = [...routine.dias];
    dias.splice(dayIndex, 1);
    const updatedRoutine = { ...routine, dias };
    setRoutine(updatedRoutine);
  };
  const removeExercise = (dayIndex, exerciseIndex) => {
    const dias = [...routine.dias];
    dias[dayIndex].ejercicios.splice(exerciseIndex, 1);
    const updatedRoutine = { ...routine, dias };
    setRoutine(updatedRoutine);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center">Crear Rutina</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre de la rutina
          </label>
          <input
            type="text"
            name="nombre"
            value={routine.nombre}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Nombre de la rutina"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Días
          </label>
          {routine.dias.map((day, dayIndex) => (
            <div key={dayIndex} className="mb-4">
              <div className="flex justify-between">
                <div className="w-1/2 mr-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Día
                  </label>
                  <input
                    type="text"
                    name="dia"
                    value={day.dia}
                    onChange={(e) => handleInputChange(e, dayIndex)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Día"
                  />
                </div>
                <div className="w-1/2 ml-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Enfoque
                  </label>
                  <input
                    type="text"
                    name="enfoque"
                    value={day.enfoque}
                    onChange={(e) => handleInputChange(e, dayIndex)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enfoque"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Ejercicios
                </label>
                {day.ejercicios.map((exercise, exerciseIndex) => (
                  <div key={exerciseIndex} className="mb-4">
                    <div className="flex justify-between">
                      <div className="w-1/3 mr-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Ejercicio
                        </label>
                        <input
                          type="text"
                          name="ejercicio"
                          value={exercise.ejercicio}
                          onChange={(e) =>
                            handleInputChange(e, dayIndex, exerciseIndex)
                          }
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Ejercicio"
                        />
                      </div>
                      <div className="w-1/3 mr-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Series
                        </label>
                        <input
                          type="text"
                          name="series"
                          value={exercise.series}
                          onChange={(e) =>
                            handleInputChange(e, dayIndex, exerciseIndex)
                          }
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Series"
                        />
                      </div>
                      <div className="w-1/3 ml-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Repeticiones
                        </label>
                        <input
                          type="text"
                          name="repeticiones"
                          value={exercise.repeticiones}
                          onChange={(e) =>
                            handleInputChange(e, dayIndex, exerciseIndex)
                          }
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Repeticiones"
                        />
                      </div>
                      <div className="w-1/3 ml-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Cadencia
                        </label>
                        <input
                          type="text"
                          name="cadencia"
                          value={exercise.cadencia}
                          onChange={(e) =>
                            handleInputChange(e, dayIndex, exerciseIndex)
                          }
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Cadencia"
                        />
                      </div>
                      <div className="w-1/3 ml-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Notas
                        </label>
                        <input
                          type="text"
                          name="notas"
                          value={exercise.notas}
                          onChange={(e) =>
                            handleInputChange(e, dayIndex, exerciseIndex)
                          }
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Notas"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeExercise(dayIndex, exerciseIndex)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Eliminar ejercicio
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addExercise(dayIndex)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Agregar ejercicio
                </button>
              </div>
              <button
                type="button"
                onClick={() => removeDay(dayIndex)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Eliminar día
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addDay}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Agregar día
          </button>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Crear rutina
          </button>
        </div>
      </form>
    </>
  );
};

export default NewRoutine;
