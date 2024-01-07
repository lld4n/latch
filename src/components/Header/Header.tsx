"use client";
import React from "react";
import Image from "next/image";
import logo from "../../assets/logo.svg";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Film, PlusCircle, SunMoon } from "lucide-react";
import styles from "./Header.module.scss";
import { useUser } from "@/hooks/useUser";
import BadgeProfile from "@/components/BadgeProfile/BadgeProfile";
export default function Header() {
  const { theme, setTheme } = useTheme();
  const user = useUser();
  return (
    <>
      <header className={styles.header}>
        <div className={styles.right}>
          <Link href="/list" className={styles.btn}>
            <Film size={16} />
          </Link>

          {user && (
            <Link href="/add" className={styles.btn}>
              <PlusCircle size={16} />
            </Link>
          )}
        </div>
        <Link href="/">
          <Image src={logo} alt="logo" width={30} height={30} priority />
        </Link>
        <div className={styles.right}>
          <button
            className={styles.btn}
            onClick={() => {
              if (theme === "dark") {
                setTheme("light");
              } else {
                setTheme("dark");
              }
            }}
          >
            <SunMoon size={16} />
          </button>
          <BadgeProfile user_id={user} />
        </div>
      </header>
    </>
  );
}
