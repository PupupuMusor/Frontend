import { useState } from "react";
import { Button } from "../ui/button";
import { CameraModal } from "../modals/CameraModal";

export const Choice: React.FC<React.PropsWithChildren> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (nickname: string) => {
    console.log("Никнейм пользователя:", nickname);
  };

  return (
    <>
      <div className="mt-20 mx-auto max-w-2xl flex items-center justify-between">
        <div className="flex flex-col gap-4 max-w-2xs text-xl text-center">
          <p>Не знаешь куда выбросить мусор? Жми сюда!</p>
          <Button 
            className="h-20 rounded-3xl text-2xl"
            onClick={() => setIsModalOpen(true)}
          >
            Сфотографировать
          </Button>
        </div>
        <div className="flex flex-col gap-4 max-w-2xs text-xl text-center">
          <p>Уже знаешь куда выкинуть? Проверь себя и получи баллы!</p>
          <Button 
            className="h-20 rounded-3xl text-2xl"
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
    </>
  );
};
