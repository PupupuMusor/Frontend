import { baseApi } from "./baseApi";

export interface AchievementUser {
  userId: string;
  login: string;
  fullName: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  pointsReward: number;
  iconPath: string;
  userIds: AchievementUser[];
}

export const achieveApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAchievements: builder.query<Achievement[], void>({
      query: () => "api/achievement",
      providesTags: ["Achievement"],
    }),
  }),
});

export const {
  useGetAllAchievementsQuery,
} = achieveApi;