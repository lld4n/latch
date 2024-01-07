"use client";
import React from "react";
import styles from "./add.module.scss";
import Link from "next/link";
import kinopoiskimg from "../../../assets/kinopoisk_logo.svg";
import ky from "ky";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { kinopoiskType } from "@/types/KinopoiskType";
import { KinopoiskContext } from "@/providers/KinopoiskProvider";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Doc } from "../../../../convex/_generated/dataModel";

export default function Add() {
  const [value, setValue] = React.useState("");
  const [valueKinopoisk, setValueKinopoisk] = React.useState("");
  const [danger, setDanger] = React.useState(false);
  const [loadingKinopoisk, setLoadingKinopoisk] = React.useState(false);
  const [kinopoisk, setKinopoisk] = React.useState<kinopoiskType[]>([]);
  const [searchRes, setSearchRes] = React.useState<Doc<"items">[]>([]);
  const kinopoiskContext = React.useContext(KinopoiskContext);

  const search = useMutation(api.items.searchItem);

  React.useEffect(() => {
    if (value) {
      search({
        input: value,
      }).then((res) => {
        setSearchRes(res);
      });
    } else {
      setSearchRes([]);
    }
  }, [value]);
  const getFromTMDB = async () => {
    setLoadingKinopoisk(true);
    try {
      const data = await ky.get(
        `https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=5&query=${value}`,
        {
          headers: {
            "X-API-KEY": process.env.NEXT_PUBLIC_KINOPOISK,
          },
        },
      );
      setValueKinopoisk(value);
      setKinopoisk(((await data.json()) as any).docs);
    } catch (e) {
      setDanger(true);
    }
    setLoadingKinopoisk(false);
  };
  return (
    <main className={styles.main}>
      <div className={styles.block}>
        <input
          required
          className={styles.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <label>Начните вводить название</label>
      </div>
      {value &&
        !danger &&
        (loadingKinopoisk ? (
          <Loader2 size={16} className={styles.loader} />
        ) : (
          <button
            className={styles.btn}
            onClick={() => {
              getFromTMDB();
            }}
          >
            Попробовать найти в кинопоиске
          </button>
        ))}
      {danger && (
        <div className={styles.danger}>Произошла ошибка с кинопоиском</div>
      )}

      <div className={styles.content}>
        {searchRes.map((el) => {
          return (
            <Link href={"/item/" + el._id} key={el._id} className={styles.item}>
              <img src={el.poster} alt="poster" className={styles.item__img} />
              <h2>{el.name}</h2>
              <div>{el.rating.kp}</div>
            </Link>
          );
        })}
        {kinopoisk.length !== 0 && valueKinopoisk === value && (
          <>
            {kinopoisk.map((el, i) => {
              if (!searchRes.map((e) => e.kp_id).includes(el.id)) {
                return (
                  <Link
                    href="/addFromKinopoisk"
                    key={i}
                    className={styles.item}
                    onClick={() => {
                      kinopoiskContext?.setValue(el);
                    }}
                  >
                    <img
                      src={el.poster.previewUrl}
                      alt="poster"
                      className={styles.item__img}
                    />
                    <h2>{el.name}</h2>
                    <div>{el.rating.kp}</div>
                    <Image
                      src={kinopoiskimg}
                      alt="kinopoisk"
                      width={20}
                      height={20}
                    />
                  </Link>
                );
              }
            })}
          </>
        )}
      </div>
    </main>
  );
}
