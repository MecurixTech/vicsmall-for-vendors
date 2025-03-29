"use client"

import { useEffect, useRef, useState } from "react"
import { RECAPTCHA_SITE_KEY } from "@/lib/constants"

interface ReCaptchaProps {
  onVerify: (token: string) => void
}

declare global {
  interface Window {
    grecaptcha: any
    onRecaptchaLoad: () => void
  }
}

export function ReCaptcha({ onVerify }: ReCaptchaProps) {
  const recaptchaRef = useRef<HTMLDivElement>(null)
  const recaptchaWidgetId = useRef<number | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    
    if (isInitialized) return

    // Function to initialize reCAPTCHA
    function initializeRecaptcha() {
      if (recaptchaRef.current && window.grecaptcha && window.grecaptcha.render && recaptchaWidgetId.current === null) {
        try {
          recaptchaWidgetId.current = window.grecaptcha.render(recaptchaRef.current, {
            sitekey: RECAPTCHA_SITE_KEY,
            callback: onVerify,
            "expired-callback": () => onVerify(""),
          })
          setIsInitialized(true)
        } catch (error) {
          console.error("Error rendering reCAPTCHA:", error)
        }
      }
    }

    // Set up the global callback
    window.onRecaptchaLoad = () => {
      initializeRecaptcha()
    }

    // Load the reCAPTCHA script if it hasn't been loaded yet
    if (!window.grecaptcha) {
      const script = document.createElement("script")
      script.src = `https://www.google.com/recaptcha/api.js?render=explicit&onload=onRecaptchaLoad`
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    } else if (window.grecaptcha.render) {
      // If already loaded and ready
      initializeRecaptcha()
    }

    return () => {
      // Reset reCAPTCHA on unmount
      if (recaptchaWidgetId.current !== null && window.grecaptcha && window.grecaptcha.reset) {
        try {
          window.grecaptcha.reset(recaptchaWidgetId.current)
        } catch (error) {
          console.error("Error resetting reCAPTCHA:", error)
        }
      }
    }
  }, [onVerify, isInitialized])

  return <div ref={recaptchaRef} className="mt-4 flex justify-center" />
}

