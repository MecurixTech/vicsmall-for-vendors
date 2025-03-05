"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Person} from '@mui/icons-material';
import Link from "next/link"

export default function StoreSetup() {
  const [preOrder, setPreOrder] = useState("yes")

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm">
        <div className="p-8 space-y-6">
          <div className="text-center space-y-1">
            <div className="text-[#FF7A45] text-sm mb-4">1 of 3</div>
            <h1 className="text-2xl font-bold text-gray-900">Store Setup</h1>
            <p className="text-gray-600">Tell us a little about the business</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1.5">
                  Shop Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input className="pl-10" placeholder="Place holder" required />
                  <div className="absolute left-3 absolute inset-y-0 my-auto flex items-center text-gray-400 hover:text-gray-600">
                    <Person className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <div className="text-gray-400 px-3">
  https://vicsmall.com/store/
</div>

              <div className="space-y-3">
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
                      className="h-4 w-4 border-gray-300 text-[#FF7A45] focus:ring-[#FF7A45]"
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
              </div>

              <div>
                <label className="block text-sm mb-1.5">
                  How long does it take for your products to arrive ? <span className="text-red-500">*</span>
                </label>
                <Input placeholder="Placeholder" required />
              </div>

              <div>
                <label className="block text-sm mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input placeholder="Placeholder" type="email" required />
              </div>

              <div>
                <label className="block text-sm mb-1.5">
                  Other Category <span className="text-red-500">*</span>
                </label>
                <Input placeholder="Placeholder" required />
                <div className="flex items-center space-x-2 mt-3">
                  <input
                    type="checkbox"
                    id="part-payment"
                    className="h-4 w-4 rounded border-gray-300 text-[#FF7A45] focus:ring-[#FF7A45]"
                  />
                  <label htmlFor="part-payment" className="text-sm">
                    Part Payment
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1.5">State</label>
                <Input placeholder="Placeholder" />
                
              </div>

              <div className="space-y-4">
               

                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="accept-part-payment"
                    className="h-4 w-4 mt-1 rounded border-gray-300 text-[#FF7A45] focus:ring-[#FF7A45]"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label htmlFor="accept-part-payment" className="text-sm">
                      I Accept Part Payment (for items above N10,000)
                    </label>
                    <Link href="#" className="text-[#FF7A45] text-sm">
                      Terms and Conditions Apply
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="border-t p-6 flex justify-end">
            <Link href="/upload" >
          <Button className="bg-[#FF7A45] hover:bg-[#FF7A45]/90 text-white px-8">Next</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

