export type TopEcologistsProps = {
  names?: string[];
};

export default function TopEcologists({
  names = ["АрбузАрбуз", "Red Flag", "Подружки", "С нюансом", "Пингвины"],
}: TopEcologistsProps) {
  const list = names.slice(0, 5);

  return (
    <aside aria-label="Топ-5 экологистов" className=" flex justify-center">
      <div className="mt-28 h-64 md:h-96 w-full max-w-4xl bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl px-4 md:px-6 py-6 md:py-10">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-wide text-slate-700">
            ТОП-5 ЭКОЛОГИСТОВ
          </h2>

          <ol className="mt-6 md:mt-10 space-y-1 md:space-y-2 text-xl md:text-2xl text-slate-600">
            {list.map((name, idx) => (
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
          </ol>
        </div>
      </div>
    </aside>
  );
}
