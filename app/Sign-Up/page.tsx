"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Person, Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [countryCode, setCountryCode] = useState("+234");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  //async
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(
        "https://vicsmall-backend.onrender.com/v1/api/auth/create-vendor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            full_name: fullName.trim(),
            country_code: countryCode,
            phone_number: phoneNumber.trim(),
            password,
            is_vendor: true,
            is_active: true,
            is_delete: false,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        if (data?.Data?.email) {
          throw new Error(data?.Data?.email[0] || "Invalid email");
        }
        throw new Error(data?.Message || "Failed to create account");
      }

      // Save user's full name to local storage
      localStorage.setItem("fullName", fullName.trim());
      localStorage.setItem("email", email.trim());
      localStorage.setItem("phoneNumber", phoneNumber.trim().trim());

      // Optional: If your backend returns a token upon registration, store it
      if (data?.Data?.token) {
        localStorage.setItem("token", data.Data.token);
      }

      router.push("/Sign-in");
    } catch (error) {
      console.log(error);
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md p-4 pt-36 lg:pt-36">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold">
          Sign up! <span className="text-purple-700">Vendor</span>
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Input
                className="pl-10"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 left-3 my-auto flex items-center text-gray-400">
                <Person className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm">
              Full Name <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Enter your full name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-[140px,1fr] gap-4">
            <div>
              <label className="mb-1 block text-sm">Country Code</label>
              <select
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                <option value="+234">🇳🇬 +234</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm">Phone Number</label>
              <Input
                placeholder="Enter phone number"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Input
                className="pr-10"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 my-auto flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <VisibilityOff className="h-5 w-5" />
                ) : (
                  <Visibility className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <Button
          className="mt-6 w-full bg-[#F37F34] text-white hover:bg-[#F37F34]/90"
          size="lg"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign up"}
        </Button>
      </form>
    </div>
  );
}
