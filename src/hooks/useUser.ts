import { Id } from "../../convex/_generated/dataModel";

export function useUser() {
  if (window && localStorage.getItem("latch-user")) {
    return localStorage.getItem("latch-user") as Id<"users">;
  } else {
    return null;
  }
}
