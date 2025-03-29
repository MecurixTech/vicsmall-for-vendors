"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { passwordRequirements } from "@/lib/validation"
import { Check, X } from "lucide-react"

interface PasswordStrengthProps {
  password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const [strength, setStrength] = useState(0)

  useEffect(() => {
    
    const metRequirements = passwordRequirements.filter((req) => req.validator(password))
    setStrength((metRequirements.length / passwordRequirements.length) * 100)
  }, [password])

  const getStrengthColor = () => {
    if (strength < 40) return "bg-red-500"
    if (strength < 80) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStrengthLabel = () => {
    if (strength < 40) return "Weak"
    if (strength < 80) return "Medium"
    return "Strong"
  }

  if (!password) return null

  return (
    <div className="space-y-3 mt-2">
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span>Password Strength</span>
          <span className="font-medium">{getStrengthLabel()}</span>
        </div>
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${getStrengthColor()}`}
            initial={{ width: 0 }}
            animate={{ width: `${strength}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="space-y-2">
        {passwordRequirements.map((req) => (
          <div key={req.id} className="flex items-center gap-2">
            {req.validator(password) ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-500">
                <Check className="h-4 w-4" />
              </motion.div>
            ) : (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-gray-300">
                <X className="h-4 w-4" />
              </motion.div>
            )}
            <span className="text-xs text-gray-600">{req.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

