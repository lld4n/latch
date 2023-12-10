import React from "react";
import styles from "./Item.module.scss";
import { Id } from "../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Item({ items_id }: { items_id: Id<"items"> }) {
  const q = useQuery(api.items.getItem, { items_id });
  console.log("q", q);
  return <div>Item</div>;
}
