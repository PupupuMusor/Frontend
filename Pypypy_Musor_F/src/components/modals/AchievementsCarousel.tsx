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
import { useGetAllAchievementsQuery } from "@/features/achievApi"

export function AchievementsCarousel() {
  const { data: achievements = [], isLoading, isError } = useGetAllAchievementsQuery()

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

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-xl">
        <div className="rounded-3xl border p-6 flex flex-col items-center justify-center h-80">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
          <p className="text-lg text-gray-600">Загрузка ачивок...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="mx-auto w-full max-w-xl">
        <div className="rounded-3xl border p-6 flex flex-col items-center justify-center h-80">
          <p className="text-lg text-red-500 mb-2">Ошибка загрузки ачивок</p>
          <p className="text-gray-600">Попробуйте обновить страницу</p>
        </div>
      </div>
    )
  }

  if (achievements.length === 0) {
    return (
      <div className="mx-auto w-full max-w-xl">
        <div className="rounded-3xl border p-6 flex flex-col items-center justify-center h-80">
          <p className="text-lg text-gray-600 mb-2">Ачивок пока нет</p>
          <p className="text-gray-500">Будьте первыми!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {achievements.map((ach) => (
            <CarouselItem key={ach.id}>
              <Card className="rounded-3xl">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <div className="relative w-32 h-32">
                    {ach.iconPath ? (
                      <img
                        src={ach.iconPath}
                        alt={ach.name}
                        className="w-32 h-32 object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "/achievements/default.png"
                          e.currentTarget.className = "w-32 h-32 object-contain opacity-50"
                        }}
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-4xl">🏆</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{ach.name}</h3>
                    <p className="text-gray-600">{ach.description}</p>
                    <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      +{ach.pointsReward} баллов
                    </div>
                  </div>

                  <div className="w-full bg-gray-50 rounded-xl p-4 text-left">
                    <div className="font-semibold mb-2">
                      Получили: {ach.userIds.length} пользователей
                    </div>
                    {ach.userIds.length > 0 ? (
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {ach.userIds.map((user, idx) => (
                          <div key={`${user.userId}-${idx}`} className="text-sm flex justify-between items-center">
                            <div>
                              <span className="font-medium">{user.login}</span>
                              {user.fullName && (
                                <span className="text-gray-500 text-xs ml-2">({user.fullName})</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">Ещё никто не получил эту ачивку</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {achievements.length > 1 && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>

      {achievements.length > 1 && (
        <div className="text-muted-foreground py-3 text-center text-sm">
          Слайд {current} из {count}
        </div>
      )}
    </div>
  )
}