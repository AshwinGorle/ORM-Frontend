export function isValidEmail(email) {
    // Regular expression to match a valid email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    // Test the email against the regular expression
    return emailRegex.test(email);
  }