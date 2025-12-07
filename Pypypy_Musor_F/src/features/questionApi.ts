import { baseApi } from "./baseApi";

export interface Answer {
  id: string;
  questionId: string;
  text: string;
  isRight: boolean;
}

export interface Question {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  answers: Answer[];
}

export const questionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuestions: builder.query<Question[], void>({
      query: () => "api/questions",
      providesTags: ["Question"],
    }),
  }),
});

export const {
  useGetAllQuestionsQuery,
} = questionApi;