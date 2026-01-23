"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2 } from "lucide-react"

interface WithdrawalProps {
  onSubmit: () => void
}

export function Withdrawal({ onSubmit }: WithdrawalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    bankName: "",
    accountNumber: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  const isFormValid = formData.fullName && formData.bankName && formData.accountNumber

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="mb-2 text-3xl font-bold text-foreground">Withdrawal Request</h1>
          <p className="text-muted-foreground">Fill in your bank details to process the request</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium">
                Full name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankName" className="text-sm font-medium">
                Bank name
              </Label>
              <Input
                id="bankName"
                type="text"
                placeholder="Enter bank name"
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountNumber" className="text-sm font-medium">
                Account number
              </Label>
              <Input
                id="accountNumber"
                type="text"
                placeholder="Enter account number"
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                className="h-11"
                required
              />
            </div>

            <Button type="submit" size="lg" className="h-12 w-full text-base font-medium" disabled={!isFormValid}>
              Submit Request
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
