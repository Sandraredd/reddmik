"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface HomeProps {
  onStart: () => void
}

export function Home({ onStart }: HomeProps) {
  const [name, setName] = useState("")

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fafafa] px-4 py-12">
      <div className="mb-20 flex items-center gap-2">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black">
          <span className="text-4xl font-bold text-white">$</span>
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-3xl font-black tracking-tight text-black">MONEY®</span>
          <span className="text-3xl font-black tracking-tight text-black">LOOKS</span>
        </div>
      </div>

      <div className="w-full max-w-md rounded-3xl border-2 border-pink-100 bg-white p-8 shadow-sm">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">Hello! What is your name?</h2>

        <Input
          type="text"
          placeholder="Enter your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-6 h-14 rounded-2xl border-2 border-pink-100 bg-white text-base placeholder:text-gray-300"
        />

        <Button
          size="lg"
          className="h-14 w-full rounded-2xl bg-pink-400 text-base font-bold text-white hover:bg-pink-500"
          onClick={onStart}
          disabled={!name.trim()}
        >
          Start Evaluation
        </Button>
      </div>
    </div>
  )
}
