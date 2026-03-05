// src/components/SummaryCards.js
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authcontext";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function SummaryCards() {
  const { user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]); // ✅ initialize as empty array

  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(
      collection(db, "users", user.uid, "expenses"),
      (snapshot) => {
        setExpenses(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
      },
      (error) => {
        console.error("Error fetching expenses:", error);
      }
    );

    return () => unsub();
  }, [user]);

  // ✅ safely handle empty or undefined
  const totalAmount = expenses?.reduce((sum, exp) => sum + (exp.amount || 0), 0) || 0;

  return (
    <div style={{ marginBottom: "20px" }}>
      <div>Total Expenses: ${totalAmount}</div>
      <div>Number of Expenses: {expenses?.length || 0}</div>
    </div>
  );
}