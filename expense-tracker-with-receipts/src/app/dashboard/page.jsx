"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";

import {
    getCurrentUser,
    logout,
} from "@/services/authService";

import {
    addExpense,
    getExpensesByMonth,
    deleteExpense,
} from "@/services/expenseService";

import {
    uploadReceipt,
    deleteReceipt,
    getReceiptUrl,
} from "@/services/storageService";

export default function DashboardPage() {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [receiptUrl, setReceiptUrl] =
        useState(null);
    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        initialize();
    }, []);

    async function initialize() {
        try {
            const currentUser =
                await getCurrentUser();

            if (!currentUser) {
                router.push("/login");
                return;
            }

            setUser(currentUser);

            await loadExpenses(
                currentUser.id
            );
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function loadExpenses(userId) {
        const today = new Date();

        const data =
            await getExpensesByMonth(
                userId,
                today.getFullYear(),
                today.getMonth() + 1
            );

        setExpenses(data || []);
    }

    async function handleAddExpense(
        formData
    ) {
        try {
            let receiptPath = null;

            if (formData.file) {
                receiptPath =
                    await uploadReceipt(
                        formData.file,
                        user.id
                    );
            }

            await addExpense({
                user_id: user.id,
                amount: Number(
                    formData.amount
                ),
                category:
                    formData.category,
                expense_date:
                    formData.expenseDate,
                note: formData.note,
                receipt_path:
                    receiptPath,
            });

            await loadExpenses(user.id);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    async function handleDeleteExpense(
        expense
    ) {
        try {
            if (
                expense.receipt_path
            ) {
                await deleteReceipt(
                    expense.receipt_path
                );
            }

            await deleteExpense(
                expense.id
            );

            await loadExpenses(
                user.id
            );
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    async function handleViewReceipt(
        filePath
    ) {
        try {
            const url =
                await getReceiptUrl(
                    filePath
                );

            setReceiptUrl(url);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    async function handleLogout() {
        try {
            await logout();
            router.push("/login");
        } catch (error) {
            console.error(error);
        }
    }

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>
                Expense Tracker
            </h1>

            <p>
                Welcome{" "}
                <strong>
                    {user?.email}
                </strong>
            </p>

            <button
                onClick={handleLogout}
            >
                Logout
            </button>

            <hr />

            <ExpenseForm
                onSubmit={
                    handleAddExpense
                }
            />

            <hr />

            <ExpenseList
                expenses={expenses}
                onDelete={
                    handleDeleteExpense
                }
                onViewReceipt={
                    handleViewReceipt
                }
            />

            {receiptUrl && (
                <div
                    style={{
                        marginTop: "20px",
                    }}
                >
                    <h2>Receipt</h2>

                    <img
                        src={receiptUrl}
                        alt="Receipt"
                        width="400"
                    />
                </div>
            )}
        </div>
    );
}