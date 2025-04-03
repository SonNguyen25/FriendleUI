"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Grid3X3, Trophy, BarChart2, User } from "lucide-react"
import type { Screen } from "../components/PhoneMockup"
import { HomePerformanceChart } from "../charts/HomePerformanceChart"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [gameType, setGameType] = useState<"wordle" | "connections">("wordle")

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 flex-1 overflow-auto hide-scrollbar">
        <h1 className="text-xl font-bold mb-4">Welcome back, Joshua!</h1>

        <Card className="mb-4">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">Your Performance</h2>
            <Tabs
              value={gameType}
              onValueChange={(value) => setGameType(value as "wordle" | "connections")}
              className="mb-2"
            >
              <TabsList className="w-full">
                <TabsTrigger value="wordle" className="w-1/2">
                  Wordle
                </TabsTrigger>
                <TabsTrigger value="connections" className="w-1/2">
                  Connections
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="h-40">
              <HomePerformanceChart gameType={gameType} />
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-sm text-gray-500">Current Streak</p>
                <p className="font-bold">{gameType === "wordle" ? "12" : "8"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Max Streak</p>
                <p className="font-bold">{gameType === "wordle" ? "24" : "15"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{gameType === "wordle" ? "Avg. Guesses" : "Avg. Mistakes"}</p>
                <p className="font-bold">{gameType === "wordle" ? "3.8" : "1.7"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-lg font-semibold mb-2">Today's Games</h2>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center"
            onClick={() => onNavigate("game")}
          >
            <div className="text-lg mb-1">Wordle</div>
            <div className="text-xs text-gray-500">Daily Challenge</div>
          </Button>
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center"
            onClick={() => onNavigate("connections")}
          >
            <div className="text-lg mb-1">Connections</div>
            <div className="text-xs text-gray-500">Daily Challenge</div>
          </Button>
        </div>

        <Button variant="default" className="w-full mb-4" onClick={() => onNavigate("game-select")}>
          Play More Games
        </Button>

        <h2 className="text-lg font-semibold mb-2">Friend Activity</h2>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">D</div>
                  <span>Daisy</span>
                </div>
                <div className="text-sm">Wordle: 4/6</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">M</div>
                  <span>Michael</span>
                </div>
                <div className="text-sm">Wordle: 3/6</div>
              </div>
              <Button variant="ghost" size="sm" className="w-full" onClick={() => onNavigate("leaderboard")}>
                View All
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="border-t flex justify-around p-2">
        <Button
          variant="ghost"
          size="icon"
          className="flex flex-col items-center text-xs"
          onClick={() => onNavigate("home")}
        >
          <Home size={20} />
          <span>Home</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="flex flex-col items-center text-xs"
          onClick={() => onNavigate("game-select")}
        >
          <Grid3X3 size={20} />
          <span>Games</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="flex flex-col items-center text-xs"
          onClick={() => onNavigate("leaderboard")}
        >
          <Trophy size={20} />
          <span>Social</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="flex flex-col items-center text-xs"
          onClick={() => onNavigate("insights")}
        >
          <BarChart2 size={20} />
          <span>Insights</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="flex flex-col items-center text-xs"
          onClick={() => onNavigate("profile")}
        >
          <User size={20} />
          <span>Profile</span>
        </Button>
      </div>
    </div>
  )
}

