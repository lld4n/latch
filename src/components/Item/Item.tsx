import React from "react";
import styles from "./Item.module.scss";
import { Id } from "../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Loader2, Popcorn } from "lucide-react";
import kinopoisk_logo from "../../assets/kinopoisk_logo.svg";
import imdb_logo from "../../assets/imdb.svg";
import Image from "next/image";

export default function Item({ items_id }: { items_id: Id<"items"> }) {
  const q = useQuery(api.items.getItem, { items_id });
  return (
    <>
      {q ? (
        <div className={styles.main}>
          <h1 className={styles.name}>{q.name}</h1>
          <div className={styles.bottom}>
            <img src={q.poster} alt={q.name} className={styles.poster} />
            <div className={styles.block}>
              <div className={styles.info}>
                {q.rating.kp && (
                  <div className={styles.item}>
                    {q.rating.kp}
                    <Image
                      src={kinopoisk_logo}
                      alt="kinopoisk"
                      width={20}
                      height={20}
                    />
                  </div>
                )}
                {q.rating.imdb && (
                  <div className={styles.item}>
                    {q.rating.imdb}
                    <Image src={imdb_logo} alt="imdb" width={40} height={20} />
                  </div>
                )}
                {q.movieLength !== 0 && (
                  <div className={styles.item}>{q.movieLength} минут</div>
                )}
                {q.seriesLength !== 0 && (
                  <div className={styles.item}>{q.seriesLength} минут</div>
                )}
                {q.ageRating !== 0 && (
                  <div className={styles.item}>{q.ageRating}+</div>
                )}
                {q.year && <div className={styles.item}>{q.year} год</div>}
                {q.type === "movie" ? (
                  <div className={styles.item}>
                    Фильм
                    <Popcorn size={16} />
                  </div>
                ) : (
                  <div className={styles.item}>
                    Сериал
                    <Popcorn size={16} />
                  </div>
                )}
              </div>
              {q.genres && (
                <div className={styles.info}>
                  {q.genres.map((el, i) => {
                    return (
                      <div className={styles.item} key={i}>
                        {el}
                      </div>
                    );
                  })}
                </div>
              )}
              <div className={styles.desc}>{q.description}</div>
            </div>
          </div>
        </div>
      ) : (
        <Loader2 size={16} className={styles.loader} />
      )}
    </>
  );
}
