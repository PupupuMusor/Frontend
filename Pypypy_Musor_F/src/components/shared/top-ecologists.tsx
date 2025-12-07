import { useGetAllUsersQuery } from "@/features/userApi";

export type TopEcologistsProps = {
  fallbackNames?: string[];
};

export default function TopEcologists({
  fallbackNames = ["АрбузАрбуз", "Red Flag", "Подружки", "С нюансом", "Пингвины"],
}: TopEcologistsProps) {
  const { data: users = [], isLoading, isError } = useGetAllUsersQuery();

  const topUsers = users
    .slice()
    .sort((a, b) => (b.scores || 0) - (a.scores || 0))
    .slice(0, 5);

  if (isLoading) {
    return (
      <aside aria-label="Топ-5 экологистов" className="flex justify-center">
        <div className="mt-28 h-64 md:h-96 w-full max-w-4xl bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl px-4 md:px-6 py-6 md:py-10">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-wide text-slate-700">
              ТОП-5 ЭКОЛОГИСТОВ
            </h2>
            <div className="mt-6 md:mt-10 space-y-1 md:space-y-2 text-xl md:text-2xl text-slate-600">
              {fallbackNames.map((name, idx) => (
                <li
                  key={name + idx}
                  className="flex items-center justify-center gap-3 opacity-50"
                >
                  <span className="inline-flex items-center justify-center w-6 md:w-7 h-6 md:h-7 text-xl md:text-2xl rounded-full bg-gray-100 text-gray-500 font-medium">
                    {idx + 1}
                  </span>
                  <span className="truncate max-w-[180px] md:max-w-xs">
                    {name}
                  </span>
                </li>
              ))}
            </div>
            <p className="mt-4 text-gray-500 text-sm">Загрузка рейтинга...</p>
          </div>
        </div>
      </aside>
    );
  }

  if (isError) {
    return (
      <aside aria-label="Топ-5 экологистов" className="flex justify-center">
        <div className="mt-28 h-64 md:h-96 w-full max-w-4xl bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl px-4 md:px-6 py-6 md:py-10">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-wide text-slate-700">
              ТОП-5 ЭКОЛОГИСТОВ
            </h2>
            <div className="mt-6 md:mt-10 space-y-1 md:space-y-2 text-xl md:text-2xl text-slate-600">
              {fallbackNames.map((name, idx) => (
                <li
                  key={name + idx}
                  className="flex items-center justify-center gap-3"
                >
                  <span className="inline-flex items-center justify-center w-6 md:w-7 h-6 md:h-7 text-xl md:text-2xl rounded-full bg-green-100 text-green-800 font-medium">
                    {idx + 1}
                  </span>
                  <span className="truncate max-w-[180px] md:max-w-xs">
                    {name}
                  </span>
                </li>
              ))}
            </div>
            <p className="mt-4 text-red-500 text-sm">Ошибка загрузки рейтинга</p>
          </div>
        </div>
      </aside>
    );
  }

  if (topUsers.length === 0) {
    return (
      <aside aria-label="Топ-5 экологистов" className="flex justify-center">
        <div className="mt-28 h-64 md:h-96 w-full max-w-4xl bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl px-4 md:px-6 py-6 md:py-10">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-wide text-slate-700">
              ТОП-5 ЭКОЛОГИСТОВ
            </h2>
            <p className="mt-6 md:mt-10 text-lg text-gray-600">
              Пока нет участников с баллами.
            </p>
            <p className="text-gray-500">Будьте первым!</p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside aria-label="Топ-5 экологистов" className="flex justify-center">
      <div className="mt-28 h-64 md:h-96 w-full max-w-4xl bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl px-4 md:px-6 py-6 md:py-10">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-wide text-slate-700">
            ТОП-5 ЭКОЛОГИСТОВ
          </h2>

          <ol className="mt-6 md:mt-10 space-y-2 md:space-y-3 text-xl md:text-2xl text-slate-600">
            {topUsers.map((user, idx) => (
              <li
                key={user.id}
                className="flex items-center justify-between bg-green-50/50 rounded-xl px-4 py-2 md:px-6 md:py-3"
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <span className="inline-flex items-center justify-center w-6 md:w-8 h-6 md:h-8 text-xl md:text-2xl rounded-full bg-green-100 text-green-800 font-bold">
                    {idx + 1}
                  </span>
                  <span className="truncate max-w-[120px] md:max-w-[180px] font-medium">
                    {user.login}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-700 font-bold text-base md:text-xl">
                    {user.scores || 0}
                  </span>
                  <span className="text-gray-500 text-sm">баллов</span>
                </div>
              </li>
            ))}
          </ol>
          
          {users.length > 5 && (
            <p className="mt-4 text-gray-500 text-sm">
              Всего участников: {users.length}
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}