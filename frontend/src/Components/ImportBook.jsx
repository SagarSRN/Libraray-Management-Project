import React, { useState } from "react";
import axios from "axios";

const ImportBooks = () => {
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertType, setAlertType] = useState("");

  const handleImport = async () => {
    
    if (!title.trim()) {
      setAlertType("error");
      setStatus("⚠️ Please enter a book title.");
      return;
    }

    try {
      setLoading(true);
      setAlertType("info");
      setStatus("⏳ Importing books...");

      // Api 
      const response = await axios.get(
        `http://127.0.0.1:8000/api/import-books/?title=${title}&page=${page}`
      );

      if (response.data.status === "success") {
        setAlertType("success");
        setStatus(`✅ Imported ${response.data.imported} books successfully!`);
      } else {
        setAlertType("error");
        setStatus("⚠️ No books found or import failed.");
      }
    } catch (error) {
      console.error("Error importing books:", error);
      setAlertType("error");
      setStatus("❌ Failed to import books. Please try again.");
    } finally {
      setLoading(false);

      // 🔹 Auto-hide status after 4 seconds
      setTimeout(() => setStatus(""), 4000);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-bold text-blue-600 mb-5 flex items-center gap-2">
        📥 Import Books
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter book title (e.g. Harry Potter)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          placeholder="Page number (e.g. 1)"
          value={page}
          onChange={(e) => setPage(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleImport}
          disabled={loading}
          className={`w-full py-3 rounded-md font-semibold text-white transition-all duration-200 ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Importing..." : "Import Books"}
        </button>
      </div>

      {status && (
        <div
          className={`mt-5 text-center py-3 px-4 rounded-lg font-medium transition-all duration-500 ${
            alertType === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : alertType === "error"
              ? "bg-red-100 text-red-700 border border-red-300"
              : "bg-blue-100 text-blue-700 border border-blue-300"
          }`}
        >
          {status}
        </div>
      )}
    </div>
  );
};

export default ImportBooks;
