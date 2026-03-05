import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authcontext";

export default function AddExpense() {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleAdd = async () => {
    await addDoc(
      collection(db, "users", user.uid, "expenses"),
      {
        title,
        amount: Number(amount),
        createdAt: serverTimestamp(),
      }
    );
  };

  return (
    <div>
      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}