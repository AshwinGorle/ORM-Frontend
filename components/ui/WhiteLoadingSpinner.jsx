// components/ui/WhiteLoadingSpinner.js
export function WhiteLoadingSpinner({ size = "sm", className = "" }) {
    const sizes = {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
    };
  
    return (
      <div
        className={`animate-spin rounded-full border-2 border-t-transparent border-white ${sizes[size]} ${className}`}
        role="status"
      />
    );
  }
  