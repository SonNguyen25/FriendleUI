"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, LogOut, Settings } from "lucide-react"
import type { Screen } from "../components/PhoneMockup"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface ProfileScreenProps {
  onNavigate: (screen: Screen) => void
}

export default function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b flex items-center">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("home")}>
          <ArrowLeft size={20} />
        </Button>
        <div className="flex-1 text-center font-bold">Profile</div>
        <Button variant="ghost" size="icon">
          <Settings size={20} />
        </Button>
      </div>

      <div className="flex-1 p-4">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl mb-2">J</div>
          <h2 className="text-xl font-bold">Joshua Watson</h2>
          <p className="text-gray-500">@jwatson213</p>
        </div>

        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Account Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-login">Auto Login</Label>
                <Switch id="auto-login" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Push Notifications</Label>
                <Switch id="notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="share-results">Auto Share Results</Label>
                <Switch id="share-results" />
              </div>
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Game Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <Switch id="dark-mode" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="hard-mode">Hard Mode</Label>
                <Switch id="hard-mode" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="color-blind">Color Blind Mode</Label>
                <Switch id="color-blind" />
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">AI Features</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="ai-hints">AI Hints</Label>
                <Switch id="ai-hints" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="ai-insights">AI Performance Insights</Label>
                <Switch id="ai-insights" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="ai-training">Personalized Training</Label>
                <Switch id="ai-training" defaultChecked />
              </div>
            </div>
          </div>

          <Button onClick={() => onNavigate("login")} variant="outline" className="w-full flex items-center justify-center gap-2">
            <LogOut size={16} />
            <span>Log Out</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

