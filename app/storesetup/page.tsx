"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Person } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function StoreSetup() {
  const [shopName, setShopName] = useState("");
  const [preOrder, setPreOrder] = useState("yes");
  const [arrivalTime, setArrivalTime] = useState("");
  const [email, setEmail] = useState("");
  const [partPayment, setPartPayment] = useState(false);
  const [shopState, setShopState] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const requestBody = {
      shop_name: shopName,
      products_preOrder: preOrder === "yes",
      product_arrival_time: parseInt(arrivalTime, 10),
      shop_email: email,
      part_payment: partPayment,
      shop_state: shopState,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch("https://vicsmall-backend-ckn4.onrender.com/v1/api/shop/create-shop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to create shop");
      }

      router.push("/upload");
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm">
        <div className="p-8 space-y-6">
          <div className="text-center space-y-1">
            <div className="text-[#FF7A45] text-sm mb-4">1 of 3</div>
            <h1 className="text-2xl font-bold text-gray-900">Store Setup</h1>
            <p className="text-gray-600">Tell us a little about the business</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1.5">
                  Shop Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    className="pl-10"
                    placeholder="Place holder"
                    required
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                  />
                  <div className="absolute left-3 inset-y-0 my-auto flex items-center text-gray-400 hover:text-gray-600">
                    <Person className="h-5 w-5" />
                  </div>
                </div>
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
                <Input
                  placeholder="Placeholder"
                  required
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Placeholder"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
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
                    checked={partPayment}
                    onChange={(e) => setPartPayment(e.target.checked)}
                  />
                  <label htmlFor="part-payment" className="text-sm">
                    Part Payment
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1.5">State</label>
                <Input
                  placeholder="Placeholder"
                  value={shopState}
                  onChange={(e) => setShopState(e.target.value)}
                />
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

            <div className="border-t p-6 flex justify-end">
              <Button
                type="submit"
                className="bg-[#FF7A45] hover:bg-[#FF7A45]/90 text-white px-8"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Next"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}