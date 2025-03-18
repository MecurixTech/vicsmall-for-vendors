"use client";
import { Search, Edit } from "@mui/icons-material";
import QrCode from "@mui/icons-material/QrCode";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const InvoicePage = () => {
  return (
    <>
      <h1 className="mb-4 hidden text-3xl font-bold text-gray-800 md:block">
        Dashboard
      </h1>
      {/* Search bar */}
      <div className="mb-6 flex items-center justify-between gap-4 px-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search invoice" className="pl-9" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="default">
            Manage Invoice
          </Button>
          <Button className="bg-[#F97316] hover:bg-[#F97316]/90">
            Add New
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Invoice Details */}
        <div className="space-y-6 rounded-lg bg-white p-6">
          {/* Invoice Number */}
          <div className="flex justify-between rounded-2xl bg-[#FF7A45] p-6 text-white">
            <div>
              <p className="mb-1 text-sm">Invoice Number</p>
              <p className="mb-4">No: #96DS6A</p>
              <p className="text-sm">Issue Date: Dec 05 2024</p>
              <p className="text-sm">Due Date: Dec 12 2024</p>
            </div>
            <div className="flex items-center justify-center">
              <QrCode className="h-16 w-16" />
            </div>
          </div>

          {/* Invoice To */}
          <div className="rounded-2xl bg-[#000051] p-6 text-white">
            <p className="mb-2 text-sm">Invoice to</p>
            <p className="mb-4 font-medium">Hasedwdk</p>
            <p className="text-sm">19th dema street, Dubai</p>
            <p className="text-sm">Dubai UAE</p>
          </div>

          {/* Item Details */}
          <div className="rounded-lg border">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left text-sm font-medium text-gray-500">
                    PRODUCT
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500">
                    PRICE
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500">
                    QUANTITY
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500">
                    TOTAL AMOUNT
                  </th>
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

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Comment</label>
              <Textarea
                placeholder="Say something....."
                className="h-[120px] resize-none"
              />
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
              <div className="my-2 h-px bg-gray-200" />
              <div className="flex justify-between">
                <span className="text-gray-600">TOTAL (USD):</span>
                <span className="font-medium">$4,235.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Profile */}
        <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white">
          <div className="h-32 rounded-b-[48px] bg-[#FF7A45]" />
          <div className="-mt-10 px-8 pb-8">
            <div className="mb-8 flex flex-col items-center">
              <Avatar className="h-20 w-20 border-4 border-white">
                <AvatarFallback className="bg-gray-200">V</AvatarFallback>
              </Avatar>
              <h2 className="mt-2 text-xl font-medium">Vera</h2>
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
                <div className="space-y-2 rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Payment Method</h3>
                    <Button variant="ghost" className="gap-2 text-blue-600">
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

      <div className="mt-6 flex gap-2">
        <Button variant="outline" className="px-6">
          Share
        </Button>
        <Button className="bg-[#FF7A45] px-6 hover:bg-[#FF7A45]/90">
          Download
        </Button>
      </div>
    </>
  );
};

export default InvoicePage;
