"use client";
import React from "react";
import styles from "./list.module.scss";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Loader2 } from "lucide-react";
import Link from "next/link";
export default function List() {
  const list = useQuery(api.items.getAll100);
  console.log(list);
  return (
    <main className={styles.main}>
      {list ? (
        <>
          <h1 className={styles.title}>Недавно добавленные</h1>
          <div className={styles.list}>
            {list.map((el) => {
              return (
                <Link
                  key={el._id}
                  href={"/item/" + el._id}
                  className={styles.link}
                >
                  <img src={el.poster} alt={el.name} />
                  {el.name}
                </Link>
              );
            })}
          </div>
        </>
      ) : (
        <Loader2 size={16} className={styles.loader} />
      )}
    </main>
  );
}
