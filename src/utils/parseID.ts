export default function parseID(
  n: number | string[] | string | undefined
): number {
  if (typeof n === "number") {
    return n;
  }
  n = Array.isArray(n) ? n[0] : n;
  if (n === undefined) {
    return -1;
  }
  const result: number = Number.parseInt(n);
  return result.toString() === n ? result : -1;
}
