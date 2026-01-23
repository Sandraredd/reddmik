"use client"

import { useState } from "react"
import { Home } from "@/components/home"
import { Quiz } from "@/components/quiz"
import { Completion } from "@/components/completion"

export default function Page() {
  const [step, setStep] = useState<"home" | "quiz" | "completion">("home")
  const [balance, setBalance] = useState(0)

  return (
    <main className="min-h-screen">
      {step === "home" && <Home onStart={() => setStep("quiz")} />}
      {step === "quiz" && (
        <Quiz
          onComplete={(finalBalance) => {
            setBalance(finalBalance)
            setStep("completion")
          }}
        />
      )}
      {step === "completion" && <Completion balance={balance} />}
    </main>
  )
}
