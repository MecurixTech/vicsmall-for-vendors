"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { z } from "zod"
import { extractErrorMessage } from "@/lib/error-handling"
import { API_BASE_URL } from "@/lib/constants"

const paymentInfoSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  account_name: z.string().min(2, "Account name must be at least 2 characters"),
  account_number: z.string().min(5, "Please enter a valid account number"),
  account_type: z.string().min(2, "Please enter a valid account type"),
  bank_ibn: z.string().min(2, "Please enter a valid bank IBN"),
  bank_name: z.string().min(2, "Please enter a valid bank name"),
  bank_swift_code: z.string().optional(),
  bank_address: z.string().min(5, "Please enter a valid bank address"),
  account_confirmation: z.boolean().refine((val) => val === true, {
    message: "You must confirm that you are the account owner",
  }),
})

type PaymentInfo = z.infer<typeof paymentInfoSchema>

export default function PaymentSetup() {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    email: "",
    account_name: "",
    account_number: "",
    account_type: "",
    bank_ibn: "",
    bank_name: "",
    bank_swift_code: "",
    bank_address: "",
    account_confirmation: false,
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      console.log("Not authenticated, redirecting to login")
      toast.error("Please login to continue")
      router.push("/Sign-in")
    } else {
      setIsAuthenticated(true)

      const storedEmail = localStorage.getItem("email")
      if (storedEmail) {
        setPaymentInfo((prev) => ({ ...prev, email: storedEmail }))
      }
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    const newValue = type === "checkbox" ? checked : value

    setPaymentInfo((prev) => ({ ...prev, [name]: newValue }))

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    try {
      paymentInfoSchema.parse(paymentInfo)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError(null)

    if (!validateForm()) {
     
      const errorKeys = Object.keys(errors)
      if (errorKeys.length > 0) {
        toast.error(`Please fix the following: ${errors[errorKeys[0]]}`)
      }
      return
    }

    setLoading(true)

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        const errorMsg = "No authentication token found"
        setGeneralError(errorMsg)
        toast.error(errorMsg)
        throw new Error(errorMsg)
      }

      const response = await fetch(`${API_BASE_URL}/shop/vendor-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentInfo),
      })

      const data = await response.json()
      console.log("Payment info submission response:", response.status)
      console.log("Payment info submission data:", data)

      if (!response.ok) {
        const errorMsg = extractErrorMessage(data)
        setGeneralError(errorMsg)
        toast.error(errorMsg)
        throw new Error(errorMsg)
      }

      toast.success("Payment information submitted successfully!")
      router.push("/ready")
    } catch (error: any) {
      console.error("Error submitting payment info:", error)
      if (!generalError) {
        setGeneralError(error.message || "Failed to submit payment information")
      }
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F37F34] mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-sm"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="p-8 space-y-6">
          <motion.div className="text-center space-y-1" variants={itemVariants}>
            <div className="text-[#FF7A45] text-sm mb-4">3 of 3</div>
            <h1 className="text-2xl font-bold text-gray-900">Payment Setup</h1>
            <p className="text-gray-600">Set up your payment information</p>
          </motion.div>

          <AnimatePresence>
            {generalError && (
              <motion.div
                className="text-sm text-red-500 p-3 bg-red-50 rounded-md"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {generalError}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form className="space-y-6" onSubmit={handleSubmit} variants={containerVariants}>
            <motion.div className="space-y-4" variants={itemVariants}>
              <h2 className="text-base font-medium">Paypal</h2>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  name="email"
                  placeholder="Enter your PayPal email"
                  type="email"
                  required
                  className={`bg-gray-50 ${errors.email ? "border-red-500 focus:ring-red-500" : ""}`}
                  value={paymentInfo.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <motion.p
                    className="mt-1 text-sm text-red-500"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>
            </motion.div>

            {/* Bank Transfer Section */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <h2 className="text-base font-medium">Bank Transfer</h2>

              <div>
                <label className="block text-sm text-gray-600 mb-1.5">
                  Account Name <span className="text-red-500">*</span>
                </label>
                <Input
                  name="account_name"
                  placeholder="Enter account name"
                  required
                  className={`bg-gray-50 ${errors.account_name ? "border-red-500 focus:ring-red-500" : ""}`}
                  value={paymentInfo.account_name}
                  onChange={handleChange}
                />
                {errors.account_name && (
                  <motion.p
                    className="mt-1 text-sm text-red-500"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.account_name}
                  </motion.p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">
                    Account Type <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="account_type"
                    placeholder="Savings, Current, etc."
                    required
                    className={`bg-gray-50 ${errors.account_type ? "border-red-500 focus:ring-red-500" : ""}`}
                    value={paymentInfo.account_type}
                    onChange={handleChange}
                  />
                  {errors.account_type && (
                    <motion.p
                      className="mt-1 text-sm text-red-500"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.account_type}
                    </motion.p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">
                    Account Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="account_number"
                    placeholder="Enter account number"
                    required
                    className={`bg-gray-50 ${errors.account_number ? "border-red-500 focus:ring-red-500" : ""}`}
                    value={paymentInfo.account_number}
                    onChange={handleChange}
                  />
                  {errors.account_number && (
                    <motion.p
                      className="mt-1 text-sm text-red-500"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.account_number}
                    </motion.p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1.5">
                  Bank IBN <span className="text-red-500">*</span>
                </label>
                <Input
                  name="bank_ibn"
                  placeholder="Enter bank IBN"
                  required
                  className={`bg-gray-50 ${errors.bank_ibn ? "border-red-500 focus:ring-red-500" : ""}`}
                  value={paymentInfo.bank_ibn}
                  onChange={handleChange}
                />
                {errors.bank_ibn && (
                  <motion.p
                    className="mt-1 text-sm text-red-500"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.bank_ibn}
                  </motion.p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">
                    Bank Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="bank_name"
                    placeholder="Enter bank name"
                    required
                    className={`bg-gray-50 ${errors.bank_name ? "border-red-500 focus:ring-red-500" : ""}`}
                    value={paymentInfo.bank_name}
                    onChange={handleChange}
                  />
                  {errors.bank_name && (
                    <motion.p
                      className="mt-1 text-sm text-red-500"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.bank_name}
                    </motion.p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">Bank Swift Code</label>
                  <Input
                    name="bank_swift_code"
                    placeholder="Optional"
                    className="bg-gray-50"
                    value={paymentInfo.bank_swift_code}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1.5">
                  Bank Address <span className="text-red-500">*</span>
                </label>
                <Input
                  name="bank_address"
                  placeholder="Enter bank address"
                  required
                  className={`bg-gray-50 ${errors.bank_address ? "border-red-500 focus:ring-red-500" : ""}`}
                  value={paymentInfo.bank_address}
                  onChange={handleChange}
                />
                {errors.bank_address && (
                  <motion.p
                    className="mt-1 text-sm text-red-500"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.bank_address}
                  </motion.p>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="account-confirmation"
                    name="account_confirmation"
                    required
                    className={`mt-1 h-4 w-4 rounded accent-orange-500 border-gray-300 text-[#FF7A45] focus:ring-[#FF7A45] ${
                      errors.account_confirmation ? "border-red-500" : ""
                    }`}
                    checked={paymentInfo.account_confirmation}
                    onChange={handleChange}
                  />
                  <label htmlFor="account-confirmation" className="text-sm">
                    I attest that I am the owner and have full authorization to this bank account
                  </label>
                </div>
                {errors.account_confirmation && (
                  <motion.p
                    className="mt-1 text-sm text-red-500"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.account_confirmation}
                  </motion.p>
                )}

                <motion.div
                  className="text-center space-y-1 p-3 bg-yellow-50 rounded-md"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-amber-600 text-sm font-medium">Please double-check your account information!</p>
                  <p className="text-amber-600 text-sm">
                    Incorrect or mismatched account name and number can result in withdrawal delays and fees
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div className="border-t pt-6 flex justify-between" variants={itemVariants}>
              <Link href="/upload">
                <Button
                  variant="outline"
                  className="border-[#1D1B44] text-[#1D1B44] hover:bg-[#1D1B44] hover:text-white"
                >
                  Back
                </Button>
              </Link>

              <Button type="submit" className="bg-[#FF7A45] hover:bg-[#FF7A45]/90 text-white px-8" disabled={loading}>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  "Done"
                )}
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  )
}

