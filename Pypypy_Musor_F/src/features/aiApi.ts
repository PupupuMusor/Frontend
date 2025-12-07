import type { PredictionResponse } from "@/types/ai";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const aiApi = createApi({
  reducerPath: "aiApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_AI_API_URL || "http://localhost:8080",
  }),
  endpoints: (builder) => ({
    analyzeImage: builder.mutation<PredictionResponse, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: "/api/ImageAnalysis/analyze",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { useAnalyzeImageMutation } = aiApi;
