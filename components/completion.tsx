"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle2, Award, ExternalLink } from "lucide-react"
import { useEffect, useState } from "react"

interface CompletionProps {
  balance: number
}

export function Completion({ balance }: CompletionProps) {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    const redirectTimer = setTimeout(() => {
      window.location.href = "https://clothing-evaluator26.netlify.app"
    }, 5000)

    return () => {
      clearInterval(countdownInterval)
      clearTimeout(redirectTimer)
    }
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 inline-flex items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="h-10 w-10 text-success" />
          </div>
        </div>

        <h1 className="mb-4 text-3xl font-bold text-foreground">Evaluations Completed Successfully!</h1>

        <p className="mb-8 text-muted-foreground">Congratulations on completing all evaluations.</p>

        <Card className="mb-8 border-2 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
          <div className="mb-4 flex items-center justify-center gap-2 text-muted-foreground">
            <Award className="h-5 w-5" />
            <span className="text-sm font-medium">Evaluation Summary</span>
          </div>

          <div className="mb-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total evaluations</span>
              <span className="text-lg font-semibold text-foreground">6</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total balance</span>
              <span className="text-3xl font-bold text-primary">US$ {balance.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        <Card className="mb-6 border-2 border-primary/20 bg-gradient-to-br from-pink-50 to-orange-50 p-6">
          <div className="mb-3 flex items-center justify-center">
            <ExternalLink className="h-6 w-6 text-primary" />
          </div>
          <p className="mb-2 text-lg font-semibold text-foreground">Watch the 4-minute video and see how to withdraw</p>
          <p className="text-sm text-muted-foreground">
            Redirecting in {countdown} second{countdown !== 1 ? "s" : ""}...
          </p>
        </Card>
      </div>
    </div>
  )
}
