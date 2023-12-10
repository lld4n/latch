"use client";
import React from "react";
import styles from "./add.module.scss";
import { KinopoiskContext } from "@/providers/KinopoiskProvider";
import { BadgeAlert, BadgeCheck, Loader2, Popcorn } from "lucide-react";
import kinopoisk_logo from "../../../assets/kinopoisk_logo.svg";
import imdb_logo from "../../../assets/imdb.svg";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import Estimate from "@/components/Estimate/Estimate";
export default function AddFromKinopoisk() {
  const kinopoisk = React.useContext(KinopoiskContext);
  const [idItem, setIdItem] = React.useState<Id<"items"> | null>(null);
  const createItem = useMutation(api.items.createItem);
  const [sync, setSync] = React.useState<"loading" | "done" | "danger">(
    "loading",
  );

  React.useEffect(() => {
    if (kinopoisk && kinopoisk.value) {
      createItem({
        name: kinopoisk.value.name,
        poster: kinopoisk.value.poster.url || "",
        seriesLength: kinopoisk.value.seriesLength || 0,
        type: kinopoisk.value.type || "movie",
        rating: {
          kp: kinopoisk.value.rating.kp || 0,
          imdb: kinopoisk.value.rating.imdb || 0,
        },
        ageRating: kinopoisk.value.ageRating || 0,
        backdrop: kinopoisk.value.backdrop.url || "",
        genres: kinopoisk.value.genres.map((el) => el.name) || [],
        movieLength: kinopoisk.value.movieLength || 0,
        year: kinopoisk.value.year || 0,
        kp_id: kinopoisk.value.id,
        description: kinopoisk.value.description || "",
      })
        .then((res) => {
          setIdItem(res);
          setSync("done");
        })
        .catch(() => {
          setSync("danger");
        });
    }
  }, [kinopoisk]);

  console.log(kinopoisk?.value);
  return (
    <main className={styles.main}>
      {kinopoisk && kinopoisk.value ? (
        <>
          <div className={styles.title}>
            <h1>{kinopoisk.value.name}</h1>
            {sync === "loading" ? (
              <div className={styles.sync}>
                Сихронизация
                <Loader2 size={16} className={styles.loader} />
              </div>
            ) : sync === "danger" ? (
              <div className={styles.sync}>
                <BadgeAlert size={16} />
              </div>
            ) : (
              <div className={styles.sync}>
                <BadgeCheck size={16} />
              </div>
            )}
          </div>
          <div className={styles.top}>
            {kinopoisk.value.backdrop.url && (
              <img
                src={kinopoisk.value.backdrop.url}
                loading="lazy"
                alt="backdrop"
                className={styles.backdrop}
              />
            )}
            <img
              src={kinopoisk.value.poster.url}
              alt="poster"
              className={styles.poster}
            />
            <div className={styles.rt}>
              <div className={styles.rating}>
                {kinopoisk.value.rating.kp}
                <Image
                  src={kinopoisk_logo}
                  alt="kinopoisk"
                  width={20}
                  height={20}
                />
              </div>
              <div className={styles.rating}>
                {kinopoisk.value.rating.imdb}
                <Image src={imdb_logo} alt="imdb" width={40} height={20} />
              </div>
              {kinopoisk.value.ageRating && (
                <div className={styles.rating}>
                  {kinopoisk.value.ageRating}+
                </div>
              )}

              {kinopoisk.value.movieLength !== 0 && (
                <div className={styles.rating}>
                  {kinopoisk.value.movieLength} минут
                </div>
              )}

              {kinopoisk.value.seriesLength && (
                <div className={styles.rating}>
                  {kinopoisk.value.seriesLength} минут в серии
                </div>
              )}

              {kinopoisk.value.type === "movie" ? (
                <div className={styles.rating}>
                  Фильм
                  <Popcorn size={16} />
                </div>
              ) : (
                <div className={styles.rating}>
                  Сериал
                  <Popcorn size={16} />
                </div>
              )}

              <div className={styles.rating}>{kinopoisk.value.year} год</div>
            </div>
          </div>
          <div className={styles.genres}>
            {kinopoisk.value.genres.map((el) => {
              return (
                <div key={el.name} className={styles.rating}>
                  {el.name}
                </div>
              );
            })}
          </div>
          <div className={styles.desc}>{kinopoisk.value.description}</div>
          {idItem ?  <Estimate id={idItem} /> : <></>}
        </>
      ) : (
        <Loader2 size={16} className={styles.loader} />
      )}
    </main>
  );
}
