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
      const res = await fetch("http://localhost:8000/csrf-token/");
      const data = await res.json();
      setCsrfToken(data.csrfToken);
    }
    fetchCsrfToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/rutinas/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(routine),
    });
    if (response.ok) {
      alert("Rutina creada exitosamente!");

      console.log(routine);
    } else {
      alert("Error al crear la rutina");
      console.log(routine);
      console.log(response);
    }
  };

  /* Descomentar si el otro metodo no funciona
  const handleInputChange = (e, dayIndex, exerciseIndex) => {
    const { name, value } = e.target;
    const dias = [...routine.dias];
    if (dayIndex !== undefined && exerciseIndex !== undefined) {
      dias[dayIndex].ejercicios[exerciseIndex][name] = value;
    } else if (dayIndex !== undefined) {
      dias[dayIndex][name] = value;
    } else {
      setRoutine({ ...routine, [name]: value });
    }
    setRoutine({ ...routine, dias });
  };
*/

  const handleInputChange = (e, dayIndex, exerciseIndex) => {
    const { name, value } = e.target;
    const dias = [...routine.dias];
    if (dayIndex !== undefined && exerciseIndex !== undefined) {
      dias[dayIndex].ejercicios[exerciseIndex][name] = value;
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
      nombre: "",
      ejercicios: [],
    });
    setRoutine({ ...routine, dias });
  };

  const removeDay = (index) => {
    const dias = [...routine.dias];
    dias.splice(index, 1);
    setRoutine({ ...routine, dias });
  };

  const addExercise = (dayIndex) => {
    const dias = [...routine.dias];
    dias[dayIndex].ejercicios.push({
      nombre: "",
      series: "",
      repeticiones: "",
      notas: "",
    });
    setRoutine({ ...routine, dias });
  };

  const removeExercise = (dayIndex, exerciseIndex) => {
    const dias = [...routine.dias];
    dias[dayIndex].ejercicios.splice(exerciseIndex, 1);
    setRoutine({ ...routine, dias });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label className="block mb-2 font-bold">Nombre de la rutina</label>
        <input
          type="text"
          name="nombre"
          value={routine.nombre}
          onChange={(e) => setRoutine({ ...routine, nombre: e.target.value })}
          className="w-full border rounded py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold">Dias</label>
        <button
          type="button"
          onClick={addDay}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
        >
          Agregar día
        </button>
        {routine.dias.map((day, dayIndex) => (
          <div key={dayIndex} className="mb-4">
            <div className="mb-2">
              <label className="block mb-1 font-bold">Día</label>
              <input
                type="text"
                name="dia"
                value={day.dia}
                onChange={(e) => {
                  const dias = [...routine.dias];
                  dias[dayIndex].dia = e.target.value;
                  setRoutine({ ...routine, dias });
                }}
                className="w-full border rounded py-2 px-3"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 font-bold">Enfoque</label>
              <input
                type="text"
                name="enfoque"
                value={day.enfoque}
                onChange={(e) => {
                  const dias = [...routine.dias];
                  dias[dayIndex].enfoque = e.target.value;
                  setRoutine({ ...routine, dias });
                }}
                className="w-full border rounded py-2 px-3"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 font-bold">Ejercicios</label>
              <button
                type="button"
                onClick={() => addExercise(dayIndex)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
              >
                Agregar ejercicio
              </button>
              {day.ejercicios.map((exercise, exerciseIndex) => (
                <div key={exerciseIndex} className="mb-4">
                  <div className="mb-2">
                    <label className="block mb-1 font-bold">Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      value={exercise.nombre}
                      onChange={(e) =>
                        handleInputChange(e, dayIndex, exerciseIndex)
                      }
                      className="w-full border rounded py-2 px-3"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block mb-1 font-bold">Series</label>
                    <input
                      type="text"
                      name="series"
                      value={exercise.series}
                      onChange={(e) =>
                        handleInputChange(e, dayIndex, exerciseIndex)
                      }
                      className="w-full border rounded py-2 px-3"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block mb-1 font-bold">Repeticiones</label>
                    <input
                      type="text"
                      name="repeticiones"
                      value={exercise.repeticiones}
                      onChange={(e) =>
                        handleInputChange(e, dayIndex, exerciseIndex)
                      }
                      className="w-full border rounded py-2 px-3"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-bold">Cadencia</label>
                    <input
                      type="text"
                      name="cadencia"
                      value={exercise.cadencia}
                      onChange={(e) =>
                        handleInputChange(e, dayIndex, exerciseIndex)
                      }
                      className="w-full border rounded py-2 px-3"
                    ></input>
                  </div>
                  <div className="mb-2">
                    <label className="block mb-1 font-bold">Notas</label>
                    <input
                      type="text"
                      name="notas"
                      value={exercise.notas}
                      onChange={(e) =>
                        handleInputChange(e, dayIndex, exerciseIndex)
                      }
                      className="w-full border rounded py-2 px-3"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeExercise(dayIndex, exerciseIndex)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Eliminar ejercicio
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => removeDay(dayIndex)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Eliminar día
            </button>
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Crear rutina
      </button>
    </form>
  );
};

export default NewRoutine;

/* Descomentar si el otro código no funciona
( <form onSubmit={handleSubmit}>
  <div>
    <label>Nombre de la rutina</label>
    <input
      type="text"
      name="nombre"
      value={routine.nombre}
      onChange={(e) => setRoutine({ ...routine, nombre: e.target.value })}
    />
  </div>
  <div>
    <label>Dias</label>
    <button type="button" onClick={addDay}>
      Agregar dia
    </button>
    {routine.dias.map((day, dayIndex) => (
      <div key={dayIndex}>
        <label>Dia</label>
        <input
          type="text"
          name="dia"
          value={day.dia}
          onChange={(e) => {
            const dias = [...routine.dias];
            dias[dayIndex].dia = e.target.value;
            setRoutine({ ...routine, dias });
          }}
        />
        <label>Enfoque</label>
        <input
          type="text"
          name="enfoque"
          value={day.enfoque}
          onChange={(e) => {
            const dias = [...routine.dias];
            dias[dayIndex].enfoque = e.target.value;
            setRoutine({ ...routine, dias });
          }}
        />
        <button type="button" onClick={() => removeDay(dayIndex)}>
          Eliminar dia
        </button>
        <button type="button" onClick={() => addExercise(dayIndex)}>
          Agregar ejercicio
        </button>
        {day.ejercicios.map((exercise, exerciseIndex) => (
          <div key={exerciseIndex}>
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={exercise.nombre}
              onChange={(e) =>
                handleInputChange(e, dayIndex, exerciseIndex)
              }
            />
            <label>Series</label>
            <input
              type="text"
              name="series"
              value={exercise.series}
              onChange={(e) =>
                handleInputChange(e, dayIndex, exerciseIndex)
              }
            />
            <label>Repeticiones</label>
            <input
              type="text"
              name="repeticiones"
              value={exercise.repeticiones}
              onChange={(e) =>
                handleInputChange(e, dayIndex, exerciseIndex)
              }
            />
            <label>Cadencia</label>
            <input
              type="text"
              name="cadencia"
              value={exercise.cadencia}
              onChange={(e) =>
                handleInputChange(e, dayIndex, exerciseIndex)
              }
            />
            <label>Notas</label>
            <input
              type="text"
              name="notas"
              value={exercise.notas}
              onChange={(e) =>
                handleInputChange(e, dayIndex, exerciseIndex)
              }
            />
            <button
              type="button"
              onClick={() => removeExercise(dayIndex, exerciseIndex)}
            >
              Eliminar ejercicio
            </button>
          </div>
        ))}
      </div>
    ))}
  </div>
  <button type="submit">Crear rutina</button>
</form>
);
};
*/
