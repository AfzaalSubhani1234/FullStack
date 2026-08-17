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

import styles from "./dashboard.module.css";

export default function DashboardPage() {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [receiptUrl, setReceiptUrl] = useState(null);
    const [loading, setLoading] = useState(true);

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
        try {
            const today = new Date();

            const data =
                await getExpensesByMonth(
                    userId,
                    today.getFullYear(),
                    today.getMonth() + 1
                );

            setExpenses(data || []);
        } catch (error) {
            console.error(error);
        }
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
        return (
            <div className={styles.loading}>
                <h2 className={styles.loadingText}>
                    Loading...
                </h2>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.dashboard}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>
                            Expense Tracker
                        </h1>

                        <p className={styles.welcome}>
                            Welcome{" "}
                            <span
                                className={styles.email}
                            >
                                {user?.email}
                            </span>
                        </p>
                    </div>

                    <button
                        className={
                            styles.logoutButton
                        }
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>

                <div className={styles.section}>
                    <h2
                        className={
                            styles.sectionTitle
                        }
                    >
                        Add Expense
                    </h2>

                    <ExpenseForm
                        onSubmit={
                            handleAddExpense
                        }
                    />
                </div>

                <div className={styles.section}>
                    <h2
                        className={
                            styles.sectionTitle
                        }
                    >
                        Monthly Expenses
                    </h2>

                    <ExpenseList
                        expenses={expenses}
                        onDelete={
                            handleDeleteExpense
                        }
                        onViewReceipt={
                            handleViewReceipt
                        }
                    />
                </div>

                {receiptUrl && (
                    <div
                        className={styles.receipt}
                    >
                        <h2
                            className={
                                styles.receiptTitle
                            }
                        >
                            Receipt Preview
                        </h2>

                        <img
                            src={receiptUrl}
                            alt="Receipt"
                            className={
                                styles.receiptImage
                            }
                        />
                    </div>
                )}
            </div>
        </div>
    );
}