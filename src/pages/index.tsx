import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">
        Bienvenido a mi app de rutinas.
      </h1>
      <p className="text-lg text-center mb-8">
       Hice esta aplicación para poder enviarte rutinas y que puedas verlas en tu celular.
       Aún es una versión beta, pero espero que te guste.

      </p>
      <Link
        href="/rutinas"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Ir a mis rutinas
      </Link>
    </div>
  );
}
