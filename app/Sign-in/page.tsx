"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "https://vicsmall-backend.onrender.com/v1/api/auth/login-vendor/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: trimmedEmail,
            password: trimmedPassword,
          }),
        }
      );

      const data = await res.json();
      console.log("Response Status:", res.status);
      console.log("Response Data:", data);

      if (!res.ok) {
        throw new Error(data.message || `Login failed with status ${res.status}`);
      }

           localStorage.setItem("token", data.token);
           localStorage.setItem("username", data.fullName);

       // alert("Login successful!");
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8 p-4">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold">
          Welcome back! <span className="text-purple-700">VICSMALL</span>
        </h1>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="text-gray-400">
              Email
            </label>
            <div className="relative">
              <Input
                id="email"
                className="pl-10"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="5" />
                  <path d="M20 21a8 8 0 0 0-16 0" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="text-gray-400">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 inset-y-0 my-auto flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <VisibilityOff className="h-5 w-5" />
                ) : (
                  <Visibility className="h-5 w-5" />
                )}
              </button>
            </div>
            <div className="flex justify-end mt-1">
              <Link
                href="/recover/RecoverPassword"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          type="submit"
          className="w-full bg-[#F37F34] hover:bg-[#F37F34]/90 text-white"
          size="lg"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-gray-500">Or login with</span>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button type="button" className="p-2 border rounded-lg hover:bg-gray-50">
            <svg className="w-6 h-6">
              <image
                href="https://www.svgrepo.com/show/475656/google-color.svg"
                width="100%"
                height="100%"
              />
            </svg>
          </button>

          <button type="button" className="p-2 border rounded-lg hover:bg-gray-50">
            <svg className="w-6 h-6">
              <image
                href="https://www.svgrepo.com/show/475647/facebook-color.svg"
                width="100%"
                height="100%"
              />
            </svg>
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/Sign-Up" className="text-purple-700 hover:text-purple-800">
            Sign up as a Vendor
          </Link>
        </p>
      </form>
    </div>
  );
}
