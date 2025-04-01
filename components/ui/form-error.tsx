"use client"

import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle } from "lucide-react"

interface FormErrorProps {
  message?: string | null
}

export function FormError({ message }: FormErrorProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="flex items-center gap-2 text-red-500 text-sm mt-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <AlertCircle className="h-4 w-4" />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

