"use client";

import { useState } from "react";
import AppScreen from "./AppScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import GameScreen from "../screens/GameScreen";
import ConnectionsScreen from "../screens/ConnectionsScreen";
import LeaderboardScreen from "../screens/LeaderboardScreen";
import InsightsScreen from "../screens/InsightsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import React from "react";
import SignupScreen from "../screens/SignUp";
import GameResultsScreen from "../screens/GameResultsScreen";
import ConnectionsResultsScreen from "../screens/ConnectionsResultsScreen";
import GameSelectScreen from "../screens/GameSelectScreen";

export type Screen =
  | "login"
  | "signup"
  | "home"
  | "game"
  | "connections"
  | "leaderboard"
  | "insights"
  | "profile"
  | "results"
  | "connections-results"
  | "game-select";

export default function PhoneMockup() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  const [loggedIn, setLoggedIn] = useState(false);
  const [guesses, setGuesses] = useState<string[]>(["STARE", "PLANK", "KNOLL"]);
  const [gameState, setGameState] = useState<"won" | "lost">("won");

  const mockStats = {
    played: 60,
    winPercentage: 92,
    currentStreak: 0,
    maxStreak: 5,
    guessDistribution: [1, 0, 5, 9, 22, 18],
  };

  const mockConnectionsGroups = [
    {
      color: "yellow",
      name: "Kitchen Utensils",
      words: ["LADLE", "SPOON", "FORK", "KNIFE"],
    },
    {
      color: "green",
      name: "Tools",
      words: ["HAMMER", "DRILL", "SAW", "WRENCH"],
    },
    {
      color: "blue",
      name: "Clothing",
      words: ["SHIRT", "PANTS", "SOCKS", "SHOES"],
    },
    {
      color: "purple",
      name: "Fruits",
      words: ["APPLE", "ORANGE", "BANANA", "GRAPE"],
    },
  ];

  const handleLogin = (screen?: Screen) => {
    setLoggedIn(true);
    setCurrentScreen(screen || "home");
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
      <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
      <div className="rounded-[2rem] w-[272px] h-[572px] bg-white overflow-hidden">
        <div className="h-full overflow-y-auto hide-scrollbar">
          <AppScreen>
            {currentScreen === "login" && <LoginScreen onLogin={handleLogin} />}
            {currentScreen === "signup" && (
              <SignupScreen
                onNavigate={handleNavigate}
                onSignup={handleLogin}
              />
            )}
            {currentScreen === "home" && (
              <HomeScreen onNavigate={handleNavigate} />
            )}
            {currentScreen === "game" && (
              <GameScreen onNavigate={handleNavigate} />
            )}
            {currentScreen === "connections" && (
              <ConnectionsScreen onNavigate={handleNavigate} />
            )}
            {currentScreen === "leaderboard" && (
              <LeaderboardScreen onNavigate={handleNavigate} />
            )}
            {currentScreen === "insights" && (
              <InsightsScreen onNavigate={handleNavigate} />
            )}
            {currentScreen === "profile" && (
              <ProfileScreen onNavigate={handleNavigate} />
            )}
            {currentScreen === "results" && (
              <GameScreen onNavigate={handleNavigate} />
            )}
            {currentScreen === "results" && (
              <GameResultsScreen
                onNavigate={handleNavigate}
                gameState={gameState}
                guesses={guesses}
                targetWord="KNOLL"
                stats={mockStats}
              />
            )}
            {currentScreen === "connections-results" && (
              <ConnectionsResultsScreen
                onNavigate={handleNavigate}
                gameState="won"
                mistakes={2}
                completedGroups={mockConnectionsGroups}
                stats={{
                  played: 45,
                  winPercentage: 88,
                  currentStreak: 5,
                  maxStreak: 12,
                  avgMistakes: 2.3,
                }}
              />
            )}
            {currentScreen === "game-select" && (
              <GameSelectScreen onNavigate={handleNavigate} />
            )}
          </AppScreen>
        </div>
      </div>
    </div>
  );
}
