"use client";
import { Id } from "../../convex/_generated/dataModel";

export function useUser() {
  if (typeof window !== "undefined" && localStorage.getItem("latch-user")) {
    return localStorage.getItem("latch-user") as Id<"users">;
  } else {
    return null;
  }
}
