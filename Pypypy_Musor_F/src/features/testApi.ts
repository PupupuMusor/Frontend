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

export const testsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTests: builder.query<Test[], void>({
      query: () => "/tests",
      providesTags: ["Test"],
    }),

    getTestById: builder.query<Test, string>({
      query: (id) => `/tests/${id}`,
    }),

    submitTest: builder.mutation<
      { score: number },
      { testId: string; answers: string[] }
    >({
      query: (body) => ({
        url: "/tests/submit",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetTestsQuery,
  useGetTestByIdQuery,
  useSubmitTestMutation,
} = testsApi;
