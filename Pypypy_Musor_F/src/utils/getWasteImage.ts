export function getWasteImage(type: string) {
  const key = type.toLowerCase();

  if (key === "plastic") return "/plastic.jpg";
  if (key === "paper") return "/paper.jpg";
  if (key === "organic") return "/organic.jpg";
  if (key === "glass") return "/glass.jpg";
  if (key === "metall") return "/metall.jpg";

  return null;
}
