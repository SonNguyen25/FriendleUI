"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Share2, Trophy, User, Search, Plus, X, Check } from 'lucide-react'
import type { Screen } from "../components/PhoneMockup"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

interface LeaderboardScreenProps {
  onNavigate: (screen: Screen) => void
}

export default function LeaderboardScreen({ onNavigate }: LeaderboardScreenProps) {
  const [showShareModal, setShowShareModal] = useState(false)
  const [selectedFriends, setSelectedFriends] = useState<string[]>([])
  const [showAddFriendModal, setShowAddFriendModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFriendRequests, setShowFriendRequests] = useState(true)
  const [friendRequests, setFriendRequests] = useState([
    { id: "10", name: "Riley Parker", avatar: "R", mutualFriends: 2 },
    { id: "11", name: "Morgan Davis", avatar: "M", mutualFriends: 1 },
  ])
  const [requestSentMessage, setRequestSentMessage] = useState<string | null>(null)
  const [hiddenSearchResults, setHiddenSearchResults] = useState<string[]>([])

  const friends = [
    { id: "1", name: "Daisy", avatar: "D" },
    { id: "2", name: "Michael", avatar: "M" },
    { id: "3", name: "Sarah", avatar: "S" },
    { id: "4", name: "John", avatar: "J" },
    { id: "5", name: "Emma", avatar: "E" },
  ]

  const allSearchResults = [
    { id: "6", name: "Alex Johnson", avatar: "A", mutualFriends: 3 },
    { id: "7", name: "Taylor Smith", avatar: "T", mutualFriends: 1 },
    { id: "8", name: "Jordan Lee", avatar: "J", mutualFriends: 2 },
    { id: "9", name: "Casey Brown", avatar: "C", mutualFriends: 0 },
  ]
  
  const searchResults = allSearchResults
    .filter(user => !hiddenSearchResults.includes(user.id))
    .filter(user => searchQuery === "" || user.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const toggleFriend = (id: string) => {
    setSelectedFriends((prev) => (prev.includes(id) ? prev.filter((friendId) => friendId !== id) : [...prev, id]))
  }

  const handleSendFriendRequest = (userId: string) => {
    // Hide the user from search results
    setHiddenSearchResults([...hiddenSearchResults, userId])
    
    // Show message in modal
    // setRequestSentMessage("Friend request sent!")
    
    // Clear message after 2 seconds
    setTimeout(() => {
      setRequestSentMessage(null)
    }, 2000)
  }

  const handleAcceptFriendRequest = (userId: string) => {
    // Add to friends and remove from requests
    setFriendRequests(friendRequests.filter((request) => request.id !== userId))
  }

  const handleRejectFriendRequest = (userId: string) => {
    // Remove from requests
    setFriendRequests(friendRequests.filter((request) => request.id !== userId))
  }

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
        {showFriendRequests && friendRequests.length > 0 && (
          <div className="border rounded-lg p-3 mb-4">
            <h3 className="font-semibold mb-2">Friend Requests</h3>
            <div className="space-y-2">
              {friendRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                      {request.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{request.name}</div>
                      <div className="text-xs text-gray-500">
                        {request.mutualFriends > 0
                          ? `${request.mutualFriends} mutual friend${request.mutualFriends > 1 ? "s" : ""}`
                          : "No mutual friends"}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => handleAcceptFriendRequest(request.id)}
                    >
                      <Check size={16} className="text-green-600" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => handleRejectFriendRequest(request.id)}
                    >
                      <X size={16} className="text-red-600" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
              <h3 className="font-semibold mb-2">Global's Connections Rankings</h3>
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
        <Button variant="ghost" size="sm" onClick={() => setShowAddFriendModal(true)}>
          Add Friends
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setShowShareModal(true)}>
          Share Results
        </Button>
      </div>
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-[250px] max-h-[90%] overflow-auto">
            <div className="p-3 border-b flex items-center justify-between">
              <div className="w-4"></div>
              <h3 className="font-semibold">Share Results</h3>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setShowShareModal(false)}>
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
                        <label htmlFor={`friend-${friend.id}`} className="text-xs font-medium leading-none">
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
                  setShowShareModal(false)
                  setSelectedFriends([])
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
      {showAddFriendModal && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-[250px] max-h-[90%] overflow-auto">
            <div className="p-3 border-b flex items-center justify-between">
              <div className="w-4"></div>
              <h3 className="font-semibold">Add Friends</h3>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setShowAddFriendModal(false)}>
                ×
              </Button>
            </div>
            <div className="p-4 space-y-3">
              {requestSentMessage && (
                <div className="p-2 text-sm rounded-md text-center bg-green-100 text-green-800">
                  {requestSentMessage}
                </div>
              )}
              
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search for friends"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 text-sm"
                />
              </div>

              <div className="pt-1">
                <h4 className="text-xs font-medium mb-2">Search Results</h4>
                {searchResults.length > 0 ? (
                  <div className="max-h-[200px] overflow-y-auto space-y-2 pr-1">
                    {searchResults.map((user) => (
                      <div key={user.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                            {user.avatar}
                          </div>
                          <div>
                            <div className="text-sm font-medium">{user.name}</div>
                            <div className="text-xs text-gray-500">
                              {user.mutualFriends > 0
                                ? `${user.mutualFriends} mutual friend${user.mutualFriends > 1 ? "s" : ""}`
                                : "No mutual friends"}
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          onClick={() => handleSendFriendRequest(user.id)}
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-sm text-gray-500">
                    {searchQuery ? "No users found matching your search" : "Type to search for friends"}
                  </div>
                )}
              </div>

              <Button size="sm" className="w-full text-xs" onClick={() => setShowAddFriendModal(false)}>
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
