"use client";
import React from "react";
import Image from "next/image";
import logo from "../../assets/logo.svg";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Film,
  Loader2,
  LogIn,
  PlusCircle,
  Search,
  Sun,
  SunMoon,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import styles from "./Header.module.scss";
export default function Header() {
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
        <div className={styles.right}>
          <Link href="/list" className={styles.btn}>
            <Film size={16} />
          </Link>
          {loading ? (
            <Loader2 size={16} className={styles.loader} />
          ) : (
            user && (
              <Link href="/add" className={styles.btn}>
                <PlusCircle size={16} />
              </Link>
            )
          )}
        </div>
        <Link href="/">
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
    </>
  );
}
