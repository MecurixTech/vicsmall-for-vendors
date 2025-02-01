"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Person} from '@mui/icons-material';
import Link from "next/link"

export default function RecoverPassword() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Recover Password</h1>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm mb-2 text-gray-600">Email or Phone Number</label>
            <div className="relative">
              <Input className="pl-10" placeholder="Place holder" type="text" required />
              <div className="absolute left-3 absolute inset-y-0 my-auto flex items-center text-gray-400 hover:text-gray-600">
                <Person className="h-5 w-5" />
              </div>
            </div>
          </div>

    <Link href="/recover/code">
          <Button className="w-full bg-[#FF7A45] hover:bg-[#FF7A45]/90 text-white mt-3" size="lg">
            Next
          </Button>
          </Link>
        </form>
      </div>
    </div>
  )
}

