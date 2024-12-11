function getExpiryTimeInWords(expiryDateStr) {
    const expiryDate = new Date(expiryDateStr);
    const now = new Date();
  
    if (expiryDate <= now) {
      return "Expired";
    }
  
    // Calculate the difference in milliseconds
    let diffMs = expiryDate - now;
  
    // Helper constants for conversions
    const MS_IN_A_DAY = 24 * 60 * 60 * 1000;
    const MS_IN_A_MONTH = MS_IN_A_DAY * 30.44; // Approximate average month
    const MS_IN_A_YEAR = MS_IN_A_DAY * 365.25; // Approximate average year
  
    // Calculate years, months, days
    const years = Math.floor(diffMs / MS_IN_A_YEAR);
    diffMs -= years * MS_IN_A_YEAR;
  
    const months = Math.floor(diffMs / MS_IN_A_MONTH);
    diffMs -= months * MS_IN_A_MONTH;
  
    const days = Math.floor(diffMs / MS_IN_A_DAY);
  
    // Construct the result string
    const result = [];
    if (years > 0) result.push(`${years}Y`);
    if (months > 0) result.push(`${months}M`);
    if (days > 0) result.push(`${days}D`);
  
    return result.join(" ") || "0D";
  }
  
  
  export default getExpiryTimeInWords