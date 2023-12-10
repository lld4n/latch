"use client";
import React from "react";
import styles from "./add.module.scss";
import { KinopoiskContext } from "@/providers/KinopoiskProvider";
import { Loader2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import Estimate from "@/components/Estimate/Estimate";
import Item from "@/components/Item/Item";
import { useUser } from "@/hooks/useUser";
export default function AddFromKinopoisk() {
  const kinopoisk = React.useContext(KinopoiskContext);
  const [idItem, setIdItem] = React.useState<Id<"items"> | null>(null);
  const createItem = useMutation(api.items.createItem);
  const user = useUser();
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
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [kinopoisk]);

  return (
    <main className={styles.main}>
      {idItem ? (
        <>
          <Item items_id={idItem} />
          {user ? <Estimate items_id={idItem} users_id={user} /> : <></>}
        </>
      ) : (
        <Loader2 size={16} className={styles.loader} />
      )}
    </main>
  );
}
