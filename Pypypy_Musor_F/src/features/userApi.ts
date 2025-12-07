import { baseApi } from "./baseApi";

export interface User {
  id: string;
  login: string;
  scores: number;
}

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => "api/users/all",
      providesTags: ["User"],
    }),

    getUserByLogin: builder.query<User, string>({
      query: (login) => `api/users/user/${login}`,
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByLoginQuery,
} = usersApi;
