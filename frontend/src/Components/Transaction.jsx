import React, { useState, useEffect } from "react";
import axios from "axios";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [bookId, setBookId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [rentFee, setRentFee] = useState("");
  const [status, setStatus] = useState("");
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);


  const fetchTransactions = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/transactions/");
      setTransactions(res.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };


  const fetchBooksAndMembers = async () => {
    try {
      const [bookRes, memberRes] = await Promise.all([
        axios.get("http://127.0.0.1:8000/api/books/"),
        axios.get("http://127.0.0.1:8000/api/members/"),
      ]);
      setBooks(bookRes.data);
      setMembers(memberRes.data);
    } catch (error) {
      console.error("Error loading dropdowns:", error);
    }
  };

  const addTransaction = async () => {
    if (!bookId || !memberId || !rentFee) {
      setStatus("⚠️ Please fill all fields.");
      return;
    }
    try {
      const _res = await axios.post("http://127.0.0.1:8000/api/transactions/", {
        book: bookId,
        member: memberId,
        rent_fee: rentFee,
      });
      setStatus("✅ Transaction created successfully!");
      setBookId("");
      setMemberId("");
      setRentFee("");
      fetchTransactions();
    } catch (error) {
      console.error("Error adding transaction:", error);
      setStatus("❌ Failed to add transaction.");
    }
  };

  useEffect(() => {
    fetchBooksAndMembers();
    fetchTransactions();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">📦 Transactions</h2>


      <div className="flex flex-col md:flex-row gap-3 mb-5">
        <select
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          className="flex-1 border border-gray-300 p-3 rounded-md"
        >
          <option value="">Select Book</option>
          {books.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title}
            </option>
          ))}
        </select>

        <select
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          className="flex-1 border border-gray-300 p-3 rounded-md"
        >
          <option value="">Select Member</option>
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Rent Fee (₹)"
          value={rentFee}
          onChange={(e) => setRentFee(e.target.value)}
          className="w-40 border border-gray-300 p-3 rounded-md"
        />

        <button
          onClick={addTransaction}
          className="bg-blue-600 text-white px-5 py-3 rounded-md hover:bg-blue-700"
        >
          Issue
        </button>
      </div>

      
      {status && (
        <p className="mb-4 text-sm text-center font-medium text-green-600">
          {status}
        </p>
      )}

    
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th className="p-3 border">Book</th>
              <th className="p-3 border">Member</th>
              <th className="p-3 border">Issued</th>
              <th className="p-3 border">Returned</th>
              <th className="p-3 border">Fee (₹)</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((t) => (
                <tr key={t.id} className="hover:bg-blue-50">
                  <td className="p-3 border">{t.book}</td>
                  <td className="p-3 border">{t.member}</td>
                  <td className="p-3 border">{t.issue_date}</td>
                  <td className="p-3 border">
                    {t.is_returned ? "✅ Returned" : "⏳ Pending"}
                  </td>
                  <td className="p-3 border text-center">{t.rent_fee}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500 italic">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;
