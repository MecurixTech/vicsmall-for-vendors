"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { ReCaptcha } from "@/components/ui/recaptcha"
import { API_BASE_URL } from "@/lib/constants"
import { validateEmail } from "@/lib/validation"
import { extractErrorMessage } from "@/lib/error-handling"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState("")

  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()

    if (!trimmedEmail || !trimmedPassword) {
      setError("Email and password are required.")
      toast.error("Email and password are required.")
      setLoading(false)
      return
    }

    if (!validateEmail(trimmedEmail)) {
      setError("Please enter a valid email address.")
      toast.error("Please enter a valid email address.")
      setLoading(false)
      return
    }

    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA verification.")
      toast.error("Please complete the reCAPTCHA verification.")
      setLoading(false)
      return
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login-vendor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
          password: trimmedPassword,
          recaptchaToken,
        }),
      })

      const data = await res.json()
      console.log("Response Status:", res.status)
      console.log("Response Data:", data)

      if (!res.ok) {
      
        const errorMsg = extractErrorMessage(data)
        setError(errorMsg)
        toast.error(errorMsg)
        throw new Error(errorMsg)
      }

      if (!data.Data?.access) {
        setError("Authentication token not found in response")
        toast.error("Authentication token not found in response")
        throw new Error("Authentication token not found in response")
      }

      localStorage.setItem("token", data.Data.access)
      console.log("Token stored:", data.Data.access)
      toast.success("Login successful!")

      try {
        const profileRes = await fetch(`${API_BASE_URL}/shop/vendor-payment`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.Data.access}`,
          },
        })

        const profileData = await profileRes.json()
        console.log("Profile Data:", profileData)

        if (profileData.Data.account_name) {
          router.push("/")
        } else {
          router.push("/storesetup")
        }
      } catch (profileError: any) {
        console.error("Error fetching profile:", profileError)
        toast.error("Error checking store setup. Redirecting to store setup page.")
        router.push("/storesetup")
      }
    } catch (error: any) {
      console.log("Login error:", error)
     
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
    <div className="min-h-screen flex items-center justify-center  p-4">
      <motion.div
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="space-y-2 text-center" variants={itemVariants}>
          <h1 className="text-2xl font-semibold">
            Welcome back! <span className="text-[#040458]">VICSMALL</span>
          </h1>
        </motion.div>

        <motion.form onSubmit={handleLogin} className="space-y-6 mt-8" variants={containerVariants}>
          <motion.div className="space-y-4" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="text-gray-400">
                Email
              </label>
              <div className="relative">
                <Input
                  id="email"
                  className="pl-10"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="5" />
                    <path d="M20 21a8 8 0 0 0-16 0" />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="password" className="text-gray-400">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="pr-10"
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
              <div className="mt-1 flex justify-end">
                <Link href="/recover/RecoverPassword" className="text-sm text-gray-600 hover:text-gray-900">
                  Forgot password?
                </Link>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center">
            <ReCaptcha onVerify={handleRecaptchaVerify} />
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.p
                className="text-sm text-red-500 p-3 bg-red-50 rounded-md"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.div variants={itemVariants}>
            <Button
              type="submit"
              className="w-full bg-[#F37F34] text-white hover:bg-[#F37F34]/90"
              size="lg"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Logging in...</span>
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </motion.div>

          <motion.div className="relative" variants={itemVariants}>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">Or login with</span>
            </div>
          </motion.div>

          <motion.div className="flex justify-center gap-4" variants={itemVariants}>
            <motion.button
              type="button"
              className="rounded-lg border p-2 hover:bg-gray-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="h-6 w-6">
                <image href="https://www.svgrepo.com/show/475656/google-color.svg" width="100%" height="100%" />
              </svg>
            </motion.button>

            <motion.button
              type="button"
              className="rounded-lg border p-2 hover:bg-gray-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="h-6 w-6">
                <image href="https://www.svgrepo.com/show/475647/facebook-color.svg" width="100%" height="100%" />
              </svg>
            </motion.button>
          </motion.div>

          <motion.p className="text-center text-sm text-gray-600" variants={itemVariants}>
            Don&apos;t have an account?{" "}
            <Link href="/Sign-Up" className="text-[#F37F34] hover:text-[#F37F34]/90 font-medium">
              Sign up as a Vendor
            </Link>
          </motion.p>
        </motion.form>
      </motion.div>
    </div>
  )
}

