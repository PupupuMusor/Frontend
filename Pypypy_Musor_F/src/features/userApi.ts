import { baseApi } from "./baseApi";

export interface User {
  id: string;
  nickname: string;
  points: number;
}

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/users",
      providesTags: ["User"],
    }),

    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),

    createUser: builder.mutation<User, { nickname: string }>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    addPoints: builder.mutation<
      User,
      { userId: string; points: number }
    >({
      query: ({ userId, points }) => ({
        url: `/users/${userId}/points`,
        method: "PATCH",
        body: { points },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useAddPointsMutation,
} = usersApi;
