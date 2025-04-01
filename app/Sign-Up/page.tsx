"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Person, Visibility, VisibilityOff } from "@mui/icons-material"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Link from "next/link"
import { ReCaptcha } from "@/components/ui/recaptcha"
import { PasswordStrength } from "@/components/ui/password-strength"
import { API_BASE_URL } from "@/lib/constants"
import { validateEmail, validatePassword } from "@/lib/validation"

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [countryCode, setCountryCode] = useState("+234")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [recaptchaToken, setRecaptchaToken] = useState("")

  const router = useRouter()

  const validateForm = () => {
    if (!email.trim()) {
      setError("Email is required")
      toast.error("Email is required")
      return false
    }

    if (!validateEmail(email.trim())) {
      setError("Please enter a valid email address")
      toast.error("Please enter a valid email address")
      return false
    }

    if (!fullName.trim() || fullName.trim().length < 2) {
      setError("Full name must be at least 2 characters")
      toast.error("Full name must be at least 2 characters")
      return false
    }

    if (!phoneNumber.trim()) {
      setError("Phone number is required")
      toast.error("Phone number is required")
      return false
    }

    if (!password) {
      setError("Password is required")
      toast.error("Password is required")
      return false
    }

    if (!validatePassword(password)) {
      setError("Password does not meet requirements")
      toast.error("Password does not meet requirements")
      return false
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      toast.error("Passwords do not match")
      return false
    }

    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA verification")
      toast.error("Please complete the reCAPTCHA verification")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const res = await fetch(`${API_BASE_URL}/auth/create-vendor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          full_name: fullName.trim(),
          country_code: countryCode,
          phone_number: phoneNumber.trim(),
          password,
          is_vendor: true,
          is_active: true,
          is_delete: false,
          recaptchaToken,
        }),
      })

      const data = await res.json()
      console.log("Response data:", data)

      if (!res.ok) {
        
        if (data?.Data?.email && Array.isArray(data.Data.email) && data.Data.email.length > 0) {
         
          const emailError = data.Data.email[0]
          setError(emailError)
          toast.error(emailError)
          throw new Error(emailError)
        }

        if (data?.Data && typeof data.Data === "object") {
          for (const [field, errors] of Object.entries(data.Data)) {
            if (Array.isArray(errors) && errors.length > 0) {
              const fieldError = `${field}: ${errors[0]}`
              setError(fieldError)
              toast.error(fieldError)
              throw new Error(fieldError)
            }
          }
        }

        const errorMessage = data?.Message || "Failed to create account"
        setError(errorMessage)
        toast.error(errorMessage)
        throw new Error(errorMessage)
      }

      localStorage.setItem("fullName", fullName.trim())
      localStorage.setItem("email", email.trim())
      localStorage.setItem("phoneNumber", phoneNumber.trim())

      if (data?.Data?.access) {
        localStorage.setItem("token", data.Data.access)
        console.log("Token stored:", data.Data.access)
        toast.success("Account created successfully!")
      } else {
        console.error("Token not found in response")
        toast.success("Account created, please Sign in")
      }

      router.push("/Sign-in")
    } catch (error) {
      console.log(error)
     
    } finally {
      setLoading(false)
    }
  }

  const handleRecaptchaVerify = (token: string) => {
    setRecaptchaToken(token)
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

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="mb-8 text-center" variants={itemVariants}>
          <h1 className="text-2xl font-semibold">
            Sign up! <span className="text-[#040458]">Vendor</span>
          </h1>
        </motion.div>

        <motion.form onSubmit={handleSubmit} className="space-y-4" variants={containerVariants}>
          {error && (
            <motion.p
              className="text-sm text-red-500 p-3 bg-red-50 rounded-md"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.p>
          )}

          <motion.div className="space-y-4" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <label className="mb-1 block text-sm">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  className="pl-10"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="absolute inset-y-0 left-3 my-auto flex items-center text-gray-400">
                  <Person className="h-5 w-5" />
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="mb-1 block text-sm">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Enter your full name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </motion.div>

            <motion.div className="grid grid-cols-[140px,1fr] gap-4" variants={itemVariants}>
              <div>
                <label className="mb-1 block text-sm">Country Code</label>
                <select
                  className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  <option value="+234">🇳🇬 +234</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm">Phone Number</label>
                <Input
                  placeholder="Enter phone number"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="mb-1 block text-sm">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  className="pr-10"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 my-auto flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <VisibilityOff className="h-5 w-5" /> : <Visibility className="h-5 w-5" />}
                </button>
              </div>
              <PasswordStrength password={password} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="mb-1 block text-sm">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  className="pr-10"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 my-auto flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <VisibilityOff className="h-5 w-5" /> : <Visibility className="h-5 w-5" />}
                </button>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center">
            <ReCaptcha onVerify={handleRecaptchaVerify} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              className="mt-6 w-full bg-[#F37F34] text-white hover:bg-[#F37F34]/90"
              size="lg"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Sign up"
              )}
            </Button>
          </motion.div>

          <motion.p className="text-center text-sm text-gray-600 mt-4" variants={itemVariants}>
            Already have an account?{" "}
            <Link href="/Sign-in" className="text-[#F37F34] hover:text-[#F37F34]/90 font-medium">
              Sign in
            </Link>
          </motion.p>
        </motion.form>
      </motion.div>
    </div>
  )
}

