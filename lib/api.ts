
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const verifyRecaptcha = async (token: string): Promise<boolean> => {
  console.log("Verifying reCAPTCHA token")

  if (!token) {
    console.error("No reCAPTCHA token provided")
    return false
  }

  try {
  
    return true
  } catch (error) {
    console.error("reCAPTCHA Error:", error)
    return false
  }
}

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  console.log(`API Request: ${endpoint}`, { method: options.method || "GET" })
  const url = `${API_BASE_URL}${endpoint}`

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      console.error(`API Error (${endpoint}):`, data)

      const errorMessage = data.Message || data.message || `Request failed with status ${response.status}`

      if (data.Data && typeof data.Data === "object") {
        const fieldErrors: Record<string, string[]> = {}

        Object.entries(data.Data).forEach(([field, errors]) => {
          if (Array.isArray(errors) && errors.length > 0) {
            fieldErrors[field] = errors
          }
        })

        if (Object.keys(fieldErrors).length > 0) {
          const error = new Error(errorMessage) as Error & { fieldErrors?: Record<string, string[]> }
          error.fieldErrors = fieldErrors
          throw error
        }
      }

      throw new Error(errorMessage)
    }

    console.log(`API Response (${endpoint}):`, { status: response.status, success: true })
    return { data, status: response.status }
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error)
    throw error
  }
}

export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token")

  if (!token) {
    console.error("Authentication Error: Token not found")
    throw new Error("Authentication token not found")
  }

  return fetchApi(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  })
}

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false
  return !!localStorage.getItem("token")
}

export const logout = () => {
  localStorage.removeItem("token")
  
  localStorage.removeItem("fullName")
  localStorage.removeItem("email")
  localStorage.removeItem("phoneNumber")
  localStorage.removeItem("shopName")
}

