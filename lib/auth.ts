"use server"

import { cookies } from "next/headers"
import { verifyRecaptcha } from "@/lib/recaptcha"
import { API_BASE_URL } from "@/lib/api"

const setAuthCookie = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, 
    path: "/",
  });
}

export async function signUp(formData: FormData) {
  console.log("🔄 Processing signup request")

  const recaptchaToken = formData.get("recaptchaToken") as string

  const isValidRecaptcha = await verifyRecaptcha(recaptchaToken)
  if (!isValidRecaptcha) {
    
    return { success: false, message: "reCAPTCHA validation failed" }
  }

  try {
    const email = formData.get("email") as string
    const full_name = formData.get("full_name") as string
    const country_code = formData.get("country_code") as string
    const phone_number = formData.get("phone_number") as string
    const password = formData.get("password") as string


    const response = await fetch(`${API_BASE_URL}/auth/create-vendor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        full_name: full_name.trim(),
        country_code,
        phone_number: phone_number.trim(),
        password,
        is_vendor: true,
        is_active: true,
        is_deleted: false,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      
      return {
        success: false,
        message: data.Message || data.message || "Failed to create account",
        error: data.error || null,
      }
    }

    if (data?.Data?.access) {
      
      setAuthCookie(data.Data.access)
      return {
        success: true,
        message: "Account created successfully",
        userData: {
          fullName: full_name.trim(),
          email: email.trim(),
          phoneNumber: phone_number.trim(),
        },
      }
    } else {
     
      return { success: false, message: "Token not found in response" }
    }
  } catch (error: any) {
    
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
      error: error,
    }
  }
}

export async function signIn(formData: FormData) {
 

  const recaptchaToken = formData.get("recaptchaToken") as string
  const isValidRecaptcha = await verifyRecaptcha(recaptchaToken)
  if (!isValidRecaptcha) {
    
    return { success: false, message: "reCAPTCHA validation failed" }
  }

  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const response = await fetch(`${API_BASE_URL}/auth/login-vendor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        password,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      
      return {
        success: false,
        message: data.Message || data.message || "Login failed. Please check your credentials.",
        error: data.error || null,
      }
    }

    if (data?.Data?.access) {
    
      setAuthCookie(data.Data.access)

      try {
        const profileResponse = await fetch(`${API_BASE_URL}/shop/vendor-payment`, {
          headers: {
            Authorization: `Bearer ${data.Data.access}`,
          },
        })

        const profileData = await profileResponse.json()

        if (profileData.Data.account_name) {
        
          return {
            success: true,
            message: "Login successful",
            redirect: "/",
          }
        } else {
        
          return {
            success: true,
            message: "Login successful",
            redirect: "/storesetup",
          }
        }
      } catch (profileError) {
      
        return {
          success: true,
          message: "Login successful, but could not verify store setup",
          redirect: "/storesetup",
        }
      }
    } else {
      return { success: false, message: "Authentication token not found in response" }
    }
  } catch (error: any) {
  
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
      error: error,
    }
  }
}

export async function setupStore(formData: FormData) {


  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
  
    return { success: false, message: "Authentication required" }
  }

  try {
    const shop_name = formData.get("shop_name") as string
    const products_preOrder = formData.get("products_preOrder") as string
    const product_arrival_time = formData.get("product_arrival_time") as string
    const shop_email = formData.get("shop_email") as string
    const part_payment = formData.get("part_payment") === "on"
    const shop_state = formData.get("shop_state") as string
    const accept_terms = formData.get("accept_terms") === "on"

    if (!accept_terms) {
      console.error("❌ Store setup failed: Terms not accepted")
      return { success: false, message: "Please accept the terms and conditions" }
    }


    const response = await fetch(`${API_BASE_URL}/shop/create-shop`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        shop_name,
        products_preOrder: products_preOrder === "yes",
        product_arrival_time: Number.parseInt(product_arrival_time, 10),
        shop_email,
        part_payment,
        shop_state,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
   
      return {
        success: false,
        message: data.Message || data.message || "Failed to create shop",
        error: data.error || null,
      }
    }

    return {
      success: true,
      message: "Store setup completed successfully",
      shopData: {
        shopName: shop_name,
      },
    }
  } catch (error: any) {
 
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
      error: error,
    }
  }
}

