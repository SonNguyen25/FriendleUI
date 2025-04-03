"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { Screen } from "../components/PhoneMockup"

interface LoginScreenProps {
  onLogin: (screen?: Screen) => void
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <div className="flex flex-col h-full bg-gray-50 p-4">
      <div className="flex justify-center my-8">
        <div className="text-2xl font-bold text-gray-800">Friendle</div>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Enter your password" />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
          />
          <Label htmlFor="remember" className="text-sm">
            Remember me
          </Label>
        </div>

        <Button onClick={() => onLogin()} className="w-full">
          Log In
        </Button>

        <div className="text-center">
          <span className="text-sm text-gray-500">Don't have an account? </span>
          <Button variant="link" className="p-0 h-auto text-sm" onClick={() => onLogin("signup")}>
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  )
}

