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

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const allTimeRating = [
  { id: 1, nickname: "EcoHero", points: 120 },
  { id: 2, nickname: "GreenBoy", points: 95 },
  { id: 3, nickname: "RecycleGirl", points: 80 },
  { id: 4, nickname: "PlasticHunter", points: 60 },
];

const weekRating = [
  { id: 1, nickname: "EcoHero", points: 25 },
  { id: 2, nickname: "PlasticHunter", points: 20 },
  { id: 3, nickname: "GreenBoy", points: 15 },
];

export const RatingModal: React.FC<RatingModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-2xl relative">

        <button
          className="absolute top-6 right-6 text-gray-400 hover:text-black text-3xl"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-3xl font-bold text-center mb-6">
          Рейтинг участников
        </h2>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="all">Всё время</TabsTrigger>
            <TabsTrigger value="week">Неделя</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>№</TableHead>
                  <TableHead>Никнейм</TableHead>
                  <TableHead className="text-right">Баллы</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allTimeRating.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.nickname}</TableCell>
                    <TableCell className="text-right font-bold">
                      {user.points}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="week">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>№</TableHead>
                  <TableHead>Никнейм</TableHead>
                  <TableHead className="text-right">Баллы</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {weekRating.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.nickname}</TableCell>
                    <TableCell className="text-right font-bold">
                      {user.points}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>

        <Button
          className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-lg py-6"
          onClick={onClose}
        >
          Закрыть
        </Button>
      </div>
    </div>
  );
};
