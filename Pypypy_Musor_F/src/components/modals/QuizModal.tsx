import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCalculateScoreMutation, useSubmitScoreMutation } from "@/features/scoreApi";
import { useGetAllUsersQuery } from "@/features/userApi";
import { useGetAllQuestionsQuery, type Question as ApiQuestion } from "@/features/questionApi";

type QuizQuestion = {
  id: string;
  text: string;
  answers: {
    id: string;
    text: string;
    isRight: boolean;
  }[];
};

export function QuizModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { data: apiQuestions = [], isLoading: isLoadingQuestions } = useGetAllQuestionsQuery();
  
  const quizQuestions: QuizQuestion[] = apiQuestions.map((q: ApiQuestion) => ({
    id: q.id,
    text: q.text,
    answers: q.answers.map(a => ({
      id: a.id,
      text: a.text,
      isRight: a.isRight
    }))
  }));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [nickname, setNickname] = useState("");
  const { data: users = [] } = useGetAllUsersQuery();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isValidUser, setIsValidUser] = useState(false);

  const [quizResult, setQuizResult] = useState<{
    points: number;
    totalPoints: number;
    correctAnswers: number;
    totalQuestions: number;
  } | null>(null);

  const filteredUsers = users.filter(
    (user) =>
      typeof user.login === "string" &&
      user.login.toLowerCase().includes(nickname.toLowerCase())
  );
  
  const [calculateScore] = useCalculateScoreMutation();
  const [submitScore] = useSubmitScoreMutation();

  const currentQuestion = quizQuestions[currentIndex];

  useEffect(() => {
    if (apiQuestions.length > 0) {
      setIsLoading(false);
    }
  }, [apiQuestions]);

  const handleAnswer = (answerId: string) => {
    if (!currentQuestion) return;

    setUserAnswers(prev => [...prev, answerId]);

    if (currentIndex === quizQuestions.length - 1) {
      setIsFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const calculateTotalScore = async () => {
    if (!nickname.trim() || !isValidUser) {
      alert("Пожалуйста, выберите существующего пользователя");
      return;
    }

    setIsCalculating(true);
    try {
      const result = await calculateScore({
        login: nickname,
        answerIds: userAnswers
      }).unwrap();
      
      setQuizResult(result);
      
    } catch (error) {
      console.error("Ошибка при расчете баллов:", error);
      setQuizResult({
        points: 0,
        totalPoints: quizQuestions.length * 10,
        correctAnswers: 0,
        totalQuestions: quizQuestions.length
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSubmitFinalScore = async () => {
    if (!quizResult || !nickname.trim() || !isValidUser) return;

    setIsSubmitting(true);
    try {
      // Отправляем финальный балл на сервер
      await submitScore({
        login: nickname,
        scores: quizResult.points
      }).unwrap();
      
      console.log("Результат отправлен:", {
        nickname,
        score: quizResult.points,
        totalScore: quizResult.totalPoints
      });

      onClose();
      resetState();
    } catch (error) {
      console.error("Ошибка при отправке результатов:", error);
      onClose();
      resetState();
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetState = () => {
    setCurrentIndex(0);
    setUserAnswers([]);
    setIsFinished(false);
    setQuizResult(null);
    setNickname("");
    setIsCalculating(false);
    setIsSubmitting(false);
    setIsValidUser(false);
    setShowSuggestions(false);
  };

  const handleClose = () => {
    onClose();
    resetState();
  };

  const handleSelectUser = (userLogin: string) => {
    setNickname(userLogin);
    setIsValidUser(true);
    setShowSuggestions(false);
  };

  if (isLoading || isLoadingQuestions) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent 
          className="max-w-md"
          aria-describedby="quiz-description"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Проверка знаний
            </DialogTitle>
            <DialogDescription id="quiz-description" className="sr-only">
              Тест на знание правил сортировки мусора
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
            <p className="text-lg text-gray-600">Загрузка вопросов...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (quizQuestions.length === 0) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent 
          className="max-w-md"
          aria-describedby="quiz-description"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Проверка знаний
            </DialogTitle>
            <DialogDescription id="quiz-description" className="sr-only">
              Тест на знание правил сортировки мусора
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-6 py-4">
            <p className="text-xl text-center text-gray-600">
              Вопросы временно недоступны
            </p>
            <Button onClick={handleClose} className="w-full text-lg">
              Закрыть
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent 
        className="max-w-md"
        aria-describedby="quiz-description"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Проверка знаний
          </DialogTitle>
          <DialogDescription id="quiz-description" className="sr-only">
            Тест на знание правил сортировки мусора
          </DialogDescription>
        </DialogHeader>

        {isFinished ? (
          <div className="flex flex-col items-center gap-6 py-4">
            {/* Если результаты уже рассчитаны */}
            {quizResult ? (
              <div className="text-center space-y-4 w-full">
                <p className="text-xl font-semibold">
                  Вы заработали:
                  <span className="text-green-600 ml-2">+{quizResult.points} баллов</span>
                </p>
                
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <p className="text-lg text-gray-700">
                    Правильных ответов: {quizResult.correctAnswers} из {quizResult.totalQuestions}
                  </p>
                  <p className="text-lg font-medium">
                    Результат: {quizResult.points} из {quizResult.totalPoints} баллов
                  </p>
                </div>

                <div className="flex gap-4 w-full mt-4">
                  <Button
                    onClick={handleSubmitFinalScore}
                    disabled={isSubmitting}
                    className="flex-1 text-lg bg-green-500 hover:bg-green-600"
                  >
                    {isSubmitting ? "Отправка..." : "Сохранить результат"}
                  </Button>
                  
                  <Button
                    onClick={handleClose}
                    variant="outline"
                    className="flex-1 text-lg"
                  >
                    Закрыть
                  </Button>
                </div>
              </div>
            ) : (
              /* Если нужно ввести никнейм для расчета */
              <>
                <div className="text-center space-y-4">
                  <p className="text-xl font-semibold">
                    Тест завершен!
                  </p>
                  <p className="text-lg text-gray-600">
                    Вы ответили на все {quizQuestions.length} вопросов.
                  </p>
                  <p className="text-lg">
                    Введите ваш никнейм для расчета результатов
                  </p>
                </div>

                <div className="relative w-full mb-6">
                  <Input
                    type="text"
                    placeholder="Введите ваш никнейм"
                    value={nickname}
                    onChange={(e) => {
                      setNickname(e.target.value);
                      setShowSuggestions(true);
                      setIsValidUser(false);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    className="text-lg py-3 px-4 w-full"
                  />

                  {showSuggestions && filteredUsers.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border rounded-xl mt-2 max-h-48 overflow-y-auto z-20 shadow-lg">
                      {filteredUsers.map((user) => (
                        <div
                          key={user.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
                          onMouseDown={() => handleSelectUser(user.login)}
                          onTouchStart={() => handleSelectUser(user.login)}
                        >
                          {user.login}
                        </div>
                      ))}
                    </div>
                  )}

                  {showSuggestions && nickname && filteredUsers.length === 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border rounded-xl mt-2 p-3 text-sm text-red-500 text-left shadow-lg z-20">
                      Пользователь не найден
                    </div>
                  )}
                </div>

                {!isValidUser && nickname && (
                  <p className="text-sm text-red-500 -mt-4">
                    Пожалуйста, выберите существующего пользователя из списка
                  </p>
                )}

                <div className="flex gap-4 w-full">
                  <Button
                    onClick={handleClose}
                    variant="outline"
                    className="flex-1 text-lg"
                  >
                    Отмена
                  </Button>
                  
                  <Button
                    onClick={calculateTotalScore}
                    disabled={!isValidUser || isCalculating}
                    className="flex-1 text-lg"
                  >
                    {isCalculating ? "Расчет..." : "Рассчитать баллы"}
                  </Button>
                </div>
              </>
            )}
          </div>
        ) : (
          /* Основной экран вопросов */
          <div className="flex flex-col items-center gap-6 py-4">
            <p className="text-xl text-center font-medium">
              {currentQuestion?.text || "Вопрос не найден"}
            </p>

            <p className="text-slate-500 text-sm">
              Вопрос {currentIndex + 1} из {quizQuestions.length}
            </p>

            <div className="flex flex-col gap-4 w-full">
              {currentQuestion?.answers.map((answer) => (
                <Button
                  key={answer.id}
                  onClick={() => handleAnswer(answer.id)}
                  variant="outline"
                  className="px-8 py-4 text-lg w-full justify-start hover:bg-green-50"
                >
                  {answer.text}
                </Button>
              ))}
            </div>
            
            <div className="text-sm text-gray-500">
              Выбрано ответов: {userAnswers.length}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}