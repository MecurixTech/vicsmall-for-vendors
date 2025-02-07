"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Person, Visibility, VisibilityOff} from '@mui/icons-material';
import Link from "next/link"

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold">
          Sign up! <span className="text-purple-700">Vendor</span>
        </h1>
      </div>

      <form className="space-y-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Input className="pl-10" placeholder="Place holder" type="email" required />
              <div className="absolute left-3 absolute right-3 inset-y-0 my-auto flex items-center text-gray-400 hover:text-gray-600">
                <Person className="h-5 w-5 " />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Input className="pl-10" placeholder="Place holder" type="text" required />
              <div className="absolute left-3 absolute right-3 inset-y-0 my-auto flex items-center text-gray-400 hover:text-gray-600">
                <Person className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-[140px,1fr] gap-4">
            <div>
              <label className="block text-sm mb-1">
                Country Code <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm"
                  defaultValue="234"
                >
                  <option value="234">🇳🇬 +234</option>
                  {/* Add more country codes as needed */}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">Phone Number</label>
              <Input placeholder="Place holder" type="tel" />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Input className="pr-10" type={showPassword ? "text" : "password"} placeholder="Password" required />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 absolute right-3 inset-y-0 my-auto flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <VisibilityOff className="h-5 w-5" /> : <Visibility className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Input
                className="pr-10"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 absolute right-3 inset-y-0 my-auto flex items-center text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <VisibilityOff className="h-5 w-5" /> : <Visibility className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

 <Link href="/welcome">
        <Button className="w-full bg-[#F37F34] hover:bg-[#F37F34]/90 text-white mt-6" size="lg">
          Sign up
        </Button></Link>
      </form>
    </div>
  )
}

