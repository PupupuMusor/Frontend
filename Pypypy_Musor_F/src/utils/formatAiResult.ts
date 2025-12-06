// utils/formatAiResult.ts
// utils/formatAiResult.ts
import type { PredictionResponse } from "@/types/ai";
import { wasteInfoMap } from "./wasteMapping";

export const formatAiResult = (
  result: PredictionResponse
): {
  title: string;
  container: string;
  advice: string;
  wasteType?: string;
  recognized: boolean;
} => {
  const prediction = result.predictions[0];
  
  if (!prediction || prediction.confidence < 0.5) {
    return {
      title: "Не удалось распознать",
      container: "Попробуйте сфотографировать ещё раз или выберите категорию вручную",
      advice: "",
      recognized: false
    };
  }

  const label = prediction.label.toLowerCase();
  const info = wasteInfoMap[label] || wasteInfoMap.plastic;
  
  return {
    title: `Это ${info.label}!`,
    container: `Отнесите в ${info.containerColor} контейнер`,
    advice: info.advice,
    wasteType: label,
    recognized: true
  };
};