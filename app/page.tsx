"use client"
import { Search, Edit} from '@mui/icons-material';
import QrCode from '@mui/icons-material/QrCode';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"


const Home = () => {
  return (
    <>
    <h1 className="mb-4 hidden text-3xl font-bold text-gray-800 md:block">
      Dashboard
    </h1>
 {/* Search bar */}
 <div className="flex items-center justify-between gap-4 px-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search invoice" className="pl-9" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="default">Manage Invoice</Button>
          <Button className="bg-[#F97316] hover:bg-[#F97316]/90">Add New</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Invoice Details */}
        <div className="bg-white rounded-lg p-6 space-y-6">
          {/* Invoice Number */}
          <div className="bg-[#FF7A45] text-white rounded-2xl p-6 flex justify-between">
            <div>
              <p className="text-sm mb-1">Invoice Number</p>
              <p className="mb-4">No: #96DS6A</p>
              <p className="text-sm">Issue Date: Dec 05 2024</p>
              <p className="text-sm">Due Date: Dec 12 2024</p>
            </div>
            <div className="flex items-center justify-center">
              <QrCode className="w-16 h-16" />
            </div>
          </div>

          {/* Invoice To */}
          <div className="bg-[#000051] text-white rounded-2xl p-6">
            <p className="text-sm mb-2">Invoice to</p>
            <p className="font-medium mb-4">Hasedwdk</p>
            <p className="text-sm">19th dema street, Dubai</p>
            <p className="text-sm">Dubai UAE</p>
          </div>

          {/* Item Details */}
          <div className="border rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 text-sm font-medium text-gray-500">PRODUCT</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">PRICE</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">QUANTITY</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">TOTAL AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { quantity: "02", total: "$200" },
                  { quantity: "02", total: "$200" },
                  { quantity: "15", total: "$1500" },
                ].map((item, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span>Fancy Bikini</span>
                      </div>
                    </td>
                    <td className="p-4">$100</td>
                    <td className="p-4">{item.quantity}</td>
                    <td className="p-4">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Comment</label>
              <Textarea placeholder="Say something....." className="resize-none h-[120px]" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">SUBTOTAL:</span>
                <span className="font-medium">$4,300.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">DISCOUNT:</span>
                <span className="font-medium">$100.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ESTIMATED TAX:</span>
                <span className="font-medium">$45.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">SHIPPING CHARGE:</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="h-px bg-gray-200 my-2" />
              <div className="flex justify-between">
                <span className="text-gray-600">TOTAL (USD):</span>
                <span className="font-medium">$4,235.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Profile */}
        <div className="w-full max-w-md rounded-3xl bg-white overflow-hidden">
          <div className="bg-[#FF7A45] h-32 rounded-b-[48px]" />
          <div className="px-8 pb-8 -mt-10">
            <div className="flex flex-col items-center mb-8">
              <Avatar className="w-20 h-20 border-4 border-white">
                <AvatarFallback className="bg-gray-200">V</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-medium mt-2">Vera</h2>
              <p className="text-sm text-gray-500">Customer</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">COUNTRY:</span>
                <span className="text-sm">Dubia</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">LOCATION:</span>
                <span className="text-sm">19th dema street, Dubia</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">PHONE NUMBER:</span>
                <span className="text-sm">+971 456 444 556</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">EMAIL ADDRESS:</span>
                <span className="text-sm">vera@gmail.com</span>
              </div>
              <div className="space-y-3">
      <div className="border rounded-lg p-4 space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Payment Method</h3>
        <Button variant="ghost" className="text-blue-600 gap-2">
          <Edit className="h-4 w-4" />
          Edit
        </Button>
      </div>
        <div className="flex justify-between">
          <span className="text-gray-600">CARD HOLDER NAME:</span>
          <span className="font-medium">Vera</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">CARD NUMBER:</span>
          <span className="font-medium">xxxx xxxx xxxx 1234</span>
        </div>
        
      </div>
      
    </div>
            </div>
          </div>
        </div>
        
      </div>

      <div className="flex gap-2 mt-6">
        <Button variant="outline" className="px-6">Share</Button>
        <Button className="bg-[#FF7A45] hover:bg-[#FF7A45]/90 px-6">Download</Button>
      </div>

    </>
      );
};

export default Home;
