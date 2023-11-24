export function extractProvinceCityName(name) {
  // Split the name using a space
  const parts = name.split(" ");

  // Find the index of "Tỉnh" or "Thành phố"
  const index = parts.findIndex(
    (part) => part === "Tỉnh" || part === "Thành phố" || part === "phố"
  );

  // If found, return the part after it, otherwise, return the original name
  return index !== -1 ? parts.slice(index + 1).join(" ") : name;
}
