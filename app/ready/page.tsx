import { Button } from "@/components/ui/button"
import Verified from '@mui/icons-material/Verified';

export default function ready() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Store is Ready</h1>

        <div className="flex justify-center mb-8">
        <div className="p-4">
  <Verified style={{ width: "128px", height: "128px" }} className="text-green-500" />
</div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            variant="outline"
            className="border-[#1D1B44] text-[#1D1B44] hover:bg-[#1D1B44] hover:text-white order-2 sm:order-1"
          >
            Back To Marketplace
          </Button>
          <Button className="bg-[#FF7A45] hover:bg-[#FF7A45]/90 text-white px-8 order-1 sm:order-2">
            Go To Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}

