import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./page.module.scss";
import Link from "next/link";
import { Film } from "lucide-react";
import React from "react";
export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1>Специальный проект для Агоны</h1>
        <Link href="/list" className={styles.btn}>
          Коллекция фильмов/сериалов
          <Film size={16} />
        </Link>
      </main>
      <Footer />
    </>
  );
}
