"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import InsertDriveFile from '@mui/icons-material/InsertDriveFile';
import type React from "react" 
import Link from "next/link"

export default function Upload() {
  const [validId, setValidId] = useState<File | null>(null)
  const [businessLogo, setBusinessLogo] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: "id" | "logo") => {
    const file = event.target.files?.[0]
    if (file) {
      if (type === "id") {
        setValidId(file)
      } else {
        setBusinessLogo(file)
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm">
        <div className="p-8 space-y-6">
          <div className="text-center space-y-1">
            <div className="text-[#FF7A45] text-sm mb-4">2 of 3</div>
            <h1 className="text-2xl font-bold text-gray-900">Document Upload</h1>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm mb-2">
                Upload Valid ID. <span className="text-red-500">*</span>
                <div className="text-gray-500 text-sm">(National ID, Drivers License or Passport )</div>
              </label>
              <div className="relative border-2 border-dashed rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="valid-id"
                  accept="image/*,.pdf"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => handleFileChange(e, "id")}
                />
                <div className="space-y-2">
                  <div className="flex justify-center">
                    <InsertDriveFile className="h-8 w-8 text-[#1D1B44]" />
                  </div>
                  <div className="text-sm">
                    <span className="text-[#1D1B44] font-medium">Select</span> document you want to upload
                  </div>
                  <div className="text-xs text-gray-500">Images and Pdf Allowed</div>
                  {validId && <div className="text-sm text-green-600">Selected: {validId.name}</div>}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">
                Upload Business Logo <span className="text-red-500">*</span>
              </label>
              <div className="relative border-2 border-dashed rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="business-logo"
                  accept="image/*,.pdf"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => handleFileChange(e, "logo")}
                />
                <div className="space-y-2">
                  <div className="flex justify-center">
                    <InsertDriveFile className="h-8 w-8 text-[#1D1B44]" />
                  </div>
                  <div className="text-sm">
                    <span className="text-[#1D1B44] font-medium">Select</span> document you want to upload
                  </div>
                  <div className="text-xs text-gray-500">Images and Pdf Allowed</div>
                  {businessLogo && <div className="text-sm text-green-600">Selected: {businessLogo.name}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t p-6 flex justify-between">
            <Link href="/storesetup">
          <Button variant="outline" className="border-[#1D1B44] text-[#1D1B44] hover:bg-[#1D1B44] hover:text-white">
            Back
          </Button>
          </Link>

          <Link href="/payment">
          <Button className="bg-[#FF7A45] hover:bg-[#FF7A45]/90 text-white px-8">Next</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

