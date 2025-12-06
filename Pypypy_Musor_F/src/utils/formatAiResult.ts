import type { PredictionResponse } from "@/types/ai";
import { wasteInfoMap } from "./wasteMapping";

export function formatAiResult(response: PredictionResponse) {
  const filtered = response.predictions.filter(
    (p) => p.label.toLowerCase() !== "other"
  );

  const best =
    filtered.length > 0
      ? filtered.reduce((a, b) => (a.confidence > b.confidence ? a : b))
      : response.predictions[0];

  if (!best?.label) {
    return {
      title: "Не удалось определить тип отхода 😔",
      container: "Попробуйте сделать фото ещё раз",
      advice: "",
    };
  }

  const wasteKey = best.label.toLowerCase();
  const wasteInfo = wasteInfoMap[wasteKey];

  if (!wasteInfo) {
    return {
      title: `Это похоже на: ${best.label}`,
      container: "Контейнер не определён",
      advice: "Мы пока не знаем, куда это утилизировать.",
    };
  }

  return {
    title: `Это ${wasteInfo.label}!`,
    container: `Выкиньте это в ${wasteInfo.containerColor} контейнер!`,
    advice: `А ещё вот вам совет от нашей нейросети:\n${wasteInfo.advice}`,
  };
}
