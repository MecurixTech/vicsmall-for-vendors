"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Visibility, VisibilityOff} from '@mui/icons-material';
import Link from "next/link"

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="w-full max-w-md mx-auto space-y-8 p-4">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold">
          Welcome back! <span className="text-purple-700">VICSMALL</span>
        </h1>
      </div>

      <form className="space-y-6">
        <div className="space-y-4">
          <div>
          <label htmlFor="" className="text-gray-400">Email</label>
            <div className="relative">
         
              <Input className="pl-10" placeholder="Email" type="text" />
              
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
          </div>

          <div>
          <label htmlFor="" className="text-gray-400">Password</label>
            <div className="relative">
              
            <Input 
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    className="pr-10"
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 inset-y-0 my-auto flex items-center text-gray-400 hover:text-gray-600"
  >
    {showPassword ? (
      <VisibilityOff className="h-5 w-5" />
    ) : (
      <Visibility className="h-5 w-5" />
    )}
  </button>
            </div>
            <div className="flex justify-end mt-1" >
              <Link href="/recover/RecoverPassword" className="text-sm text-gray-600 hover:text-gray-900">
                Forgot password
              </Link>
            </div>
          </div>
        </div>

        <Button className="w-full bg-[#F37F34] hover:bg-[#F37F34]/90 text-white" size="lg">
          Login
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-gray-500">Or login with</span>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button type="button" className="p-2 border rounded-lg hover:bg-gray-50">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
          </button>
          <button type="button" className="p-2 border rounded-lg hover:bg-gray-50">
            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-6 h-6" />
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/Sign-Up" className="text-purple-700 hover:text-purple-800">
            Sign up as a Vendor
          </Link>
        </p>
      </form>
    </div>
  )
}

