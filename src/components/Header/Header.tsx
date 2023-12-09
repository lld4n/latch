"use client";
import React from "react";
import Image from "next/image";
import logo from "../../assets/logo.svg";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Loader2, LogIn, Search, Sun, SunMoon, UserRound } from "lucide-react";
import { toast } from "sonner";
import Modal from "@/components/Modal/Modal";
import styles from "./Header.module.scss";
export default function Header() {
  const [openModal, setOpenModal] = React.useState(false);
  const [user, setUser] = React.useState("");
  const [photo, setPhoto] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    if (window && localStorage.getItem("latch-user") !== null) {
      setUser(localStorage.getItem("latch-user") || "");
      if (localStorage.getItem("latch-photo") !== null) {
        setPhoto(localStorage.getItem("latch-photo") || "");
      }
    }
    setLoading(false);
  }, []);
  return (
    <>
      <header className={styles.header}>
        <div>123</div>
        <Link href="/public">
          <Image src={logo} alt="logo" width={30} height={30} priority />
        </Link>
        <div className={styles.right}>
          <button
            className={styles.btn}
            onClick={() => {
              let newTheme = "";
              let messageTheme = "";
              if (theme === "system") {
                messageTheme = "темную тему";
                newTheme = "dark";
              } else if (theme === "dark") {
                messageTheme = "светлую тему";
                newTheme = "light";
              } else {
                messageTheme = "системную тему";
                newTheme = "system";
              }
              toast.info("Цветовая тема изменилась на " + messageTheme);
              setTheme(newTheme);
            }}
          >
            <SunMoon size={16} />
          </button>
          <button className={styles.btn} onClick={() => setOpenModal(true)}>
            <Search size={16} />
          </button>
          {loading ? (
            <Loader2 size={16} className={styles.loader} />
          ) : user ? (
            photo ? (
              <Link href="/account" className={styles.btn}>
                <img src={photo} alt="avatar" />
              </Link>
            ) : (
              <Link href="/account" className={styles.btn}>
                <UserRound size={16} />
              </Link>
            )
          ) : (
            <Link href="/signin" className={styles.btn}>
              <LogIn size={16} />
            </Link>
          )}
        </div>
      </header>
      {openModal && <Modal setOpenModal={setOpenModal} />}
    </>
  );
}
