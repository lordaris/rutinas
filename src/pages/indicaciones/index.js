import React from "react";
import Head from "next/head";
import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Head>
        <title>Indicaciones para hacer ejercicios</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold">
          Indicaciones para hacer ejercicios
        </h1>
        <p className="mt-8 text-xl">
          <span className={"font-bold"}>Calentar</span> por lo menos 5 minutos
          antes de tu rutina.
        </p>
        <p className="mt-4 text-xl">
          <span className={"font-bold"}>Estirar</span> si es posible tambien
          antes y despues de la rutina.
        </p>
        <p className="mt-4 text-xl">
          Realizar los ejercicios con un{" "}
          <span className={"font-bold"}>peso suficiente</span> para realizar
          únicamente las repeticiones indicadas. Si se pueden hacer mas
          repeticiones, aumentar el peso, si no se puede un peso mas alto,
          aumentar las repeticiones.
        </p>
        <p className="mt-4 text-xl">
          Seguir con la cadencia para tener mejores resultados.
        </p>
        <p className="mt-4 text-xl">
          Realizar{" "}
          <Link
            href={
              "https://www.hsph.harvard.edu/nutritionsource/high-intensity-interval-training/"
            }
          >
            <span className={"font-bold text-cyan-800"}>HIIT </span>
          </Link>
          al final de cada rutina puede ayudarte a oxidar grasa más rápido.
        </p>
        <p className="mt-8 text-xl font-bold">
          ¡Recuerda siempre escuchar a tu cuerpo y no forzarlo más allá de sus
          límites!
        </p>

        <Link
          href="/"
          className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Regresar
        </Link>
      </main>
    </div>
  );
}
