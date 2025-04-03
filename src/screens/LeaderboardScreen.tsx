"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, Trophy, User } from "lucide-react";
import type { Screen } from "../components/PhoneMockup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface LeaderboardScreenProps {
  onNavigate: (screen: Screen) => void;
}

export default function LeaderboardScreen({
  onNavigate,
}: LeaderboardScreenProps) {

  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const friends = [
    { id: "1", name: "Daisy", avatar: "D" },
    { id: "2", name: "Michael", avatar: "M" },
    { id: "3", name: "Sarah", avatar: "S" },
    { id: "4", name: "John", avatar: "J" },
    { id: "5", name: "Emma", avatar: "E" },
  ];

  const toggleFriend = (id: string) => {
    setSelectedFriends((prev) =>
      prev.includes(id) ? prev.filter((friendId) => friendId !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b flex items-center">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("home")}>
          <ArrowLeft size={20} />
        </Button>
        <div className="flex-1 text-center font-bold">Leaderboard</div>
        <Button variant="ghost" size="icon" onClick={() => setShowShareModal(true)}>
          <Share2 size={20} />
        </Button>
      </div>

      <div className="flex-1 p-4">
        <Tabs defaultValue="friends">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="friends">Friends</TabsTrigger>
            <TabsTrigger value="global">Global</TabsTrigger>
          </TabsList>

          <TabsContent value="friends" className="space-y-4">
            <div className="border rounded-lg p-3">
              <h3 className="font-semibold mb-2">Today's Wordle</h3>
              <div className="flex items-center px-2 py-1 text-xs font-medium text-gray-500 border-b pb-1 mb-2">
                <div className="flex items-center flex-1">
                  <div className="text-left">Player</div>
                </div>
                <div>Score</div>
                <div className="w-10"></div>
              </div>

              <div className="space-y-1">
                {[
                  { id: "J", name: "Joshua (You)", score: "3/6", isYou: true },
                  { id: "D", name: "Daisy", score: "4/6" },
                  { id: "M", name: "Michael", score: "3/6" },
                ].map(({ id, name, score, isYou }) => (
                  <div
                    key={id}
                    className={`grid grid-cols-[auto_1fr_auto] items-center px-2 py-1 rounded hover:bg-gray-100 transition ${
                      isYou ? "bg-yellow-100 font-semibold" : ""
                    }`}
                  >
        
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                      {id}
                    </div>

                    <div className="text-xs truncate ml-2">{name}</div>

             
                    <div className="flex items-center gap-2 text-xs justify-end">
                      <span>{score}</span>
                      <Button variant="ghost" size="sm" onClick={() => setShowShareModal(true)}>
                        <Share2 size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border rounded-lg p-3">
              <h3 className="font-semibold mb-2">Today's Connections</h3>
              <div className="flex items-center px-2 py-1 text-xs font-medium text-gray-500 border-b pb-1 mb-2">
                <div className="flex items-center flex-1">
                  <div className="text-left">Player</div>
                </div>
                <div>Mistakes</div>
                <div className="w-10"></div>
              </div>

              <div className="space-y-1">
                {[
                  { id: "M", name: "Michael", mistakes: "2" },
                  { id: "J", name: "Joshua (You)", mistakes: "3", isYou: true },
                  { id: "D", name: "Daisy", mistakes: "1" },
                ].map(({ id, name, mistakes, isYou }) => (
                  <div
                    key={id}
                    className={`grid grid-cols-[1fr_auto] items-center px-2 py-1 rounded hover:bg-gray-100 transition ${
                      isYou ? "bg-yellow-100 font-semibold" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                        {id}
                      </div>
                      <span className="text-xs">{name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span>{mistakes}</span>
                      <Button variant="ghost" size="sm" onClick={() => setShowShareModal(true)}>
                        <Share2 size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="global">
            <div className="border rounded-lg p-3">
              <h3 className="font-semibold mb-2">Global's Wordle Rankings</h3>

              <div className="grid grid-cols-2 text-xs font-medium text-gray-500 border-b pb-1 mb-2">
                <div>Player</div>
                <div className="text-right">Avg Score</div>
              </div>

              <div className="space-y-1">
                {[
                  { rank: 1, name: "WordleMaster", avg: "2/6" },
                  { rank: 2, name: "PuzzleQueen", avg: "2.3/6" },
                  { rank: 3, name: "WordNinja", avg: "2.5/6" },
                  { rank: 42, name: "Joshua (You)", avg: "3.8/6", isYou: true },
                ].map(({ rank, name, avg, isYou }) => (
                  <div
                    key={rank}
                    className={`grid grid-cols-[1fr_auto] items-center px-2 py-1 rounded hover:bg-gray-100 transition ${
                      isYou ? "bg-yellow-100 font-semibold" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          rank === 1
                            ? "bg-yellow-400 text-white"
                            : rank === 2
                            ? "bg-gray-400 text-white"
                            : rank === 3
                            ? "bg-amber-600 text-white"
                            : "bg-gray-200 text-black"
                        }`}
                      >
                        {rank <= 3 ? <Trophy size={12} /> : rank}
                      </div>
                      <span className="text-xs">{name}</span>
                    </div>
                    <div className="text-right text-xs">{avg} avg</div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="global">
            <div className="border rounded-lg p-3">
              <h3 className="font-semibold mb-2">
                Global's Connections Rankings
              </h3>
              <div className="grid grid-cols-2 text-xs font-medium text-gray-500 border-b pb-1 mb-2">
                <div>Player</div>
                <div className="text-right">Avg Mistakes</div>
              </div>

              <div className="space-y-1">
                {[
                  { rank: 1, name: "WordleMaster", avg: "0.0" },
                  { rank: 2, name: "PuzzleQueen", avg: "0.3" },
                  { rank: 3, name: "WordNinja", avg: "1.0" },
                  { rank: 42, name: "Joshua (You)", avg: "3.8", isYou: true },
                ].map(({ rank, name, avg, isYou }) => (
                  <div
                    key={rank}
                    className={`grid grid-cols-[1fr_auto] items-center px-2 py-1 rounded hover:bg-gray-100 transition ${
                      isYou ? "bg-yellow-100 font-semibold" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          rank === 1
                            ? "bg-yellow-400 text-white"
                            : rank === 2
                            ? "bg-gray-400 text-white"
                            : rank === 3
                            ? "bg-amber-600 text-white"
                            : "bg-gray-200 text-black"
                        }`}
                      >
                        {rank <= 3 ? <Trophy size={12} /> : rank}
                      </div>
                      <span className="text-xs">{name}</span>
                    </div>
                    <div className="text-right text-xs">{avg}</div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="border-t flex justify-around p-2">
        <Button variant="ghost" size="sm" onClick={() => onNavigate("home")}>
          Add Friends
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setShowShareModal(true)}>
          Share Results
        </Button>
      </div>
      {showShareModal && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-[250px] max-h-[90%] overflow-auto">
            <div className="p-3 border-b flex items-center justify-between">
              <div className="w-4"></div>
              <h3 className="font-semibold">Share Results</h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => setShowShareModal(false)}
              >
                ×
              </Button>
            </div>
            <div className="p-4 space-y-3">
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
                          className="text-xs font-medium leading-none"
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
                onClick={() => {
                  setShowShareModal(false);
                  setSelectedFriends([]);
                }}
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
  );
}

