import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authcontext";

export default function ExpenseList() {
  const { user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "users", user.uid, "expenses"),
      (snapshot) => {
        setExpenses(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
      }
    );

    return () => unsub();
  }, [user]);

  return (
    <ul>
      {expenses.map(exp => (
        <li key={exp.id}>
          {exp.title} - ${exp.amount}
        </li>
      ))}
    </ul>
  );
}