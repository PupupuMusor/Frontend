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
  { id: 1, nickname: "EcoHero", points: 25 },
  { id: 2, nickname: "PlasticHunter", points: 20 },
  { id: 3, nickname: "GreenBoy", points: 15 },
	{ id: 1, nickname: "EcoHero", points: 25 },
  { id: 2, nickname: "PlasticHunter", points: 20 },
  { id: 3, nickname: "GreenBoy", points: 15 },
  { id: 1, nickname: "EcoHero", points: 25 },
  { id: 2, nickname: "PlasticHunter", points: 20 },
  { id: 3, nickname: "GreenBoy", points: 15 },
	  { id: 1, nickname: "EcoHero", points: 25 },
  { id: 2, nickname: "PlasticHunter", points: 20 },
  { id: 3, nickname: "GreenBoy", points: 15 },
  { id: 1, nickname: "EcoHero", points: 25 },
  { id: 2, nickname: "PlasticHunter", points: 20 },
  { id: 3, nickname: "GreenBoy", points: 15 },
	{ id: 1, nickname: "EcoHero", points: 25 },
  { id: 2, nickname: "PlasticHunter", points: 20 },
  { id: 3, nickname: "GreenBoy", points: 15 },
  { id: 1, nickname: "EcoHero", points: 25 },
  { id: 2, nickname: "PlasticHunter", points: 20 },
  { id: 3, nickname: "GreenBoy", points: 15 },
	  { id: 1, nickname: "EcoHero", points: 25 },
  { id: 2, nickname: "PlasticHunter", points: 20 },
  { id: 3, nickname: "GreenBoy", points: 15 },
  { id: 1, nickname: "EcoHero", points: 25 },
  { id: 2, nickname: "PlasticHunter", points: 20 },
  { id: 3, nickname: "GreenBoy", points: 15 },
	{ id: 1, nickname: "EcoHero", points: 25 },
  { id: 2, nickname: "PlasticHunter", points: 20 },
  { id: 3, nickname: "GreenBoy", points: 15 },
  { id: 1, nickname: "EcoHero", points: 25 },
  { id: 2, nickname: "PlasticHunter", points: 20 },
  { id: 3, nickname: "GreenBoy", points: 15 },
];

const achievements = [
  {
    id: 1,
    title: "♻ Первый переработанный отход",
    users: ["EcoHero", "GreenBoy", "RecycleGirl"],
  },
  {
    id: 2,
    title: "📸 10 распознаваний",
    users: ["EcoHero", "PlasticHunter"],
  },
  {
    id: 3,
    title: "🔥 7 дней подряд",
    users: ["RecycleGirl"],
  },
  {
    id: 4,
    title: "🥇 100 баллов",
    users: ["EcoHero"],
  },
];

export const RatingModal: React.FC<RatingModalProps> = ({
  isOpen,
  onClose,
}) => {
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
					<Tabs defaultValue="all" className="w-full">
						<TabsList className="grid w-full grid-cols-3 mb-6">
							<TabsTrigger value="all">Всё время</TabsTrigger>
							<TabsTrigger value="week">Неделя</TabsTrigger>
							<TabsTrigger value="achievements">Ачивки</TabsTrigger>
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

						<TabsContent value="achievements">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Ачивка</TableHead>
										<TableHead>Пользователи</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{achievements.map((item) => (
										<TableRow key={item.id}>
											<TableCell className="font-semibold">
												{item.title}
											</TableCell>
											<TableCell className="text-gray-600">
												{item.users.join(", ")}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TabsContent>
					</Tabs>
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