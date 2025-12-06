export type TopEcologistsProps = {
  names?: string[];
};

export default function TopEcologists({
  names = ["АрбузАрбуз", "Red Flag", "Подружки", "С нюансом", "Пингвины"],
}: TopEcologistsProps) {
  const list = names.slice(0, 5);

  return (
    <aside
      aria-label="Топ-5 экологистов"
      className="fixed inset-x-0 bottom-0 z-40 flex justify-center"
    >
      <div className="h-96 w-full max-w-4xl bg-white/90 backdrop-blur-sm shadow-xl rounded-t-3xl px-6 py-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-wide text-slate-700">
            ТОП-5 ЭКОЛОГИСТОВ
          </h2>

          <ol className="mt-10 space-y-2 text-2xl text-slate-600">
            {list.map((name, idx) => (
              <li
                key={name + idx}
                className="flex items-center justify-center gap-3"
              >
                <span className="inline-flex items-center justify-center w-7 h-7 text-2xl rounded-full bg-green-100 text-green-800 font-medium">
                  {idx + 1}
                </span>
                <span className="truncate max-w-xs">{name}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </aside>
  );
}
