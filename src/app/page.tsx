import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./page.module.scss";
import Link from "next/link";
import React from "react";
export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1>Лучше смотрите фильмы/сериалы, чем новости</h1>
        <Link href="/list" className={styles.btn}>
          Коллекция
        </Link>
      </main>
      <Footer />
    </>
  );
}
