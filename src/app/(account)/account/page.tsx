"use client";
import React from "react";
import styles from "./account.module.scss";
import Profile from "@/components/Profile/Profile";
import { useUser } from "@/hooks/useUser";
import { Loader2 } from "lucide-react";
import GradeProfile from "@/components/GradeProfile/GradeProfile";
export default function Account() {
  const user = useUser();
  return (
    <main className={styles.main}>
      {user ? (
        <>
          <h1>Ваши оценки</h1>
          <Profile user={user} />
          <GradeProfile user={user} />
        </>
      ) : (
        <Loader2 size={16} className={styles.loader} />
      )}
    </main>
  );
}
