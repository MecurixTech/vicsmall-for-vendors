"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import InsertDriveFile from "@mui/icons-material/InsertDriveFile";
import type React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/constants";

export default function Upload() {
  const [validId, setValidId] = useState<File | null>(null);
  const [businessLogo, setBusinessLogo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);


  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: "id" | "logo") => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === "id") {
        setValidId(file);
      } else {
        setBusinessLogo(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      if (validId) {
        const formData = new FormData();
        formData.append("doc_type", "valid_id");
        formData.append("file", validId);

        const response = await fetch(`${API_BASE_URL}/shop/vendor-documents`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          body: formData,
        });

        const data = await response.json();
        console.log("Valid ID upload response data:", data);

        if (!response.ok) {
          throw new Error(data.message || "Failed to upload valid ID");
        }
      }

      if (businessLogo) {
        const formData = new FormData();
        formData.append("doc_type", "business_logo");
        formData.append("file", businessLogo);

        const response = await fetch(`${API_BASE_URL}/shop/vendor-documents`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          body: formData,
        });

        const data = await response.json();
        console.log("Business logo upload response data:", data);

        if (!response.ok) {
          throw new Error(data.message || "Failed to upload business logo");
        }
      }

      router.push("/payment");
    } catch (error) {
      console.error("Error:", error);
      } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm">
        <div className="p-8 space-y-6">
          <div className="text-center space-y-1">
            <div className="text-[#FF7A45] text-sm mb-4">2 of 3</div>
            <h1 className="text-2xl font-bold text-gray-900">Document Upload</h1>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
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

            <div className="border-t p-6 flex justify-between">
              <Link href="/storesetup">
                <Button variant="outline" className="border-[#1D1B44] text-[#1D1B44] hover:bg-[#1D1B44] hover:text-white">
                  Back
                </Button>
              </Link>

              <Button type="submit" className="bg-[#FF7A45] hover:bg-[#FF7A45]/90 text-white px-8" disabled={loading}>
                {loading ? "Submitting..." : "Next"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}