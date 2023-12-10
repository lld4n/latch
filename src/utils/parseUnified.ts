export function parseUnified(unified: string): string {
  return unified
    .split("-")
    .map((hex) => String.fromCodePoint(parseInt(hex, 16)))
    .join("");
}
