import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useGetAllUsersQuery } from "@/features/userApi";
import { AchievementsCarousel } from "./AchievementsCarousel";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RatingModal: React.FC<RatingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { data: users = [], isLoading, isError } = useGetAllUsersQuery();

  const allTimeRating = users
    .slice()
    .sort((a, b) => (b.scores || 0) - (a.scores || 0))
    .map((user, index) => ({
      id: index + 1,
      nickname: user.login,
      points: user.scores || 0,
    }));

  const weekRating = users
    .slice()
    .sort((a, b) => (b.scores || 0) - (a.scores || 0))
    .map((user, index) => ({
      id: index + 1,
      nickname: user.login,
      points: user.scores || 0,
    }));

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-3xl p-8 w-full relative 
                      flex flex-col
                      max-w-[95%] max-h-[90vh] 
                      sm:max-w-full
                      md:max-w-[80%] md:max-h-[70%] 
                      lg:max-w-[80%] lg:max-h-[70%] lg:min-h-[40%]
                      overflow-y-auto"
      >
        <button
          className="absolute top-6 right-6 text-gray-400 hover:text-black text-3xl z-10"
          onClick={onClose}
        >
          ×
        </button>

        {/* Заголовок всегда сверху */}
        <h2 className="text-3xl font-bold text-center mb-6">
          Рейтинг и ачивки
        </h2>

        {/* Основной контент - растягивается и прокручивается */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mb-4"></div>
              <p className="text-lg text-gray-600">Загрузка рейтинга...</p>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-lg text-red-500 mb-4">Ошибка загрузки рейтинга</p>
              <Button
                onClick={onClose}
                className="bg-yellow-400 hover:bg-yellow-500"
              >
                Закрыть
              </Button>
            </div>
          ) : (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="all">Всё время</TabsTrigger>
                <TabsTrigger value="week">Неделя</TabsTrigger>
                <TabsTrigger value="achievements">Ачивки</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                {allTimeRating.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Пока нет данных для рейтинга</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">№</TableHead>
                        <TableHead>Никнейм</TableHead>
                        <TableHead className="text-right w-32">Баллы</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allTimeRating.map((user) => (
                        <TableRow key={`${user.id}-${user.nickname}`}>
                          <TableCell className="font-medium">{user.id}</TableCell>
                          <TableCell className="font-medium">{user.nickname}</TableCell>
                          <TableCell className="text-right font-bold text-green-600">
                            {user.points}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>

              <TabsContent value="week" className="mt-0">
                {weekRating.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Пока нет данных для недельного рейтинга</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">№</TableHead>
                        <TableHead>Никнейм</TableHead>
                        <TableHead className="text-right w-32">Баллы</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {weekRating.map((user) => (
                        <TableRow key={`week-${user.id}-${user.nickname}`}>
                          <TableCell className="font-medium">{user.id}</TableCell>
                          <TableCell className="font-medium">{user.nickname}</TableCell>
                          <TableCell className="text-right font-bold text-green-600">
                            {user.points}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>

              <TabsContent value="achievements" className="mt-0">
                {/* Используем компонент карусели вместо таблицы */}
                <AchievementsCarousel />
              </TabsContent>
            </Tabs>
          )}
        </div>

        <Button
          className="w-full max-w-xs mx-auto mt-6 bg-yellow-400 hover:bg-yellow-500 text-lg py-6"
          onClick={onClose}
        >
          Закрыть
        </Button>
      </div>
    </div>
  );
};