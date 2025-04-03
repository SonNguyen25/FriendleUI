"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, HelpCircle, X } from "lucide-react"
import type { Screen } from "../components/PhoneMockup"

interface ConnectionsScreenProps {
  onNavigate: (screen: Screen) => void
}

export default function ConnectionsScreen({ onNavigate }: ConnectionsScreenProps) {
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [completedGroups, setCompletedGroups] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [showAiHelp, setShowAiHelp] = useState(false)
  const [showDefinition, setShowDefinition] = useState(false)

  const words = [
    "LADLE",
    "SPOON",
    "FORK",
    "KNIFE",
    "HAMMER",
    "DRILL",
    "SAW",
    "WRENCH",
    "SHIRT",
    "PANTS",
    "SOCKS",
    "SHOES",
    "APPLE",
    "ORANGE",
    "BANANA",
    "GRAPE",
  ]

  // Word definitions
  const definitions: Record<string, string> = {
    LADLE: "A long-handled spoon with a cup-shaped bowl, used for serving soup or sauce.",
    SPOON: "A utensil consisting of a small shallow bowl on a handle, used for eating, stirring, and serving food.",
    FORK: "An implement with two or more prongs, used for eating or serving food.",
    KNIFE: "A cutting instrument consisting of a sharp blade with a handle.",
    HAMMER:
      "A tool with a heavy metal head mounted at right angles at the end of a handle, used for breaking things or driving nails.",
    DRILL: "A tool with a rotating cutting tip or reciprocating hammer for making holes.",
    SAW: "A hand tool for cutting wood or other materials, typically with a toothed blade.",
    WRENCH: "A tool used for gripping and turning nuts, bolts, pipes, etc.",
    SHIRT: "A garment for the upper body made of fabric, typically with a collar, sleeves, and buttons down the front.",
    PANTS: "An outer garment covering the body from the waist to the ankles, with a separate part for each leg.",
    SOCKS: "A garment for the foot and lower part of the leg, typically knitted or made of cotton.",
    SHOES: "A covering for the foot, typically made of leather, with a sturdy sole and a heel.",
    APPLE: "The round fruit of a tree of the rose family, which typically has thin red or green skin and crisp flesh.",
    ORANGE: "A round juicy citrus fruit with a tough bright reddish-yellow rind.",
    BANANA: "A long curved fruit with a yellow skin and soft sweet flesh.",
    GRAPE:
      "A berry, typically green, purple, or black, growing in clusters on a vine, eaten as fruit, and used in making wine.",
  }

  const handleWordClick = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((w) => w !== word))
      setSelectedWord(null)
    } else if (selectedWords.length < 4) {
      setSelectedWords([...selectedWords, word])
      setSelectedWord(word)
    }
  }

  const handleSubmit = () => {
    if (completedGroups < 3) {
      // Simulate finding a correct group
      setCompletedGroups(completedGroups + 1)
      setSelectedWords([])
      setSelectedWord(null)
    } else {
      onNavigate("connections-results")
    }
  }

  const handleMistake = () => {
    setMistakes(mistakes + 1)
    setSelectedWords([])
    setSelectedWord(null)
  }

  const openAiHelp = () => {
    setShowAiHelp(true)
    setShowDefinition(false)
  }

  const closeAiHelp = () => {
    setShowAiHelp(false)
    setShowDefinition(false)
  }

  return (
    <div className="flex flex-col h-full relative">
      <div className="p-3 border-b flex items-center">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("home")}>
          <ArrowLeft size={20} />
        </Button>
        <div className="flex-1 text-center font-bold">Connections</div>
        <Button variant="ghost" size="icon" className={selectedWord ? "text-green-500" : ""} onClick={openAiHelp}>
          <HelpCircle size={20} />
        </Button>
      </div>

      <div className="flex-1 p-4 flex flex-col">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Find groups of 4 connected words</h2>
          <div className="flex justify-between text-sm">
            <div>{4 - completedGroups} groups remaining</div>
            <div>{mistakes} mistakes</div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-4">
          {words.map((word) => (
            <Button
              key={word}
              variant={selectedWords.includes(word) ? "default" : "outline"}
              className={`h-12 p-1 ${selectedWord === word ? "ring-2 ring-green-500" : ""}`}
              onClick={() => handleWordClick(word)}
            >
              {word}
            </Button>
          ))}
        </div>

        <div className="flex gap-2">
          <Button disabled={selectedWords.length !== 4} className="flex-1" onClick={handleSubmit}>
            Submit
          </Button>

          <Button variant="outline" className="flex-1" onClick={handleMistake}>
            Simulate Mistake
          </Button>
        </div>

        <div className="text-sm text-gray-500 text-center mt-2">Select 4 words that share a common theme</div>
      </div>

      
      {showAiHelp && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-[250px] p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">AI Help</h3>
              <Button variant="ghost" size="icon" onClick={closeAiHelp} className="h-6 w-6">
                <X size={16} />
              </Button>
            </div>

            <p className="text-sm mb-3">
              {selectedWord
                ? `Would you like a hint about "${selectedWord}"?`
                : "Select a word first to get a definition"}
            </p>

            {selectedWord && (
              <div className="text-sm">
                {showDefinition ? (
                  <div className="p-3 bg-gray-50 rounded-md mb-2">
                    <p>{definitions[selectedWord]}</p>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" className="w-full mb-2" onClick={() => setShowDefinition(true)}>
                    Show Definition
                  </Button>
                )}

                <p className="text-xs text-gray-500">
                  Using AI help will remove you from today's competitive leaderboard.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

