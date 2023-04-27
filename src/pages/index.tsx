import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={"container mx-auto"}>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-lg text-center text-gray-700 px-5">
          <div className={"font-bold"}>Queridos usuarios</div>
          <br />
          Les escribo para informarles que he renunciado como instructor del
          gimnasio y, por lo tanto, considero inapropiado regalar mis rutinas de
          entrenamiento a los nuevos instructores. Sin embargo, si desean
          recibir rutinas personalizadas, dietas o servicio de coach
          personalizado, pueden contratarme enviando un mensaje a mi número de
          celular (solo mensajes).
          <br />
          <br />
          Gracias por su comprensión y apoyo durante mi tiempo como instructor.
          Espero poder seguir ayudándoles en su camino hacia una vida más
          saludable y activa.
          <br />
          <br />
          Atentamente,
          <br />
          Jesús Armando Peña Lucero.
        </div>
      </div>
    </div>
  );
}
