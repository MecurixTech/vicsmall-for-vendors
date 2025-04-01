export type PasswordRequirement = {
  id: string
  label: string
  validator: (password: string) => boolean
}

export const passwordRequirements: PasswordRequirement[] = [
  {
    id: "length",
    label: "At least 8 characters",
    validator: (password) => password.length >= 8,
  },
  {
    id: "uppercase",
    label: "At least one uppercase letter",
    validator: (password) => /[A-Z]/.test(password),
  },
  {
    id: "lowercase",
    label: "At least one lowercase letter",
    validator: (password) => /[a-z]/.test(password),
  },
  {
    id: "number",
    label: "At least one number",
    validator: (password) => /[0-9]/.test(password),
  },
  {
    id: "special",
    label: "At least one special character",
    validator: (password) => /[^A-Za-z0-9]/.test(password),
  },
]

export function calculatePasswordStrength(password: string): number {
  if (!password) return 0

  const metRequirements = passwordRequirements.filter((req) => req.validator(password))
  return (metRequirements.length / passwordRequirements.length) * 100
}

export function validatePassword(password: string): boolean {
  return passwordRequirements.every((req) => req.validator(password))
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

