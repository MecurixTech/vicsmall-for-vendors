"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function PaymentSetup() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm">
        <div className="p-8 space-y-6">
          <div className="text-center space-y-1">
            <div className="text-[#FF7A45] text-sm mb-4">3 of 3</div>
            <h1 className="text-2xl font-bold text-gray-900">Payment Setup</h1>
          </div>

          <form className="space-y-6">
            {/* Paypal Section */}
            <div className="space-y-4">
              <h2 className="text-base font-medium">Paypal</h2>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input placeholder="Placeholder" type="email" required className="bg-gray-50" />
              </div>
            </div>

            {/* Bank Transfer Section */}
            <div className="space-y-4">
              <h2 className="text-base font-medium">Bank Transfer</h2>

              <div>
                <label className="block text-sm text-gray-600 mb-1.5">
                  Account Name <span className="text-red-500">*</span>
                </label>
                <Input placeholder="Placeholder" required className="bg-gray-50" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">
                    Account Type <span className="text-red-500">*</span>
                  </label>
                  <Input placeholder="Placeholder" required className="bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">
                    Account Number <span className="text-red-500">*</span>
                  </label>
                  <Input placeholder="Placeholder" required className="bg-gray-50" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1.5">
                  Bank IBN <span className="text-red-500">*</span>
                </label>
                <Input placeholder="Placeholder" required className="bg-gray-50" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">
                    Bank Name <span className="text-red-500">*</span>
                  </label>
                  <Input placeholder="Placeholder" required className="bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">Bank Swift Code</label>
                  <Input placeholder="Placeholder" className="bg-gray-50" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1.5">
                  Bank Address <span className="text-red-500">*</span>
                </label>
                <Input placeholder="Placeholder" required className="bg-gray-50" />
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="account-confirmation"
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[#FF7A45] focus:ring-[#FF7A45]"
                  />
                  <label htmlFor="account-confirmation" className="text-sm">
                    I attest that I am the owner and have full authorization to this bank account
                  </label>
                </div>

                <div className="text-center space-y-1">
                  <p className="text-red-500 text-sm font-medium">Please double-check your account information!</p>
                  <p className="text-red-500 text-sm">
                    Incorrect or mismatched account name and number can result in withdrawal delays and fees
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="border-t p-6 flex justify-between">
            <Link href="/upload">
          <Button variant="outline" className="border-[#1D1B44] text-[#1D1B44] hover:bg-[#1D1B44] hover:text-white">
            Back
          </Button>
          </Link>

          <Link href="/ready">
          <Button className="bg-[#FF7A45] hover:bg-[#FF7A45]/90 text-white px-8">Done</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

