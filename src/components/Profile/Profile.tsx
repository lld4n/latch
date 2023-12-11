import React from "react";
import styles from "./Profile.module.scss";
import { Id } from "../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Loader2 } from "lucide-react";

export default function Profile({ user }: { user: Id<"users"> }) {
  const us = useQuery(api.users.getUserFromId, {
    users_id: user,
  });
  return (
    <>
      {us ? (
        <div className={styles.profile}>
          <h2>{us.username}</h2>
          {us.photo && <img src={us.photo} alt="avatar" />}
        </div>
      ) : (
        <Loader2 size={16} className={styles.loader} />
      )}
    </>
  );
}
