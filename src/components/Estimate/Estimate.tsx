import React from "react";
import styles from "./Estimate.module.scss";
import { Id } from "../../../convex/_generated/dataModel";
import { starsType } from "@/types/stars";
import { Save, SmilePlus } from "lucide-react";
import Lemojis from "lemojis/dist/Lemojis";
import { parseUnified } from "@/utils/parseUnified";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";

export default function Estimate({ id }: { id: Id<"items"> }) {
  const [selectedStar, setSelectedStar] = React.useState<starsType>(1);
  const [user, setUser] = React.useState<Id<"users"> | null>(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [emoji, setEmoji] = React.useState("");
  const createGrade = useMutation(api.grade.createGrade);
  const router = useRouter();
  React.useEffect(() => {
    if (window && localStorage.getItem("latch-user")) {
      setUser(localStorage.getItem("latch-user") as Id<"users">);
    }
  }, []);

  const handleSave = async () => {
    if (user) {
      await createGrade({
        emoji: emoji,
        users_id: user,
        items_id: id,
        rating: selectedStar,
      });
      router.push("/account");
    }
  };
  return (
    <>
      {user ? (
        <div className={styles.main}>
          <div className={styles.stars}>
            <div
              className={
                styles.star +
                " " +
                styles.s1 +
                " " +
                (selectedStar >= 10 ? styles.active : " ")
              }
              title="10"
              onClick={() => setSelectedStar(10)}
            />
            <div
              className={
                styles.star +
                " " +
                styles.s2 +
                " " +
                (selectedStar >= 9 ? styles.active : " ")
              }
              title="9"
              onClick={() => setSelectedStar(9)}
            />
            <div
              className={
                styles.star +
                " " +
                styles.s3 +
                " " +
                (selectedStar >= 8 ? styles.active : " ")
              }
              title="8"
              onClick={() => setSelectedStar(8)}
            />
            <div
              className={
                styles.star +
                " " +
                styles.s4 +
                " " +
                (selectedStar >= 7 ? styles.active : " ")
              }
              title="7"
              onClick={() => setSelectedStar(7)}
            />
            <div
              className={
                styles.star +
                " " +
                styles.s5 +
                " " +
                (selectedStar >= 6 ? styles.active : " ")
              }
              title="6"
              onClick={() => setSelectedStar(6)}
            />
            <div
              className={
                styles.star +
                " " +
                styles.s6 +
                " " +
                (selectedStar >= 5 ? styles.active : " ")
              }
              title="5"
              onClick={() => setSelectedStar(5)}
            />
            <div
              className={
                styles.star +
                " " +
                styles.s7 +
                " " +
                (selectedStar >= 4 ? styles.active : " ")
              }
              title="4"
              onClick={() => setSelectedStar(4)}
            />
            <div
              className={
                styles.star +
                " " +
                styles.s8 +
                " " +
                (selectedStar >= 3 ? styles.active : " ")
              }
              title="3"
              onClick={() => setSelectedStar(3)}
            />
            <div
              className={
                styles.star +
                " " +
                styles.s9 +
                " " +
                (selectedStar >= 2 ? styles.active : " ")
              }
              title="2"
              onClick={() => setSelectedStar(2)}
            />
            <div
              className={
                styles.star +
                " " +
                styles.s10 +
                " " +
                (selectedStar >= 1 ? styles.active : " ")
              }
              title="1"
              onClick={() => setSelectedStar(1)}
            />
          </div>
          <div className={styles.text}>{selectedStar}/10</div>
          {emoji ? (
            <button className={styles.btn} onClick={() => setOpenModal(true)}>
              {parseUnified(emoji)}
            </button>
          ) : (
            <button className={styles.btn} onClick={() => setOpenModal(true)}>
              <SmilePlus size={16} />
            </button>
          )}

          <button className={styles.btn} onClick={handleSave}>
            <Save size={16} />
          </button>
          {openModal && (
            <>
              <div className={styles.modal}>
                <Lemojis
                  lazyLoad
                  searchEnabled={false}
                  click={(em) => {
                    setEmoji(em.unified);
                    setOpenModal(false);
                  }}
                />
              </div>
              <div
                className={styles.overlay}
                onClick={() => setOpenModal(false)}
              />
            </>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}