// src/pages/Dashboard.js
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/authcontext";
import AddExpense from "../components/AddExpense";
import ExpenseList from "../components/ExpenseList";
import SummaryCards from "../components/SummaryCards";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400 text-lg font-medium">
        Loading user...
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error.message);
      alert("Logout failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div className="mb-4 md:mb-0">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Welcome, <span className="text-blue-600">{user.email}</span>
          </h1>
          <p className="text-gray-500 mt-1">Manage your expenses efficiently</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition"
        >
          Logout
        </button>
      </header>

      {/* Summary Cards */}
      <section className="mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SummaryCards />
      </section>

      {/* Add Expense */}
      <section className="mb-10 bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Expense</h2>
        <AddExpense />
      </section>

      {/* Expense List */}
      <section className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Expenses</h2>
        <ExpenseList />
      </section>
    </div>
  );
}