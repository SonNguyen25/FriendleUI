"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, LogOut, Settings, X } from "lucide-react"
import type { Screen } from "../components/PhoneMockup"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface ProfileScreenProps {
  onNavigate: (screen: Screen) => void
}

export default function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b flex items-center">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("home")}>
          <ArrowLeft size={20} />
        </Button>
        <div className="flex-1 text-center font-bold">Profile</div>
        {/* <Button variant="ghost" size="icon">
          <Settings size={20} />
        </Button> */}
        <div className="w-9 h-6" />
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
              <Button variant="outline" className="w-full" onClick={() => setShowPasswordModal(true)}>
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

          <Button
            onClick={() => onNavigate("login")}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <LogOut size={16} />
            <span>Log Out</span>
          </Button>
        </div>
      </div>

      {showPasswordModal && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-[250px] max-h-[90%] overflow-auto">
            <div className="p-3 border-b flex items-center justify-between">
              <div className="w-4"></div>
              <h3 className="font-semibold">Change Password</h3>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setShowPasswordModal(false)}>
                <X size={16} />
              </Button>
            </div>
            <div className="p-4 space-y-3">
              <div className="space-y-2">
                <Label htmlFor="old-password">Current Password</Label>
                <Input
                  id="old-password"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter current password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowPasswordModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={() => setShowPasswordModal(false)}>
                  Change
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
