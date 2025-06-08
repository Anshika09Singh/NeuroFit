import React, { useEffect, useState } from "react";

const ProgressDashboard = () => {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetch progress data from server
  const fetchProgress = () => {
    setLoading(true);
    fetch("${https://neuro-fit-64ts.vercel.app/}/save-progress")
      .then((res) => res.json())
      .then((data) => {
        setProgress(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching progress:", err);
        setError("Failed to load progress");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  // Function to send/save progress to backend
  const sendProgress = async () => {
    setSaving(true);
    setError(null);

    const progress = {
      gameName: "Task Juggler",
      score: 87,
      difficulty: "Medium",
      timeSpent: "2m 10s",
      dateTime: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:5000/save-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(progress),
      });

      const data = await res.json();
      console.log("Progress status:", data.message);

      if (res.ok) {
        // Refresh the progress list after saving
        fetchProgress();
      } else {
        setError(data.message || "Failed to save progress");
      }
    } catch (err) {
      console.error("Error saving progress:", err);
      setError("Network error while saving progress");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-8 text-indigo-700 text-center">
        Game Progress Tracker
      </h2>

      <div className="flex justify-center mb-6">
        <button
          onClick={sendProgress}
          disabled={saving}
          className={`px-6 py-3 rounded-md font-semibold text-white shadow-md transition 
            ${
              saving
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
        >
          {saving ? "Saving..." : "Save Sample Progress"}
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading progress...</p>
      ) : error ? (
        <p className="text-center text-red-600 font-semibold">{error}</p>
      ) : progress.length === 0 ? (
        <p className="text-center text-gray-700">No progress recorded yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="table-auto w-full bg-white">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-6 py-3">Game</th>
                <th className="px-6 py-3">Score</th>
                <th className="px-6 py-3">Difficulty</th>
                <th className="px-6 py-3">Time Spent</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {progress.map((entry, idx) => (
                <tr
                  key={idx}
                  className={`text-center border-b hover:bg-indigo-50 transition ${
                    idx % 2 === 0 ? "bg-indigo-50/50" : ""
                  }`}
                >
                  <td className="px-6 py-3 font-medium text-indigo-800">
                    {entry.gameName}
                  </td>
                  <td className="px-6 py-3">{entry.score}</td>
                  <td className="px-6 py-3 capitalize">{entry.difficulty}</td>
                  <td className="px-6 py-3">{entry.timeSpent}</td>
                  <td className="px-6 py-3">
                    {new Date(entry.dateTime).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProgressDashboard;
