"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2, BarChart2, ArrowLeft, Copy, Check, User } from "lucide-react"
import type { Screen } from "../components/PhoneMockup"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"

interface GameResultsScreenProps {
  onNavigate: (screen: Screen) => void
  gameState: "won" | "lost"
  guesses: string[]
  targetWord: string
  stats: {
    played: number
    winPercentage: number
    currentStreak: number
    maxStreak: number
    guessDistribution: number[]
  }
}

export default function GameResultsScreen({
  onNavigate,
  gameState,
  guesses,
  targetWord,
  stats,
}: GameResultsScreenProps) {
  const [showShareModal, setShowShareModal] = useState(false)
  const [copied, setCopied] = useState(false)
  const [selectedFriends, setSelectedFriends] = useState<string[]>([])

  const numGuesses = guesses.length
  const maxDistribution = Math.max(...stats.guessDistribution)

  const friends = [
    { id: "1", name: "Daisy", avatar: "D" },
    { id: "2", name: "Michael", avatar: "M" },
    { id: "3", name: "Sarah", avatar: "S" },
    { id: "4", name: "John", avatar: "J" },
    { id: "5", name: "Emma", avatar: "E" },
  ]

  const toggleFriend = (id: string) => {
    setSelectedFriends((prev) => (prev.includes(id) ? prev.filter((friendId) => friendId !== id) : [...prev, id]))
  }

  const generateShareText = () => {
    const header = `Wordle ${stats.played} ${gameState === "won" ? numGuesses : "X"}/6\n\n`

    const grid = guesses
      .map((guess) => {
        return guess
          .split("")
          .map((letter, index) => {
            if (targetWord[index] === letter) {
              return "🟩" // Correct position
            } else if (targetWord.includes(letter)) {
              return "🟨" // Correct letter, wrong position
            } else {
              return "⬜" // Wrong letter
            }
          })
          .join("")
      })
      .join("\n")

    return header + grid
  }

  const handleCopyText = () => {
    navigator.clipboard.writeText(generateShareText())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShareWithFriends = () => {
    setShowShareModal(false)
    setSelectedFriends([])
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b flex items-center">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("home")}>
          <ArrowLeft size={20} />
        </Button>
        <div className="flex-1 text-center font-bold">Game Results</div>
        <Button variant="ghost" size="icon" onClick={() => setShowShareModal(true)}>
          <Share2 size={20} />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-1">{gameState === "won" ? "You won!" : "Game over"}</h2>
            <p className="text-sm text-gray-500 mb-1">The word was:</p>
            <p className="text-xl font-bold">{targetWord}</p>
          </div>

          <div className="flex justify-center mb-4">
            <div className="grid grid-rows-6 gap-1 scale-75 origin-top">
              {Array(6)
                .fill(null)
                .map((_, rowIndex) => (
                  <div key={rowIndex} className="grid grid-cols-5 gap-1">
                    {rowIndex < guesses.length
                      ? // Submitted guess
                        guesses[rowIndex]
                          .split("")
                          .map((letter, colIndex) => {
                            let bgColor = "bg-gray-400" // Wrong
                            if (targetWord[colIndex] === letter) {
                              bgColor = "bg-green-500" // Correct position
                            } else if (targetWord.includes(letter)) {
                              bgColor = "bg-yellow-500" // Correct letter, wrong position
                            }

                            return (
                              <div
                                key={colIndex}
                                className={`w-10 h-10 flex items-center justify-center font-bold text-white ${bgColor}`}
                              >
                                {letter}
                              </div>
                            )
                          })
                      : // Empty rows
                        Array(5)
                          .fill(null)
                          .map((_, colIndex) => (
                            <div
                              key={colIndex}
                              className="w-10 h-10 border border-gray-300 flex items-center justify-center"
                            ></div>
                          ))}
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Statistics</h3>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="flex flex-col">
                <span className="text-xl font-bold">{stats.played}</span>
                <span className="text-xs text-gray-500">Played</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">{stats.winPercentage}</span>
                <span className="text-xs text-gray-500">Win %</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">{stats.currentStreak}</span>
                <span className="text-xs text-gray-500">Current Streak</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">{stats.maxStreak}</span>
                <span className="text-xs text-gray-500">Max Streak</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Guess Distribution</h3>
            <div className="space-y-1">
              {stats.guessDistribution.map((count, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-4 text-xs mr-1">{index + 1}</div>
                  <div className="flex-1 h-6 flex items-center">
                    <div
                      className={`h-full flex items-center justify-end px-2 text-xs text-white
                        ${gameState === "won" && index + 1 === numGuesses ? "bg-green-500" : "bg-gray-400"}`}
                      style={{
                        width: count > 0 ? `${Math.max(7, (count / maxDistribution) * 100)}%` : "7%",
                      }}
                    >
                      {count}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-semibold mb-3">AI Analysis</h3>
            <div className="space-y-3 text-sm">
              <p>
                <span className="font-semibold">Performance:</span>{" "}
                {gameState === "won"
                  ? `You solved this puzzle in ${numGuesses} guesses, which is better than 68% of players.`
                  : `This was a challenging word that stumped 32% of players.`}
              </p>
              <p>
                <span className="font-semibold">Strategy insight:</span> Your second guess "{guesses[1] || "N/A"}" was
                particularly {gameState === "won" ? "effective" : "inefficient"}, revealing{" "}
                {gameState === "won" ? "3 new letters" : "only 1 new letter"}.
              </p>
              <p>
                <span className="font-semibold">Word knowledge:</span> "{targetWord}" is a{" "}
                {gameState === "won" ? "common" : "less common"} word that appears in approximately 0.002% of English
                text.
              </p>
              <p>
                <span className="font-semibold">Recommendation:</span> Try starting with words that contain more vowels
                to identify the word structure faster.
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Friends' Scores</h3>
            <Tabs defaultValue="today">
              <TabsList className="grid w-full grid-cols-2 mb-2">
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="today" className="border rounded-lg p-3">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">M</div>
                      <span>Michael</span>
                    </div>
                    <div className="text-sm">3/6</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">D</div>
                      <span>Daisy</span>
                    </div>
                    <div className="text-sm">4/6</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">S</div>
                      <span>Sarah</span>
                    </div>
                    <div className="text-sm">5/6</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">J</div>
                      <span>John</span>
                    </div>
                    <div className="text-sm">X/6</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="border rounded-lg p-3">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">M</div>
                      <div>
                        <div>Michael</div>
                        <div className="text-xs text-gray-500">Avg: 3.8/6</div>
                      </div>
                    </div>
                    <div className="text-sm">92% win</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">D</div>
                      <div>
                        <div>Daisy</div>
                        <div className="text-xs text-gray-500">Avg: 4.2/6</div>
                      </div>
                    </div>
                    <div className="text-sm">88% win</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">Y</div>
                      <div>
                        <div>You</div>
                        <div className="text-xs text-gray-500">Avg: 4.5/6</div>
                      </div>
                    </div>
                    <div className="text-sm">92% win</div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-2 pt-2">
            <Button className="w-full flex items-center justify-center gap-2" onClick={() => setShowShareModal(true)}>
              <Share2 size={16} />
              Share Results
            </Button>

            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => onNavigate("insights")}
            >
              <BarChart2 size={16} />
              View Detailed Insights
            </Button>

            <Button variant="outline" className="w-full" onClick={() => onNavigate("game")}>
              Play Again
            </Button>
          </div>
        </div>
      </ScrollArea>

     
      {showShareModal && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-[250px] max-h-[90%] overflow-auto">
            <div className="p-3 border-b flex items-center justify-between">
              <div className="w-4"></div>
              <h3 className="font-semibold">Share Results</h3>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setShowShareModal(false)}>
                ×
              </Button>
            </div>

            <div className="p-4 space-y-3">
              <div className="border rounded p-2 bg-gray-50 font-mono text-xs whitespace-pre overflow-x-auto">
                {generateShareText()}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center justify-center gap-1 text-xs"
                onClick={handleCopyText}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied!" : "Copy to Clipboard"}
              </Button>

              <div className="pt-1">
                <h4 className="text-xs font-medium mb-1">Share with friends</h4>
                <div className="max-h-[120px] overflow-y-auto space-y-2 pr-1">
                  {friends.map((friend) => (
                    <div key={friend.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`friend-${friend.id}`}
                        checked={selectedFriends.includes(friend.id)}
                        onCheckedChange={() => toggleFriend(friend.id)}
                      />
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                          {friend.avatar}
                        </div>
                        <label
                          htmlFor={`friend-${friend.id}`}
                          className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {friend.name}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                size="sm"
                className="w-full text-xs"
                onClick={handleShareWithFriends}
                disabled={selectedFriends.length === 0}
              >
                <User size={14} className="mr-1" />
                Share with Selected
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

