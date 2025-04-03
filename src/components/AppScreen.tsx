"use client"

import type { ReactNode } from "react"
import React from "react"

interface AppScreenProps {
  children: ReactNode
}

export default function AppScreen({ children }: AppScreenProps) {
  return <div className="h-full w-full flex flex-col">{children}</div>
}
