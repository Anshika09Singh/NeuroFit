// src/api.js
export const saveProgress = async (progress) => {
  try {
    const response = await fetch("https://neurofit-1backend.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(progress),
    });

    if (!response.ok) {
      throw new Error("Failed to save progress");
    }

    const data = await response.json();
    console.log("Progress saved:", data.message);
  } catch (error) {
    console.error("Error saving progress:", error);
  }
};
