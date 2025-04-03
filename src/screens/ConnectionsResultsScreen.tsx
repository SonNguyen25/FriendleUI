"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2, BarChart2, ArrowLeft, Copy, Check, User } from "lucide-react"
import type { Screen } from "../components/PhoneMockup"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ConnectionsResultsScreenProps {
  onNavigate: (screen: Screen) => void
  gameState: "won" | "lost"
  mistakes: number
  completedGroups: {
    color: string
    name: string
    words: string[]
  }[]
  stats: {
    played: number
    winPercentage: number
    currentStreak: number
    maxStreak: number
    avgMistakes: number
  }
}

export default function ConnectionsResultsScreen({
  onNavigate,
  gameState,
  mistakes,
  completedGroups,
  stats,
}: ConnectionsResultsScreenProps) {
  const [showShareModal, setShowShareModal] = useState(false)
  const [copied, setCopied] = useState(false)
  const [selectedFriends, setSelectedFriends] = useState<string[]>([])

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

  const colorMap = {
    yellow: "bg-yellow-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
  }

  const generateShareText = () => {
    const header = `Connections\nPuzzle #${stats.played} • ${mistakes} mistake${mistakes !== 1 ? "s" : ""}\n\n`

    const groups = completedGroups
      .map((group) => {
        const emoji =
          group.color === "yellow" ? "🟨" : group.color === "green" ? "🟩" : group.color === "blue" ? "🟦" : "🟪"

        return `${emoji} ${emoji} ${emoji} ${emoji}`
      })
      .join("\n")

    return header + groups
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
        <div className="flex-1 text-center font-bold">Connections Results</div>
        <Button variant="ghost" size="icon" onClick={() => setShowShareModal(true)}>
          <Share2 size={20} />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-1">
              {gameState === "won" ? "Puzzle Complete!" : "Better luck next time"}
            </h2>
            <p className="text-sm text-gray-500">
              {gameState === "won"
                ? `You solved today's Connections with ${mistakes} mistake${mistakes !== 1 ? "s" : ""}.`
                : "You didn't complete today's Connections."}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Your Connections</h3>
            <div className="space-y-3">
              {completedGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-sm ${colorMap[group.color as keyof typeof colorMap]}`}></div>
                    <span className="font-medium">{group.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {group.words.map((word, wordIndex) => (
                      <div
                        key={wordIndex}
                        className={`p-2 text-center text-sm font-medium text-white rounded ${colorMap[group.color as keyof typeof colorMap]}`}
                      >
                        {word}
                      </div>
                    ))}
                  </div>
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
                <span className="text-xl font-bold">{stats.winPercentage}%</span>
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
            <h3 className="font-semibold mb-3">Average Mistakes: {stats.avgMistakes.toFixed(1)}</h3>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-20 text-sm">Today:</div>
              <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500 flex items-center justify-end px-2 text-xs text-white"
                  style={{ width: `${Math.min(100, (mistakes / 4) * 100)}%` }}
                >
                  {mistakes}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-20 text-sm">Average:</div>
              <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 flex items-center justify-end px-2 text-xs text-white"
                  style={{ width: `${Math.min(100, (stats.avgMistakes / 4) * 100)}%` }}
                >
                  {stats.avgMistakes.toFixed(1)}
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-semibold mb-3">AI Analysis</h3>
            <div className="space-y-3 text-sm">
              <p>
                <span className="font-semibold">Performance:</span>{" "}
                {gameState === "won"
                  ? `You completed today's puzzle with ${mistakes} mistake${mistakes !== 1 ? "s" : ""}, which is better than 62% of players.`
                  : `This was a challenging puzzle that stumped 28% of players.`}
              </p>
              <p>
                <span className="font-semibold">Pattern recognition:</span> You excel at identifying{" "}
                {completedGroups[0]?.color || "yellow"} category connections, typically solving them first.
              </p>
              <p>
                <span className="font-semibold">Challenge area:</span> Based on your history, you tend to struggle most
                with the purple (most difficult) category.
              </p>
              <p>
                <span className="font-semibold">Recommendation:</span> Try looking for more abstract connections when
                you're stuck, rather than focusing on obvious similarities.
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
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">D</div>
                      <span>Daisy</span>
                    </div>
                    <div className="text-sm">1 mistake</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">M</div>
                      <span>Michael</span>
                    </div>
                    <div className="text-sm">2 mistakes</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">J</div>
                      <span>John</span>
                    </div>
                    <div className="text-sm">3 mistakes</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">S</div>
                      <span>Sarah</span>
                    </div>
                    <div className="text-sm">Not completed</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="border rounded-lg p-3">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">D</div>
                      <div>
                        <div>Daisy</div>
                        <div className="text-xs text-gray-500">Avg: 1.8 mistakes</div>
                      </div>
                    </div>
                    <div className="text-sm">95% win</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">M</div>
                      <div>
                        <div>Michael</div>
                        <div className="text-xs text-gray-500">Avg: 2.1 mistakes</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">Y</div>
                      <div>
                        <div>You</div>
                        <div className="text-xs text-gray-500">Avg: 2.3 mistakes</div>
                      </div>
                    </div>
                    <div className="text-sm">88% win</div>
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

            <Button variant="outline" className="w-full" onClick={() => onNavigate("connections")}>
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

