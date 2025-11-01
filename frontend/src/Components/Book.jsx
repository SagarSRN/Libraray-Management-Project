import React, { useEffect, useState } from "react";
import axios from "axios";

const Book = ({ refresh }) => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/books/");
      setBooks(res.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [refresh]);

  // For when the refresh of page this will resfresh data

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-blue-600">📚 Books List</h2>
        <button
          onClick={fetchBooks}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
        >
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto rounded-md border border-gray-200">
        <table className="w-full text-sm md:text-base">
          <thead className="bg-blue-100 text-blue-900 uppercase tracking-wide">
            <tr>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Author</th>
              <th className="p-3 border">ISBN</th>
              <th className="p-3 border text-center">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book) => (
                <tr
                  key={book.id}
                  className="hover:bg-blue-50 border-b transition duration-150"
                >
                  <td className="p-3 border text-gray-800">{book.title}</td>
                  <td className="p-3 border text-gray-700">{book.author}</td>
                  <td className="p-3 border text-gray-600">{book.isbn}</td>
                  <td className="p-3 border text-center font-semibold text-blue-700">
                    {book.quantity}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-5 text-gray-500 italic">
                  No books found 😕
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Book;
