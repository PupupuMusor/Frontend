"use client"

import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

type Achievement = {
  id: string
  image: string
  title: string
  users: {
    name: string
    date: string
  }[]
}

const achievements: Achievement[] = [
  {
    id: "1",
    image: "/achievements/eco-hero.png",
    title: "Эко-герой",
    users: [
      { name: "Alex", date: "12.10.2024" },
      { name: "Maria", date: "18.10.2024" },
    ],
  },
  {
    id: "2",
    image: "/achievements/recycle-master.png",
    title: "Мастер сортировки",
    users: [
      { name: "Denis", date: "20.10.2024" },
      { name: "Anna", date: "21.10.2024" },
      { name: "Oleg", date: "25.10.2024" },
    ],
  },
  {
    id: "3",
    image: "/achievements/first-step.png",
    title: "Первый шаг",
    users: [
      { name: "Kate", date: "01.11.2024" },
    ],
  },
]

export function AchievementsCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="mx-auto w-full max-w-xl">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {achievements.map((ach) => (
            <CarouselItem key={ach.id}>
              <Card className="rounded-3xl">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <div className="relative w-32 h-32">
                    <img
                    src={ach.image}
                    alt={ach.title}
                    className="w-32 h-32 object-contain"
                    />
                  </div>

                  <h3 className="text-2xl font-bold">{ach.title}</h3>

                  <div className="w-full bg-gray-50 rounded-xl p-4 text-left">
                    <div className="font-semibold mb-2">Получили:</div>
                    <div className="space-y-1">
                      {ach.users.map((user, idx) => (
                        <div key={idx} className="text-sm flex justify-between">
                          <span>{user.name}</span>
                          <span className="text-gray-500">{user.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="text-muted-foreground py-3 text-center text-sm">
        Слайд {current} из {count}
      </div>
    </div>
  )
}
