import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });
import pochitawaving from "../../public/pochita-chainsaw-man.gif";

export default function Home() {
  return (
    <div className={"container mx-auto"}>
      <div className="flex flex-col items-center justify-center h-screen">
        <Image alt={"pochita"} src={pochitawaving} width={200} height={200} />
        <h1 className="text-3xl text-center px-2 font-bold mb-4 text-gray-800">
          Bienvenid@
        </h1>

        <p className="text-lg text-center text-gray-700 px-5">
          Hice esta aplicación para poder enviarte rutinas y que puedas verlas
          en tu celular.
        </p>
        <p className={"text-lg text-center mb-8 text-gray-800"}>
          ¡Espero que te guste!
        </p>

        <Link
          href="/rutinas"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Ir a mis rutinas
        </Link>
        <Link
          href="/indicaciones"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-3 px-4 rounded"
        >
          Indicaciones generales
        </Link>
        <p className={"text-center py-7"}>
          Si tienes alguna duda puedes escribirme al correo:
          audio.aris@gmail.com
        </p>
      </div>
    </div>
  );
}
