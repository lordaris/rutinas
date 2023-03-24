import React from "react";
import Head from "next/head";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
export default function Home() {
  return (

    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Indicaciones generales</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
       <nav className="flex justify-center navbar shadows">
        <Link
          href={"/"}
          className="flex items-center text-gray-700 px-10 hover:text-gray-900 py-10"
        >
          <AiFillHome className="w-6 h-6 mr-2" />
        </Link>
      </nav>
 <h1 className="text-4xl font-bold">Indicaciones generales</h1>
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
        <p className={"mt-4 text-xl"}>
          Hacer{" "}
          <Link
            href={
              "https://inuba.com/blog/rutina-calentamiento-ejercicios-fuerza/"
            }
          >
            <span className={"font-bold text-cyan-800"}>
              series de aproximación
            </span>
          </Link>
          siempre que sea posible
        </p>
        <p className="mt-4 text-xl">
          {" "}
          Entender la{" "}
          <Link
            href={
              "https://www.hsph.harvard.edu/nutritionsource/high-intensity-interval-training/"
            }
          >
            <span className={"font-bold text-cyan-800"}>
              conexión mente-músculo
            </span>{" "}
          </Link>{" "}
          puede ayudarte a mejorar los resultados.
        </p>
        <p className={"mt-4 text-xl"}>
          Hacer <span className={"font-bold"}>descansos cortos </span> siempre
          que sea posible (especialmente cuando realmente no hay cansancio).
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
      </main>
    </div>
  );
}
