"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

type PaymentInfo = {
  email: string;
  account_name: string;
  account_number: string;
  account_type: string;
  bank_ibn: string;
  bank_name: string;
  bank_swift_code: string;
  bank_address: string;
  account_confirmation: boolean;
};

export default function PaymentSetup() {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    email: "",
    account_name: "",
    account_number: "",
    account_type: "",
    bank_ibn: "",
    bank_name: "",
    bank_swift_code: "",
    bank_address: "",
    account_confirmation: false,
  });
  const [loading, setLoading] = useState(false);
;

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
        setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch("https://vicsmall-backend-ckn4.onrender.com/v1/api/shop/vendor-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(paymentInfo),
      });

      const data = await response.json();
      console.log("Payment info submission response data:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit payment information");
      }

      router.push("/ready");
    } catch (error) {
      console.error("Error submitting payment info:", error);
      ;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm">
        <div className="p-8 space-y-6">
          <div className="text-center space-y-1">
            <div className="text-[#FF7A45] text-sm mb-4">3 of 3</div>
            <h1 className="text-2xl font-bold text-gray-900">Payment Setup</h1>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
      
            <div className="space-y-4">
              <h2 className="text-base font-medium">Paypal</h2>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Placeholder"
                  type="email"
                  required
                  className="bg-gray-50"
                  value={paymentInfo.email}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, email: e.target.value })}
                />
              </div>
            </div>

            {/* Bank Transfer Section */}
            <div className="space-y-4">
              <h2 className="text-base font-medium">Bank Transfer</h2>

              <div>
                <label className="block text-sm text-gray-600 mb-1.5">
                  Account Name <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Placeholder"
                  required
                  className="bg-gray-50"
                  value={paymentInfo.account_name}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, account_name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">
                    Account Type <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Placeholder"
                    required
                    className="bg-gray-50"
                    value={paymentInfo.account_type}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, account_type: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">
                    Account Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Placeholder"
                    required
                    className="bg-gray-50"
                    value={paymentInfo.account_number}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, account_number: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1.5">
                  Bank IBN <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Placeholder"
                  required
                  className="bg-gray-50"
                  value={paymentInfo.bank_ibn}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, bank_ibn: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">
                    Bank Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Placeholder"
                    required
                    className="bg-gray-50"
                    value={paymentInfo.bank_name}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, bank_name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">Bank Swift Code</label>
                  <Input
                    placeholder="Placeholder"
                    className="bg-gray-50"
                    value={paymentInfo.bank_swift_code}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, bank_swift_code: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1.5">
                  Bank Address <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Placeholder"
                  required
                  className="bg-gray-50"
                  value={paymentInfo.bank_address}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, bank_address: e.target.value })}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="account-confirmation"
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[#FF7A45] focus:ring-[#FF7A45]"
                    checked={paymentInfo.account_confirmation}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, account_confirmation: e.target.checked })}
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

          <Button type="submit" className="bg-[#FF7A45] hover:bg-[#FF7A45]/90 text-white px-8" disabled={loading} onClick={handleSubmit}>
            {loading ? "Submitting..." : "Done"}
          </Button>
        </div>
      </div>
    </div>
  );
}