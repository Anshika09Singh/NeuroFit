import React, { useState } from "react";

const FeedbackForm = () => {
  const [rating, setRating] = useState(1);
  const [comments, setComments] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for rating
    if (rating < 1 || rating > 5) {
      alert("Please provide a rating between 1 and 5.");
      return;
    }

    const feedback = { rating, comments, email };

    try {
      const response = await fetch(
        "https://neurofit-1backend.onrender.com/send-feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedback),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert(result.message || "Feedback submitted successfully!");
        setIsSubmitted(true);
        setRating(1);
        setComments("");
        setEmail("");
      } else {
        alert(result.message || "Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again later.");
    }
  };

  return (
    <div className="max-h-screen bg-gray-600 flex flex-col items-center py-10 px-10 opacity-90 transition-opacity duration-500 ease-in-out">
      {isSubmitted ? (
        <div className="max-w-md mx-auto bg-white shadow-xl rounded-lg p-8 text-center opacity-60 animate-fadeIn transition-opacity duration-500 ease-in-out">
          <h2 className="text-3xl font-semibold text-green-700 opacity-100 animate-fadeIn transition-opacity duration-500 ease-in-out">
            Thank you for your feedback!
          </h2>
          <p className="text-gray-600 mt-4 opacity-100 animate-fadeIn transition-opacity duration-500 ease-in-out">
            We appreciate your input and will use it to improve.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-full lg:max-w-lg mx-auto bg-white shadow-xl rounded-lg p-8 space-y-6 opacity-100 animate-fadeIn transition-opacity duration-500 ease-in-out"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 opacity-90 transition-opacity duration-500 ease-in-out">
            Give Your Feedback
          </h2>

          <div>
            <label
              htmlFor="rating"
              className="block text-lg font-medium text-gray-900 opacity-80 transition-opacity duration-300 ease-in-out"
            >
              Rating (1-5):
            </label>
            <input
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              min="1"
              max="5"
              required
              className="mt-2 p-3 w-full rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-opacity duration-200 ease-in-out opacity-90"
            />
          </div>

          <div>
            <label
              htmlFor="comments"
              className="block text-lg font-medium text-gray-800 opacity-80 transition-opacity duration-300 ease-in-out"
            >
              Comments:
            </label>
            <textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Write your feedback here..."
              className="mt-2 p-3 w-full rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-opacity duration-200 ease-in-out opacity-90"
              rows={4}
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-800 opacity-80 transition-opacity duration-300 ease-in-out"
            >
              Email (optional):
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-2 p-3 w-full rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-opacity duration-200 ease-in-out opacity-90"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition duration-200 ease-in-out hover:scale-105 opacity-90 hover:opacity-100"
          >
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
};

export default FeedbackForm;
