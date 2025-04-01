// Server-side reCAPTCHA validation
export async function verifyRecaptcha(token: string): Promise<boolean> {
    console.log("🔄 Verifying reCAPTCHA token")
  
    if (!token) {
      console.error("❌ reCAPTCHA Error: No token provided")
      return false
    }
  
    try {
      const secretKey = process.env.RECAPTCHA_SECRET_KEY
  
      const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${token}`,
      })
  
      const data = await response.json()
  
      if (data.success) {
        console.log("✅ reCAPTCHA verification successful", { score: data.score })
        return true
      } else {
        console.error("❌ reCAPTCHA verification failed", data["error-codes"])
        return false
      }
    } catch (error) {
      console.error("❌ reCAPTCHA Error:", error)
      return false
    }
  }
  
  