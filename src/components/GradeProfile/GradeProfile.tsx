import React from "react";
import styles from "./GradeProfile.module.scss";
import { Id } from "../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { parseUnified } from "@/utils/parseUnified";

export default function GradeProfile({ user }: { user: Id<"users"> }) {
  const grades = useQuery(api.grade.getGradesFromUser, {
    users_id: user,
  });
  return (
    <>
      {grades ? (
        <div className={styles.grades}>
          {grades.map((el, i) => {
            if (el.item) {
              return (
                <Link
                  href={"/item/" + el.item._id}
                  key={i}
                  className={styles.link}
                >
                  <img src={el.item.poster} alt="poster" />
                  {el.emoji && <div>{parseUnified(el.emoji)}</div>}
                  <div className={styles.rating}>{el.rating}/10</div>
                </Link>
              );
            }
          })}
        </div>
      ) : (
        <Loader2 size={16} className={styles.loader} />
      )}
    </>
  );
}
