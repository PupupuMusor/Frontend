import { Button } from "../ui/button";

export const Choice: React.FC<React.PropsWithChildren> = () => {
  return (
    <div className="mt-20 mx-auto max-w-2xl flex items-center justify-between">
      <div className="flex flex-col gap-4 max-w-2xs text-xl text-center">
        <p>Не знаешь куда выбросить мусор? Жми сюда!</p>
        <Button className="h-20 rounded-3xl text-2xl">Сфотографировать</Button>
      </div>
      <div className="flex flex-col gap-4 max-w-2xs text-xl text-center">
        <p>Уже знаешь куда выкинуть? Проверь себя и получи баллы!</p>
        <Button className="h-20 rounded-3xl text-2xl">Проверить себя</Button>
      </div>
    </div>
  );
};
