export const getActionErrorMessage = (error) => {
    let errorMessage = "An error occurred";
    if (error.response) {
        errorMessage = error.response.data.message || "Server error";
    } else if (error.request) {
        errorMessage = "Network error";
    } else {
        errorMessage = error.message || "Unknown error";
    }
    return errorMessage
}