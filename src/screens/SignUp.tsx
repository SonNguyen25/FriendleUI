import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { ArrowLeft } from 'lucide-react'
import { Screen } from "../components/PhoneMockup"

interface SignupScreenProps {
  onNavigate: (screen: Screen) => void
  onSignup: () => void
}

export default function SignupScreen({ onNavigate, onSignup }: SignupScreenProps) {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  })
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, agreeTerms: checked }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }
    if (!formData.agreeTerms) {
        alert("You must agree to the terms and conditions")
        return
        }
    onSignup()
  }
  
  return (
    <div className="flex flex-col h-full bg-gray-50 p-4 overflow-auto">
      <div className="flex items-center mb-6 ">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onNavigate("login")}
          className="p-0 h-8 w-8"
        >
          <ArrowLeft size={18} />
        </Button>
        <div className="flex-1 text-center font-bold">Create Account</div>
      </div>
      
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input 
            id="username" 
            name="username"
            placeholder="Choose a username" 
            value={formData.username}
            onChange={handleChange}
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            name="name"
            placeholder="Enter your full name" 
            value={formData.name}
            onChange={handleChange}
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            name="email"
            type="email" 
            placeholder="Enter your email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            id="phone" 
            name="phone"
            type="tel" 
            placeholder="Enter your phone number" 
            value={formData.phone}
            onChange={handleChange}
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            name="password"
            type="password" 
            placeholder="Create a password" 
            value={formData.password}
            onChange={handleChange}
            required 
          />
          <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input 
            id="confirmPassword" 
            name="confirmPassword"
            type="password" 
            placeholder="Confirm your password" 
            value={formData.confirmPassword}
            onChange={handleChange}
            required 
          />
        </div>
        
        <div className="flex items-center space-x-2 pt-2">
          <Checkbox 
            id="terms" 
            checked={formData.agreeTerms}
            onCheckedChange={handleCheckboxChange}
            required
          />
          <Label htmlFor="terms" className="text-sm">
            I agree to the Terms of Service and Privacy Policy
          </Label>
        </div>
        
        <div className="pt-4">
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </div>
        
        <div className="text-center pt-2">
          <span className="text-sm text-gray-500">Already have an account? </span>
          <Button 
            variant="link" 
            className="p-0 h-auto text-sm"
            onClick={() => onNavigate("login")}
          >
            Log In
          </Button>
        </div>
      </form>
    </div>
  )
}