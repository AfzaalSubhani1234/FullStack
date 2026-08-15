"use client";

export default function ExpenseList({
    expenses,
    onDelete,
    onViewReceipt,
}) {
    if (!expenses || expenses.length === 0) {
        return <p>No expenses found.</p>;
    }

    return (
        <div>
            <h2>Expenses</h2>

            {expenses.map((expense) => (
                <div
                    key={expense.id}
                    style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        marginBottom: "10px",
                        borderRadius: "8px",
                    }}
                >
                    <h3>{expense.category}</h3>

                    <p>
                        <strong>Amount:</strong> {expense.amount}
                    </p>

                    <p>
                        <strong>Date:</strong>{" "}
                        {expense.expense_date}
                    </p>

                    {expense.note && (
                        <p>
                            <strong>Note:</strong>{" "}
                            {expense.note}
                        </p>
                    )}

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            marginTop: "10px",
                        }}
                    >
                        {expense.receipt_path && (
                            <button
                                onClick={() =>
                                    onViewReceipt(
                                        expense.receipt_path
                                    )
                                }
                            >
                                View Receipt
                            </button>
                        )}

                        <button
                            onClick={() =>
                                onDelete(expense)
                            }
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}