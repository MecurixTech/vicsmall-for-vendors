"use client"

import { useState, useRef, type KeyboardEvent, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function VerifyCode() {
  const [code, setCode] = useState(["", "", "", ""])
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)

      // Move to next input if value is entered
      if (value !== "" && index < 3) {
        inputRefs[index + 1].current?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Recover Password</h1>
        </div>

        <form className="space-y-6">
          <div className="space-y-4">
            <label className="block text-center text-sm text-gray-600">Input Code</label>
            <div className="flex justify-center gap-4">
              {code.map((digit, index) => (
                <Input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={inputRefs[index]}
                  className="w-16 h-12 text-center text-lg bg-gray-50"
                />
              ))}
            </div>
          </div>

          <Link href="/recover/newpassword">
          <Button className="w-full bg-[#FF7A45] hover:bg-[#FF7A45]/90 text-white mt-10" size="lg">
            Next
          </Button>
          </Link>
        </form>
      </div>
    </div>
  )
}

