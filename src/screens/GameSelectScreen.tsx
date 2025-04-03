"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, X } from "lucide-react"
import type { Screen } from "../components/PhoneMockup"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface GameSelectScreenProps {
  onNavigate: (screen: Screen) => void
}

export default function GameSelectScreen({ onNavigate }: GameSelectScreenProps) {
  const [selectedGame, setSelectedGame] = useState<"wordle" | "connections" | null>(null)
  const [selectedMode, setSelectedMode] = useState<"daily" | "weekly" | "custom" | "friend" | null>(null)
  const [aiTheme, setAiTheme] = useState("")
  const [showThemeSuggestions, setShowThemeSuggestions] = useState(false)

  const handleGameSelect = (game: "wordle" | "connections") => {
    setSelectedGame(game)
    setSelectedMode(null)
  }

  const handleModeSelect = (mode: "daily" | "weekly" | "custom" | "friend") => {
    setSelectedMode(mode)

    if (mode !== "custom") {
      if (selectedGame === "wordle") {
        onNavigate("game")
      } else {
        onNavigate("connections")
      }
    }
  }

  const handleStartGame = () => {
    if (selectedGame === "wordle") {
      onNavigate("game")
    } else {
      onNavigate("connections")
    }
  }

  const themeSuggestions = ["Animals", "Movies", "Sports", "Food", "Geography", "Science", "History", "Music"]

  return (
    <div className="flex flex-col h-full relative">
      <div className="p-3 border-b flex items-center">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("home")}>
          <ArrowLeft size={20} />
        </Button>
        <div className="flex-1 text-center font-bold">Select Game</div>
        <div className="w-8"></div>
      </div>

      <div className="flex-1 p-4 flex flex-col overflow-auto">
        <h2 className="text-lg font-semibold mb-4">Choose a game to play</h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card
            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedGame === "wordle" ? "ring-2 ring-gray-800 bg-gray-50" : ""
            }`}
            onClick={() => handleGameSelect("wordle")}
          >
            <div className="flex flex-col items-center">
              <div className="text-lg font-bold mb-2">Wordle</div>
              <p className="text-xs text-center text-gray-500">Guess the 5-letter word in 6 tries</p>
            </div>
          </Card>

          <Card
            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedGame === "connections" ? "ring-2 ring-gray-800 bg-gray-50" : ""
            }`}
            onClick={() => handleGameSelect("connections")}
          >
            <div className="flex flex-col items-center">
              <div className="text-lg font-bold mb-2">Connections</div>
              <p className="text-xs text-center text-gray-500">Find groups of related words</p>
            </div>
          </Card>
        </div>

        {selectedGame && (
          <>
            <h3 className="text-md font-semibold mb-3">Select mode</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Button
                variant={selectedMode === "daily" ? "default" : "outline"}
                onClick={() => handleModeSelect("daily")}
                className="h-auto py-2"
              >
                <div className="flex flex-col items-center">
                  <span className="font-semibold">Daily</span>
                  <span className="text-xs">Official daily puzzle</span>
                </div>
              </Button>

              <Button
                variant={selectedMode === "weekly" ? "default" : "outline"}
                onClick={() => handleModeSelect("weekly")}
                className="h-auto py-2"
              >
                <div className="flex flex-col items-center">
                  <span className="font-semibold">Weekly</span>
                  <span className="text-xs">Weekly challenge</span>
                </div>
              </Button>

              <Button
                variant={selectedMode === "custom" ? "default" : "outline"}
                onClick={() => handleModeSelect("custom")}
                className="h-auto py-2"
              >
                <div className="flex flex-col items-center">
                  <span className="font-semibold">AI-Generated</span>
                  <span className="text-xs">Custom AI puzzles</span>
                </div>
              </Button>

              <Button
                variant={selectedMode === "friend" ? "default" : "outline"}
                onClick={() => handleModeSelect("friend")}
                className="h-auto py-2"
              >
                <div className="flex flex-col items-center">
                  <span className="font-semibold">Friend</span>
                  <span className="text-xs">Play with friends</span>
                </div>
              </Button>
            </div>
          </>
        )}

        {selectedMode === "custom" && (
          <div className="mt-2 mb-4">
            <label className="block text-sm font-medium mb-1">AI-generated preferences</label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter keywords/themes"
                value={aiTheme}
                onChange={(e) => setAiTheme(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" size="icon" onClick={() => setShowThemeSuggestions(true)}>
                ?
              </Button>
            </div>
          </div>
        )}

        {selectedMode === "custom" && (
          <Button className="mt-2" disabled={!aiTheme.trim()} onClick={handleStartGame}>
            Start Game
          </Button>
        )}
      </div>

      {showThemeSuggestions && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-[250px] p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Theme Suggestions</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowThemeSuggestions(false)} className="h-6 w-6">
                <X size={16} />
              </Button>
            </div>
            <p className="text-sm text-gray-500 mb-3">Choose from popular themes</p>
            <div className="grid grid-cols-2 gap-2">
              {themeSuggestions.map((theme) => (
                <Button
                  key={theme}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setAiTheme(theme)
                    setShowThemeSuggestions(false)
                  }}
                >
                  {theme}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

