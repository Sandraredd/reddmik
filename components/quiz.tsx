"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown } from "lucide-react"

interface QuizProps {
  onComplete: (balance: number) => void
}

const looks = [
  {
    id: 1,
    name: "Look 1",
    image: "/images/imgi-49-1756452067719491d3303541b26cc32989e6cd2946-thumbnail-600x.webp",
  },
  {
    id: 2,
    name: "Look 2",
    image: "/images/imgi-6-1724191659362cb9dfb46e946c7e4f1fdf158a16ad-thumbnail-600x.webp",
  },
  {
    id: 3,
    name: "Look 3",
    image: "/images/imgi-47-1755656620bdb8b1ca356ec416507da5f7eb421f99-thumbnail-600x.webp",
  },
  {
    id: 4,
    name: "Look 4",
    image: "/images/imgi-40-17587058199c1b89beae033fcfef4ad7a33de45a67-thumbnail-600x.webp",
  },
  {
    id: 5,
    name: "Look 5",
    image: "/images/imgi-5-1744104788e5817ed67acbb2674439c8d648d494e0-thumbnail-600x.webp",
  },
  {
    id: 6,
    name: "Look 6",
    image: "/images/imgi-2-1750427794825de7d11453e323da680177b02d4a10-thumbnail-600x.webp",
  },
]

const ratings = [
  { id: "like", label: "Like", icon: ThumbsUp, bgColor: "bg-green-500 hover:bg-green-600", value: 300 },
  { id: "dislike", label: "Dislike", icon: ThumbsDown, bgColor: "bg-red-500 hover:bg-red-600", value: 300 },
]

export function Quiz({ onComplete }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [balance, setBalance] = useState(0)
  const [showEarningsPopup, setShowEarningsPopup] = useState(false)
  const [lastIncrease, setLastIncrease] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const currentLook = looks[currentIndex]

  const handleRating = (value: number) => {
    const newBalance = balance + value
    setLastIncrease(value)
    setBalance(newBalance)
    setShowEarningsPopup(true)

    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch((error) => {
        console.log("[v0] Audio playback failed:", error)
      })
    }

    setTimeout(() => {
      setShowEarningsPopup(false)
      if (currentIndex === looks.length - 1) {
        onComplete(newBalance)
      } else {
        setCurrentIndex((prev) => prev + 1)
      }
    }, 2000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf5f0] px-4 py-8">
      <audio ref={audioRef} preload="auto">
        <source src="https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3" type="audio/mpeg" />
      </audio>

      <div className="w-full max-w-md">
        <div className="mb-8 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-black">
              <span className="text-xs font-bold text-white">ML</span>
            </div>
            <div className="text-xs font-bold">
              MONEY
              <br />
              LOOKS
            </div>
          </div>
          <div className="rounded-full bg-gradient-to-r from-pink-200 to-purple-200 px-5 py-2.5">
            <div className="text-[10px] font-medium text-purple-900/70">Accumulated Balance</div>
            <div className="text-lg font-bold text-orange-500">${balance.toFixed(2)} USD</div>
          </div>
        </div>

        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
          Look {currentIndex + 1} de {looks.length}
        </h1>
        <p className="mb-6 text-center text-lg font-medium text-pink-500">What do you think of this look?</p>

        <Card className="mb-6 overflow-hidden border-0 shadow-lg">
          <div className="aspect-[4/5] w-full overflow-hidden bg-white">
            <img
              src={currentLook.image || "/placeholder.svg"}
              alt={currentLook.name}
              className="h-full w-full object-cover"
            />
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          {ratings.map((rating) => {
            const Icon = rating.icon
            return (
              <Button
                key={rating.id}
                size="lg"
                className={`h-14 rounded-2xl text-base font-bold text-white ${rating.bgColor} flex items-center justify-center gap-2`}
                onClick={() => handleRating(rating.value)}
                disabled={showEarningsPopup}
              >
                <Icon className="h-5 w-5" />
                <span>{rating.label}</span>
              </Button>
            )
          })}
        </div>
      </div>

      {showEarningsPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <Card className="animate-popup-bounce mx-4 w-full max-w-md overflow-hidden rounded-3xl border-0 bg-gradient-to-br from-pink-50 to-orange-50 p-8 text-center shadow-2xl">
            <div className="animate-pulse-glow mb-6 inline-flex items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-orange-400 p-5 shadow-lg">
              <span className="text-5xl">💰</span>
            </div>
            <h2 className="mb-3 bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-3xl font-extrabold text-transparent">
              Congratulations!
            </h2>
            <p className="mb-4 text-base text-gray-600">You earned</p>
            <div className="mb-6 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 py-4 text-5xl font-extrabold text-white shadow-lg">
              +${lastIncrease.toFixed(2)}
            </div>
            <div className="rounded-xl bg-gradient-to-r from-pink-100 to-orange-100 p-4">
              <p className="text-sm font-semibold text-gray-700">New Total Balance</p>
              <p className="text-2xl font-bold text-orange-600">${balance.toFixed(2)} USD</p>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
