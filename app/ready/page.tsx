"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Verified from "@mui/icons-material/Verified"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Ready() {
  const router = useRouter()

  useEffect(() => {
   
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/Sign-in")
    }
  }, [router])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-sm p-8 text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Store is Ready!</h1>
        </motion.div>

        <motion.div className="flex justify-center mb-8" variants={iconVariants}>
          <div className="p-4 relative">
            <motion.div
              initial={{ scale: 1 }}
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
              }}
            >
              <Verified style={{ width: "128px", height: "128px" }} className="text-green-500" />
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-full bg-green-500 opacity-20"
              initial={{ scale: 0 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 1,
              }}
            />
          </div>
        </motion.div>

        <motion.p className="text-gray-600 mb-8 max-w-md mx-auto" variants={itemVariants}>
          Congratulations! Your vendor store has been successfully set up. You can now access your dashboard to start
          managing your products and orders.
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row justify-center gap-4" variants={itemVariants}>
          <Button
            className="bg-[#FF7A45] hover:bg-[#FF7A45]/90 text-white px-8"
          >
            <Link href="/">Go To Dashboard</Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

