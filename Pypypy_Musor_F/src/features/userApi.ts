import { baseApi } from "./baseApi";

export interface User {
  id: string;
  login: string;
  points: number;
}

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => "/users/all",
      providesTags: ["User"],
    }),

    getUserByLogin: builder.query<User, string>({
      query: (login) => `/users/user/${login}`,
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByLoginQuery,
} = usersApi;
