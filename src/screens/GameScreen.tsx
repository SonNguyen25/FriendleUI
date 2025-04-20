"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, HelpCircle, X } from "lucide-react"
import type { Screen } from "../components/PhoneMockup"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface GameScreenProps {
  onNavigate: (screen: Screen) => void
  selectedMode?: "daily" | "weekly" | "custom" | "friend" | null
}

export default function GameScreen({ onNavigate, selectedMode }: GameScreenProps) {
  const [currentGuess, setCurrentGuess] = useState("")
  const [guesses, setGuesses] = useState<string[]>([])
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing")
  const [showAiHelp, setShowAiHelp] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true)

  const targetWord = "KNOLL"
  const maxGuesses = 6

  const mockStats = {
    played: 60,
    winPercentage: 92,
    currentStreak: 0,
    maxStreak: 5,
    guessDistribution: [1, 0, 5, 9, 22, 18],
  }

  // Generate hints based on current game state
  const generateHints = () => {
    // Basic hint that's always available
    const basicHint = "This word refers to a small hill or mound."

    // If no guesses yet, just return the basic hint
    if (guesses.length === 0) {
      return [basicHint]
    }

    const hints = [basicHint]

    // Add letter-specific hints
    const correctLetters = new Set()
    const presentLetters = new Set()
    const absentLetters = new Set()

    guesses.forEach((guess) => {
      guess.split("").forEach((letter, index) => {
        if (targetWord[index] === letter) {
          correctLetters.add(letter)
        } else if (targetWord.includes(letter)) {
          presentLetters.add(letter)
        } else {
          absentLetters.add(letter)
        }
      })
    })

    // Add hints based on correct letters
    if (correctLetters.size > 0) {
      hints.push(`You've correctly placed: ${Array.from(correctLetters).join(", ")}`)
    }

    // Add hints based on present but misplaced letters
    if (presentLetters.size > 0) {
      hints.push(`Good letters but wrong position: ${Array.from(presentLetters).join(", ")}`)
    }

    // Add pattern hints based on guesses
    if (guesses.length >= 2) {
      hints.push("The word starts with a consonant and has a double consonant.")
    }

    // Add definition hint after several guesses
    if (guesses.length >= 3) {
      hints.push("It can refer to a grassy mound or a small natural hill.")
    }

    // Add more specific hint when getting close to max guesses
    if (guesses.length >= 4) {
      hints.push("Think of a word that rhymes with 'toll' or 'roll'.")
    }

    return hints
  }

  const handleKeyPress = (key: string) => {
    if (gameState !== "playing") return

    if (key === "ENTER") {
      if (currentGuess.length === 5) {
        const newGuesses = [...guesses, currentGuess]
        setGuesses(newGuesses)
        setCurrentGuess("")

        if (currentGuess === targetWord) {
          setGameState("won")
          onNavigate("results")
        } else if (newGuesses.length >= maxGuesses) {
          setGameState("lost")
          onNavigate("results")
        }
      }
    } else if (key === "DELETE") {
      setCurrentGuess((prev) => prev.slice(0, -1))
    } else if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + key)
    }
  }

  const renderLetter = (letter: string, index: number, word: string) => {
    let status = "absent"
    if (targetWord.includes(letter)) {
      status = "present"
    }
    if (targetWord[index] === letter) {
      status = "correct"
    }

    const bgColors = {
      absent: "bg-gray-400",
      present: "bg-yellow-500",
      correct: "bg-green-500",
    }

    return (
      <div
        key={index}
        className={`w-10 h-10 flex items-center justify-center font-bold text-white ${
          bgColors[status as keyof typeof bgColors]
        }`}
      >
        {letter}
      </div>
    )
  }

  const openAiHelp = () => {
    setShowAiHelp(true)
    setShowHint(false)
  }

  const closeAiHelp = () => {
    setShowAiHelp(false)
    setShowHint(false)
  }

  return (
    <div className="flex flex-col h-full relative">
      <div className="p-3 border-b flex items-center">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("home")}>
          <ArrowLeft size={20} />
        </Button>
        <div className="flex-1 text-center font-bold">Wordle</div>
        <Button variant="ghost" size="icon" onClick={openAiHelp}>
          <HelpCircle size={20} />
        </Button>
      </div>

      <div className="flex-1 p-4 flex flex-col">
        <Tabs defaultValue={selectedMode || "daily"} className="mb-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
            <TabsTrigger value="friend">Friend</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="grid grid-rows-6 gap-1 mb-4">
            {Array(maxGuesses)
              .fill(null)
              .map((_, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-5 gap-1">
                  {rowIndex < guesses.length
                    ? // Submitted guess
                      guesses[rowIndex]
                        .split("")
                        .map((letter, colIndex) => renderLetter(letter, colIndex, guesses[rowIndex]))
                    : rowIndex === guesses.length
                      ? // Current guess
                        Array(5)
                          .fill(null)
                          .map((_, colIndex) => (
                            <div
                              key={colIndex}
                              className="w-10 h-10 border-2 flex items-center justify-center font-bold"
                            >
                              {currentGuess[colIndex] || ""}
                            </div>
                          ))
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

        <div className="mt-2 space-y-1 pb-2">
          <div className="flex justify-center gap-[2px]">
            {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className="uppercase flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-black dark:text-white font-semibold text-xs rounded px-1 py-2 w-[32px] h-[44px] sm:w-[38px] sm:h-[44px] transition-colors"
              >
                {key}
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-[2px]">
            <div className="w-[16px]" />
            {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className="uppercase flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-black dark:text-white font-semibold text-xs rounded px-1 py-2 w-[32px] h-[44px] sm:w-[38px] sm:h-[44px] transition-colors"
              >
                {key}
              </button>
            ))}
            <div className="w-[16px]" />
          </div>

          <div className="flex justify-center gap-[2px]">
            <button
              onClick={() => handleKeyPress("DELETE")}
              className="flex items-center justify-center bg-gray-300 dark:bg-gray-600 text-black dark:text-white font-semibold text-[10px] rounded px-1 py-2 w-[48px] sm:w-[60px] h-[44px] transition-colors"
            >
              ←
            </button>
            {["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className="uppercase flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-black dark:text-white font-semibold text-xs rounded px-1 py-2 w-[32px] h-[44px] sm:w-[38px] sm:h-[44px] transition-colors"
              >
                {key}
              </button>
            ))}
            <button
              onClick={() => handleKeyPress("ENTER")}
              className="uppercase flex items-center justify-center bg-gray-300 dark:bg-gray-600 text-black dark:text-white font-semibold text-[10px] rounded px-1 py-2 w-[48px] sm:w-[60px] h-[44px] transition-colors"
            >
              Enter
            </button>
          </div>
        </div>
      </div>

      {showInstructions && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-[300px] p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">How to Play Wordle</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowInstructions(false)} className="h-6 w-6">
                <X size={16} />
              </Button>
            </div>

            <div className="text-xs space-y-2 mb-3">
              <p>Guess the WORDLE in 6 tries.</p>
              <p>Each guess must be a valid 5-letter word.</p>
              <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-6 h-6 bg-green-500 flex items-center justify-center text-white font-bold">R</div>
                <span>The letter R is in the word and in the correct spot.</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-yellow-500 flex items-center justify-center text-white font-bold">I</div>
                <span>The letter I is in the word but in the wrong spot.</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-400 flex items-center justify-center text-white font-bold">U</div>
                <span>The letter U is not in the word in any spot.</span>
              </div>
            </div>

            <Button onClick={() => setShowInstructions(false)} className="w-full">
              Start Playing
            </Button>
          </div>
        </div>
      )}
      {showAiHelp && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-[250px] p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">AI Help</h3>
              <Button variant="ghost" size="icon" onClick={closeAiHelp} className="h-6 w-6">
                <X size={16} />
              </Button>
            </div>

            <p className="text-sm mb-3">Would you like a hint for this puzzle?</p>

            <div className="text-sm">
              {showHint ? (
                <div className="p-3 bg-gray-50 rounded-md mb-3 max-h-[150px] overflow-y-auto">
                  {generateHints().map((hint, index) => (
                    <p key={index} className={index > 0 ? "mt-2" : ""}>
                      {hint}
                    </p>
                  ))}
                </div>
              ) : (
                <Button variant="outline" size="sm" className="w-full mb-3" onClick={() => setShowHint(true)}>
                  Show Hints
                </Button>
              )}

              <p className="text-xs text-gray-500">
                Using AI help will remove you from today's competitive leaderboard.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
