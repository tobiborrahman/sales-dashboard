export const toggleSort = (current: string | null) => {
  if (!current) return "asc";
  return current === "asc" ? "desc" : "asc";
};
