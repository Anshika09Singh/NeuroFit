export const saveProgress = async (progress) => {
  try {
    const response = await fetch(
      "https://neurofit-1backend.onrender.com/save-progress",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(progress),
      }
    );

    // Try to parse JSON even if not ok, to get error message
    const data = await response.json();

    if (!response.ok) {
      // Throw error with server message if present
      throw new Error(data.message || "Failed to save progress");
    }

    console.log("Progress saved:", data.message);
    return data; // return success data if needed
  } catch (error) {
    console.error("Error saving progress:", error);
    throw error; // rethrow so caller can handle it if needed
  }
};
