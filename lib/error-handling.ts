
export function extractErrorMessage(data: any): string {
  
    if (data?.non_field_errors && Array.isArray(data.non_field_errors) && data.non_field_errors.length > 0) {
      return data.non_field_errors[0]
    }
  
    if (data?.detail) {
      return data.detail
    }
  
    if (data?.Data && typeof data.Data === "object") {
     
      const fieldErrors = Object.entries(data.Data)
        .filter(([_, errors]) => Array.isArray(errors) && errors.length > 0)
        .map(([field, errors]) => `${field}: ${(errors as string[])[0]}`)
  
      if (fieldErrors.length > 0) {
        return fieldErrors.join(", ")
      }
    }
  
    if (data?.Message) {
      return data.Message
    }
  
    if (data?.message) {
      return data.message
    }
  
    return "An unknown error occurred"
  }
  
  