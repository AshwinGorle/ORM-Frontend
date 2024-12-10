// components/ui/spinner.js
export function Spinner({ size = "sm", className = "" }) {
    const sizes = {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
    };
  
    return (
      <div
        className={`animate-spin rounded-full border-2 border-t-transparent border-primary ${sizes[size]} ${className}`}
        role="status"
      />
    );
  }
  