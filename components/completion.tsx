"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle2, Award, ExternalLink } from "lucide-react"
import { useEffect, useState, useRef } from "react"

interface CompletionProps {
  balance: number
}

// Extend Window interface for tracking scripts
declare global {
  interface Window {
    fbq: (...args: unknown[]) => void
    Utmify?: {
      trackLead?: (data: Record<string, unknown>) => void
      track?: (event: string, data: Record<string, unknown>) => void
    }
  }
}

export function Completion({ balance }: CompletionProps) {
  const [countdown, setCountdown] = useState(5)
  const trackingFired = useRef(false)

  useEffect(() => {
    // Fire tracking events immediately on mount (only once)
    if (!trackingFired.current) {
      trackingFired.current = true
      
      // Get UTM parameters for tracking
      const urlParams = new URLSearchParams(window.location.search)
      const utmData = {
        utm_source: urlParams.get('utm_source') || '',
        utm_medium: urlParams.get('utm_medium') || '',
        utm_campaign: urlParams.get('utm_campaign') || '',
        utm_content: urlParams.get('utm_content') || '',
        utm_term: urlParams.get('utm_term') || '',
        fbclid: urlParams.get('fbclid') || '',
        src: urlParams.get('src') || '',
        sck: urlParams.get('sck') || '',
      }
      
      console.log("[v0] Firing tracking events with data:", { balance, utmData })
      
      // Fire Meta Pixel Lead event IMMEDIATELY
      if (typeof window !== 'undefined' && window.fbq) {
        try {
          window.fbq('track', 'Lead', {
            content_name: 'Quiz Completed',
            value: balance,
            currency: 'USD',
            ...utmData
          })
          console.log("[v0] Facebook Lead event fired successfully")
        } catch (error) {
          console.error("[v0] Error firing Facebook Lead event:", error)
        }
      }
      
      // Fire UTMify conversion event
      if (typeof window !== 'undefined') {
        try {
          // UTMify uses a global function to track conversions
          // The script automatically captures UTMs, we just need to trigger the conversion
          const utmifyData = {
            orderId: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            total: balance,
            currency: 'USD',
            paymentMethod: 'lead',
            customer: {
              name: '',
              email: '',
              phone: ''
            }
          }
          
          // Try to access UTMify's tracking function
          if (window.Utmify && typeof window.Utmify.trackLead === 'function') {
            window.Utmify.trackLead(utmifyData)
            console.log("[v0] UTMify trackLead fired successfully")
          } else if (window.Utmify && typeof window.Utmify.track === 'function') {
            window.Utmify.track('Lead', utmifyData)
            console.log("[v0] UTMify track Lead fired successfully")
          }
          
          // Also dispatch a custom event that UTMify might listen to
          const utmifyEvent = new CustomEvent('utmify:conversion', {
            detail: utmifyData
          })
          window.dispatchEvent(utmifyEvent)
          console.log("[v0] UTMify custom event dispatched")
          
        } catch (error) {
          console.error("[v0] Error firing UTMify event:", error)
        }
      }
    }
  }, [balance])

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    const redirectTimer = setTimeout(() => {
      // Get current URL parameters (UTMs, fbclid, etc.)
      const currentParams = new URLSearchParams(window.location.search)
      
      // Build redirect URL with all tracking parameters
      const baseUrl = "https://clothing-reviewers.netlify.app/"
      const redirectUrl = currentParams.toString() 
        ? `${baseUrl}?${currentParams.toString()}`
        : baseUrl
      
      console.log("[v0] Redirecting to:", redirectUrl)
      window.location.href = redirectUrl
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
