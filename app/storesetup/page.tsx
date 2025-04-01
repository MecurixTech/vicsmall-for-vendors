"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Person } from "@mui/icons-material"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { API_BASE_URL } from "@/lib/constants"

export default function StoreSetup() {
  const [shopName, setShopName] = useState("")
  const [preOrder, setPreOrder] = useState("yes")
  const [arrivalTime, setArrivalTime] = useState("")
  const [email, setEmail] = useState("")
  const [partPayment, setPartPayment] = useState(false)
  const [shopState, setShopState] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [acceptTerms, setAcceptTerms] = useState(false)
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
    }
  }, [router])

  const validateForm = () => {
    if (!shopName.trim()) {
      setError("Shop name is required")
      toast.error("Shop name is required")
      return false
    }

    if (!arrivalTime) {
      setError("Product arrival time is required")
      toast.error("Product arrival time is required")
      return false
    }

    if (isNaN(Number(arrivalTime)) || Number(arrivalTime) <= 0) {
      setError("Please enter a valid number of days for product arrival")
      toast.error("Please enter a valid number of days for product arrival")
      return false
    }

    if (!email.trim()) {
      setError("Email is required")
      toast.error("Email is required")
      return false
    }

    if (!shopState.trim()) {
      setError("Shop state is required")
      toast.error("Shop state is required")
      return false
    }

    if (!acceptTerms) {
      setError("Please accept the terms and conditions")
      toast.error("Please accept the terms and conditions")
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

    const requestBody = {
      shop_name: shopName,
      products_preOrder: preOrder === "yes",
      product_arrival_time: Number.parseInt(arrivalTime, 10),
      shop_email: email,
      part_payment: partPayment,
      shop_state: shopState,
    }

    localStorage.setItem("shopName", shopName)

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setError("No authentication token found")
        toast.error("No authentication token found")
        throw new Error("No authentication token found")
      }

      const response = await fetch(`${API_BASE_URL}/shop/create-shop`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      })

      const data = await response.json()
      console.log("Response data:", data)

      if (!response.ok) {
       
        if (data?.Data) {
         
          const fieldErrors = Object.entries(data.Data)
            .filter(([_, errors]) => Array.isArray(errors) && errors.length > 0)
            .map(([field, errors]) => `${field}: ${(errors as string[])[0]}`)

          if (fieldErrors.length > 0) {
            const errorMessage = fieldErrors.join(", ")
            setError(errorMessage)
            toast.error(errorMessage)
            throw new Error(errorMessage)
          }
        }

        const errorMessage = data.Message || "Failed to create shop"
        setError(errorMessage)
        toast.error(errorMessage)
        throw new Error(errorMessage)
      }

      toast.success("Store setup completed successfully!")
      router.push("/upload")
    } catch (error: any) {
      console.error("Error:", error)
     
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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-sm"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="p-8 space-y-6">
          <motion.div className="text-center space-y-1" variants={itemVariants}>
            <div className="text-[#FF7A45] text-sm mb-4">1 of 3</div>
            <h1 className="text-2xl font-bold text-gray-900">Store Setup</h1>
            <p className="text-gray-600">Tell us a little about the business</p>
          </motion.div>

          {error && (
            <motion.p
              className="text-sm text-red-500 p-3 bg-red-50 rounded-md text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.p>
          )}

          <motion.form className="space-y-6" onSubmit={handleSubmit} variants={containerVariants}>
            <motion.div className="space-y-4" variants={containerVariants}>
              <motion.div variants={itemVariants}>
                <label className="block text-sm mb-1.5">
                  Shop Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    className="pl-10"
                    placeholder="Enter your shop name"
                    required
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                  />
                  <div className="absolute left-3 inset-y-0 my-auto flex items-center text-gray-400 hover:text-gray-600">
                    <Person className="h-5 w-5" />
                  </div>
                </div>
              </motion.div>

              <motion.div className="space-y-3" variants={itemVariants}>
                <label className="block text-sm">Are Your Products PreOrder</label>
                <div className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="yes"
                      name="preOrder"
                      value="yes"
                      checked={preOrder === "yes"}
                      onChange={(e) => setPreOrder(e.target.value)}
                      className="h-4 w-4 accent-orange-500 border-gray-300 text-[#FF7A45] focus:ring-[#FF7A45]"
                    />
                    <label htmlFor="yes" className="text-sm">
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="no"
                      name="preOrder"
                      value="no"
                      checked={preOrder === "no"}
                      onChange={(e) => setPreOrder(e.target.value)}
                      className="h-4 w-4 border-gray-300 text-[#FF7A45] focus:ring-[#FF7A45]"
                    />
                    <label htmlFor="no" className="text-sm">
                      No
                    </label>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm mb-1.5">
                  How long does it take for your products to arrive? <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Enter number of days"
                  type="number"
                  required
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Enter shop email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm mb-1.5">
                  Other Category <span className="text-red-500">*</span>
                </label>
                <Input placeholder="Enter category" required />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm mb-1.5">State</label>
                <Input placeholder="Enter state" value={shopState} onChange={(e) => setShopState(e.target.value)} />
              </motion.div>

              {/* Part Payment Checkbox - Separate from Terms */}
              <motion.div variants={itemVariants} className="mt-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="part-payment"
                    className="h-4 w-4 rounded accent-orange-500 border-gray-300 text-[#FF7A45] focus:ring-[#FF7A45]"
                    checked={partPayment}
                    onChange={(e) => setPartPayment(e.target.checked)}
                  />
                  <label htmlFor="part-payment" className="text-sm">
                    I Accept Part Payment (for items above N10,000)
                  </label>
                </div>
              </motion.div>

              {/* Terms and Conditions Checkbox - Separate from Part Payment */}
              <motion.div variants={itemVariants} className="mt-4">
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="accept-terms"
                    className="h-4 w-4 mt-1 accent-orange-500 rounded border-gray-300 text-[#FF7A45] focus:ring-[#FF7A45]"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    required
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label htmlFor="accept-terms" className="text-sm">
                      I accept the <span>  </span>
                      <Link href="#" className="text-[#FF7A45] text-sm">
                      Terms and Conditions
                    </Link>
                    </label>
                    
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div className="border-t p-6 flex justify-end" variants={itemVariants}>
              <Button type="submit" className="bg-[#FF7A45] hover:bg-[#FF7A45]/90 text-white px-8" disabled={loading}>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  "Next"
                )}
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  )
}

