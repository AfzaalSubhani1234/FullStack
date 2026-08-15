"use client";
import { useState } from "react";
export default function ExpenseForm({
    onSubmit, }) {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");
    const [expenseDate, setExpenseDate] = useState("");
    const [note, setNote] = useState("");
    const [file, setFile] = useState(null);

    const [uploading, setUploading] =
        useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setUploading(true);

            await onSubmit({
                amount,
                category,
                expenseDate,
                note,
                file,
            });

            setAmount("");
            setCategory("Food");
            setExpenseDate("");
            setNote("");
            setFile(null);
        } catch (error) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Expense</h2>

            <div>
                <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>

            <br />

            <div>
                <select value={category} onChange={(e) =>
                    setCategory(e.target.value)
                }
                >
                    <option>Food</option>
                    <option>Transport</option>
                    <option>Bills</option>
                    <option>Shopping</option>
                    <option>Other</option>
                </select>
            </div>

            <br />

            <div>
                <input
                    type="date"
                    value={expenseDate}
                    onChange={(e) =>
                        setExpenseDate(e.target.value)
                    }
                    required
                />
            </div>

            <br />

            <div>
                <textarea
                    placeholder="Note"
                    value={note}
                    onChange={(e) =>
                        setNote(e.target.value)
                    }
                />
            </div>

            <br />

            <div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setFile(e.target.files[0])
                    }
                />
            </div>

            <br />

            <button
                type="submit"
                disabled={uploading}
            >
                {uploading
                    ? "Uploading..."
                    : "Save Expense"}
            </button>
        </form>
    );
}