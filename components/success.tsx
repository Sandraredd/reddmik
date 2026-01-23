"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, Home } from "lucide-react"

export function Success() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 inline-flex items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="h-10 w-10 text-success" />
          </div>
        </div>

        <h1 className="mb-4 text-3xl font-bold text-foreground">Withdrawal Completed Successfully!</h1>

        <p className="mb-8 text-muted-foreground">Your withdrawal has been processed successfully.</p>

        <Button
          size="lg"
          variant="outline"
          className="mt-6 h-12 w-full text-base font-medium bg-transparent"
          onClick={() => window.location.reload()}
        >
          <Home className="mr-2 h-5 w-5" />
          Back to Home
        </Button>
      </div>
    </div>
  )
}
