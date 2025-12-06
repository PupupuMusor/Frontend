export interface AiBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface AiPrediction {
  label: string;
  confidence: number;
  box: AiBox;
}

export interface PredictionResponse {
  predictions: AiPrediction[];
  inferenceTimeMs: number;
}
