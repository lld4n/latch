"use client";
import React from "react";
import styles from "./id.module.scss";
import Item from "@/components/Item/Item";
import Estimate from "@/components/Estimate/Estimate";
import { Loader2 } from "lucide-react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useUser } from "@/hooks/useUser";

export default function ItemId({
  params,
}: {
  params: {
    id: Id<"items">;
  };
}) {
  const user = useUser();
  return (
    <main className={styles.main}>
      {params.id ? (
        <>
          <Item items_id={params.id} />
          {user ? <Estimate items_id={params.id} users_id={user} /> : <></>}
        </>
      ) : (
        <Loader2 size={16} className={styles.loader} />
      )}
    </main>
  );
}
