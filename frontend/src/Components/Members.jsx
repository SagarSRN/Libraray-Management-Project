import React, { useState, useEffect } from "react";
import axios from "axios";

const Member = () => {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [debt, setDebt] = useState("");
  const [status, setStatus] = useState("");

  const fetchMembers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/members/");
      setMembers(res.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const addMember = async () => {
    if (!name.trim() || !email.trim()) {
      setStatus("⚠️ Please enter both name and email.");
      return;
    }
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/members/", {
        name,
        email,
        outstanding_debt: debt || 0,
      });
      setStatus(`✅ Member ${res.data.name} added successfully!`);
      setName("");
      setEmail("");
      setDebt("");
      fetchMembers();
    } catch (error) {
      console.error("Error adding member:", error);
      setStatus("❌ Failed to add member. Check email uniqueness.");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">👤 Members</h2>

      <div className="flex flex-col md:flex-row gap-3 mb-5">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border border-gray-300 p-3 rounded-md"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 border border-gray-300 p-3 rounded-md"
        />
        <input
          type="number"
          placeholder="Debt (₹)"
          value={debt}
          onChange={(e) => setDebt(e.target.value)}
          className="w-32 border border-gray-300 p-3 rounded-md"
        />
        <button
          onClick={addMember}
          className="bg-blue-600 text-white px-5 py-3 rounded-md hover:bg-blue-700"
        >
          Add
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
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Outstanding Debt (₹)</th>
            </tr>
          </thead>
          <tbody>
            {members.length > 0 ? (
              members.map((m) => (
                <tr key={m.id} className="hover:bg-blue-50">
                  <td className="p-3 border">{m.name}</td>
                  <td className="p-3 border">{m.email}</td>
                  <td className="p-3 border text-center">{m.outstanding_debt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500 italic">
                  No members found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Member;
