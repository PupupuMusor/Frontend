import { useState } from "react";
import { Button } from "../ui/button";
import { CameraModal } from "../modals/CameraModal";
import { QuizModal } from "../modals/QuizModal";

export const Choice: React.FC<React.PropsWithChildren> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const handleSubmit = (nickname: string) => {
    console.log("Никнейм пользователя:", nickname);
  };

  return (
    <>
      <div className="mx-auto max-w-2xl flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0 text-slate-700 px-4">
        <div className="flex flex-col gap-4 max-w-2xs text-lg md:text-xl text-center">
          <p>Не знаешь куда выбросить мусор? Жми сюда!</p>
          <Button
            className="h-16 md:h-20 rounded-3xl text-xl md:text-2xl text-slate-700 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            Сфотографировать
          </Button>
        </div>
        <div className="flex flex-col gap-4 max-w-2xs text-lg md:text-xl text-center">
          <p>Уже знаешь куда выкинуть? Проверь себя и получи баллы!</p>
          <Button
            className="h-16 md:h-20 rounded-3xl text-xl md:text-2xl text-slate-700 cursor-pointer"
            onClick={() => setIsQuizOpen(true)}
          >
            Проверить себя
          </Button>
        </div>
      </div>

      <CameraModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />

      <QuizModal open={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </>
  );
};
