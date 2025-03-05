import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function WelcomeScreen() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm p-8 md:p-12">
        <div className="space-y-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome to the Marketplace</h1>
          <div className="space-y-4 text-gray-600">
            <p>
              Thank you for choosing The Marketplace to power your online store! This quick setup wizard will help you
              configure the basic settings. It&apos;s completely optional and shouldn&apos;t take longer than two minutes.
            </p>
<p>No time right now? If you don&apos;t want to go through the wizard, you can skip and return to the Store!</p>
          </div>
        </div>
        <div className="mt-12 flex justify-end">

          <Link href="/storesetup">
          <Button className="bg-[#FF7A45] hover:bg-[#FF7A45]/90 text-white px-8">Next</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

