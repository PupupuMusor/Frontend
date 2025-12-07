import { baseApi } from "./baseApi";

export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Test {
  id: string;
  title: string;
  questions: TestQuestion[];
}

export interface QuizResult {
  points: number;
  totalPoints: number;
  correctAnswers: number;
  totalQuestions: number;
}

export const scoreApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    calculateScore: builder.mutation<
      QuizResult,
      { login: string; answerIds: string[] }
    >({
      query: ({ login, answerIds }) => ({
        url: `/api/scoring/${login}/calculate`,
        method: "POST",
        body: { answerIds },
      }),
    }),
    submitScore: builder.mutation<
      { scores: number },
      { login: string; scores: number }
    >({
      query: ({ login, scores }) => ({
        url: `api/scoring/${login}/score`,
        method: "POST",
        body: { scores },
      }),
    }),
  }),
});

export const {
  useCalculateScoreMutation,
  useSubmitScoreMutation,
} = scoreApi;