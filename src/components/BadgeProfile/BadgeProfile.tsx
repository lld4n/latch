import React from "react";
import styles from "./BadgeProfile.module.scss";
import { Id } from "../../../convex/_generated/dataModel";
import Link from "next/link";
import { CircleUser, LogIn } from "lucide-react";

export default function BadgeProfile({
  user_id,
}: {
  user_id: Id<"users"> | null;
}) {
  if (!user_id) {
    return (
      <Link href="/signin" className={styles.btn}>
        <LogIn size={16} />
      </Link>
    );
  }
  return (
    <Link href="/account" className={styles.btn}>
      <CircleUser size={16} />
    </Link>
  );
}
