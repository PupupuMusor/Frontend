import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Question = {
  text: string;
  correct: "yes" | "no";
};

export function QuizModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Заглушка: временная база вопросов
  const fakeQuestions: Question[] = [
    { text: "Нужно ли снимать крышку с пластиковой бутылки?", correct: "no" },
    { text: "Можно ли сдавать стекло с этикеткой?", correct: "yes" },
    {
      text: "Опасные отходы можно выбрасывать в обычный контейнер?",
      correct: "no",
    },
    { text: "Бумагу можно сдавать, если на ней есть скобы?", correct: "yes" },
    { text: "Стаканчики из-под кофе идут в макулатуру?", correct: "no" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [username, setUsername] = useState("");

  const question = fakeQuestions[currentIndex];

  const handleAnswer = (answer: "yes" | "no") => {
    if (answer === question.correct) {
      setScore((s) => s + 10); // начисляем 10 баллов
    }

    if (currentIndex === fakeQuestions.length - 1) {
      setIsFinished(true);
      return;
    }

    setCurrentIndex((i) => i + 1);
  };

  const resetState = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setUsername("");
  };

  const handleSubmit = () => {
    console.log("Результат отправлен:", {
      username,
      score,
    });

    onClose();
    resetState();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Проверка знаний
          </DialogTitle>
        </DialogHeader>

        {isFinished ? (
          <div className="flex flex-col items-center gap-6 py-4">
            <p className="text-xl font-semibold">
              Вы заработали:
              <span className="text-green-600"> {score} баллов</span>
            </p>

            <Input
              placeholder="Введите имя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-lg"
            />

            <Button
              onClick={handleSubmit}
              disabled={!username.trim()}
              className="w-full text-lg"
            >
              Завершить
            </Button>
          </div>
        ) : (
          /* Основной экран вопросов */
          <div className="flex flex-col items-center gap-6 py-4">
            <p className="text-xl text-center font-medium">{question.text}</p>

            <p className="text-slate-500 text-sm">
              Вопрос {currentIndex + 1} из {fakeQuestions.length}
            </p>

            <div className="flex gap-4">
              <Button
                onClick={() => handleAnswer("yes")}
                variant="outline"
                className="px-8 py-4 text-lg"
              >
                Да
              </Button>

              <Button
                onClick={() => handleAnswer("no")}
                variant="outline"
                className="px-8 py-4 text-lg"
              >
                Нет
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
