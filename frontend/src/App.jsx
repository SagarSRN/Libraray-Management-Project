import React from "react";
import Book from "./Components/Book";
import ImportBook from "./Components/ImportBook";
import Member from "./Components/Members";
import Transaction from "./Components/Transaction";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-blue-700">
        📚 Library Management System
      </h1>

      {/* Books Section */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <Book />
      </section>

      {/* Import Books Section */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <ImportBook />
      </section>

      {/* Members Section */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <Member />
      </section>

      {/* Transactions Section */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <Transaction />
      </section>
    </div>
  );
};

export default App;
