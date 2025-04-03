"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import type { Screen } from "../components/PhoneMockup"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PerformanceChart } from "../charts/PerformanceChart"
import { useState } from "react"

interface InsightsScreenProps {
  onNavigate: (screen: Screen) => void
}

export default function InsightsScreen({ onNavigate }: InsightsScreenProps) {
  const [performanceGameType, setPerformanceGameType] = useState<"wordle" | "connections">("wordle")
  const [analysisGameType, setAnalysisGameType] = useState<"wordle" | "connections">("wordle")
  const [timeFrame, setTimeFrame] = useState<"daily" | "monthly" | "yearly">("monthly")

  const performanceDescriptions = {
    wordle: {
      daily: "You've solved today's Wordle in fewer guesses than 75% of players.",
      monthly: "You've outperformed your usual average in 7 out of 10 games this month.",
      yearly: "Your yearly average has improved from 4.2 to 3.3 guesses per solve.",
    },
    connections: {
      daily: "You've made fewer mistakes than 80% of players in today's Connections.",
      monthly: "Your connections solving speed has improved by 15% compared to last month.",
      yearly: "You've reduced your average mistakes from 3.2 to 1.7 over the past year.",
    },
  }

  const analysisInsights = {
    wordle: [
      {
        title: "Pattern detected",
        content: "You perform best on Tuesdays and Wednesdays, with an average of 3.2 guesses.",
      },
      {
        title: "Vocabulary strength",
        content: "You excel at puzzles with scientific terms but struggle with sports terminology.",
      },
      {
        title: "Strategy suggestion",
        content:
          "Your first-word choices could be more strategic. Try starting with words that contain more common letters like E, A, R, T.",
      },
    ],
    connections: [
      {
        title: "Pattern detected",
        content: "You solve yellow categories fastest, but struggle with purple categories.",
      },
      {
        title: "Category strength",
        content: "You excel at identifying food and animal groups but struggle with movie references.",
      },
      {
        title: "Strategy suggestion",
        content: "Try identifying the easiest category first before tackling the more difficult ones.",
      },
    ],
  }

  const recentGameAnalysis = {
    wordle: [
      {
        title: "Yesterday's Wordle",
        content:
          'You solved "KNOLL" in 4 guesses. The AI expected this would take you 5 guesses based on your history.',
      },
      {
        title: "Improvement",
        content: "Your average guesses per solve has improved from 4.2 to 3.8 over the past month.",
      },
      {
        title: "Recommendation",
        content:
          "Try our personalized training mode focused on 5-letter words with double letters to further improve your skills.",
      },
    ],
    connections: [
      {
        title: "Yesterday's Connections",
        content:
          "You solved all categories with only 2 mistakes. The 'Kitchen Utensils' category was your fastest solve.",
      },
      {
        title: "Improvement",
        content: "Your average mistakes per game has decreased from 3.1 to 2.3 over the past month.",
      },
      {
        title: "Recommendation",
        content:
          "Try our personalized training mode focused on pop culture references to improve in the purple category.",
      },
    ],
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b flex items-center">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("home")}>
          <ArrowLeft size={20} />
        </Button>
        <div className="flex-1 text-center font-bold">AI Insights</div>
        <div className="w-8" />
      </div>

      <div className="flex-1 p-4">
        <Tabs defaultValue="performance">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-4">
         
            <Tabs
              value={performanceGameType}
              onValueChange={(value) => setPerformanceGameType(value as "wordle" | "connections")}
            >
              <TabsList className="grid w-full grid-cols-2 mb-2">
                <TabsTrigger value="wordle">Wordle</TabsTrigger>
                <TabsTrigger value="connections">Connections</TabsTrigger>
              </TabsList>
            </Tabs>

            <Tabs value={timeFrame} onValueChange={(value) => setTimeFrame(value as "daily" | "monthly" | "yearly")}>
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
              </TabsList>
            </Tabs>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">
                  {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)}{" "}
                  {performanceGameType.charAt(0).toUpperCase() + performanceGameType.slice(1)} Performance
                </h3>
                <div className="h-48">
                  <PerformanceChart gameType={performanceGameType} timeFrame={timeFrame} />
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  {performanceDescriptions[performanceGameType][timeFrame]}
                </div>
              </CardContent>
            </Card>

            {performanceGameType === "wordle" ? (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Wordle Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Games Played</p>
                      <p className="font-bold text-xl">42</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Win %</p>
                      <p className="font-bold text-xl">92%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Current Streak</p>
                      <p className="font-bold text-xl">12</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Max Streak</p>
                      <p className="font-bold text-xl">24</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Connections Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Games Played</p>
                      <p className="font-bold text-xl">36</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Perfect Games</p>
                      <p className="font-bold text-xl">14</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Avg. Mistakes</p>
                      <p className="font-bold text-xl">2.3</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Best Category</p>
                      <p className="font-bold text-xl">Yellow</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <Tabs
              value={analysisGameType}
              onValueChange={(value) => setAnalysisGameType(value as "wordle" | "connections")}
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="wordle">Wordle</TabsTrigger>
                <TabsTrigger value="connections">Connections</TabsTrigger>
              </TabsList>
            </Tabs>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">AI Insights</h3>
                <div className="space-y-3 text-sm">
                  {analysisInsights[analysisGameType].map((insight, index) => (
                    <p key={index}>
                      <span className="font-semibold">{insight.title}:</span> {insight.content}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Recent Game Analysis</h3>
                <div className="space-y-3 text-sm">
                  {recentGameAnalysis[analysisGameType].map((analysis, index) => (
                    <p key={index}>
                      <span className="font-semibold">{analysis.title}:</span> {analysis.content}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button className="w-full">Generate Personalized Training</Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

