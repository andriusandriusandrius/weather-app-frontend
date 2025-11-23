export function getUserFriendlyMessage(error: any) {
  if (!error.response && error.request) {
    return "Network error. Check your connection.";
  }

  if (error.response?.status === 404) return "City not found.";
  if (error.response?.status === 401) return "Invalid API key.";
  if (error.response?.status === 429) return "Rate limit exceeded. Try later.";
  return error.message || "Something went wrong.";
}
