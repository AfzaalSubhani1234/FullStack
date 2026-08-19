"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import CreatePoll from "@/components/CreatePoll";
import styles from "./dashboard.module.css";

type Poll = {
    id: string;
    question: string;
    created_at: string;
};

export default function DashboardPage() {
    const supabase = createClient();

    const [email, setEmail] = useState("");
    const [polls, setPolls] = useState<Poll[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [copiedId, setCopiedId] = useState("");

    useEffect(() => {
        const loadDashboard = async () => {
            setLoading(true);
            setError("");

            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                setError("You must be logged in.");
                setLoading(false);
                return;
            }

            setEmail(user.email || "");

            const { data, error: pollsError } = await supabase
                .from("polls")
                .select("id, question, created_at")
                .eq("user_id", user.id)
                .order("created_at", {
                    ascending: false,
                });

            if (pollsError) {
                setError(pollsError.message);
                setLoading(false);
                return;
            }

            setPolls(data || []);
            setLoading(false);
        };

        loadDashboard();
    }, []);

    const copyPollLink = async (pollId: string) => {
        const url = `${window.location.origin}/polls/${pollId}`;

        await navigator.clipboard.writeText(url);

        setCopiedId(pollId);

        setTimeout(() => {
            setCopiedId("");
        }, 2000);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();

        window.location.href = "/login";
    };

    return (
        <main className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Dashboard</h1>

                        <p className={styles.email}>
                            Logged in as: {email}
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className={styles.logoutButton}
                    >
                        Logout
                    </button>
                </div>

                <section className={styles.section}>
                    <CreatePoll />
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        My Polls
                    </h2>

                    {loading && (
                        <p className={styles.message}>
                            Loading polls...
                        </p>
                    )}

                    {error && (
                        <p className={styles.error}>
                            {error}
                        </p>
                    )}

                    {!loading &&
                        !error &&
                        polls.length === 0 && (
                            <p className={styles.message}>
                                You haven't created any polls yet.
                            </p>
                        )}

                    <div className={styles.pollList}>
                        {polls.map((poll) => (
                            <div
                                key={poll.id}
                                className={styles.pollCard}
                            >
                                <h3 className={styles.question}>
                                    {poll.question}
                                </h3>

                                <p className={styles.date}>
                                    Created:{" "}
                                    {new Date(
                                        poll.created_at
                                    ).toLocaleDateString()}
                                </p>

                                <div className={styles.actions}>
                                    <Link
                                        href={`/polls/${poll.id}`}
                                        target="_blank"
                                        className={styles.viewButton}
                                    >
                                        View Poll
                                    </Link>

                                    <button
                                        onClick={() =>
                                            copyPollLink(
                                                poll.id
                                            )
                                        }
                                        className={styles.copyButton}
                                    >
                                        {copiedId === poll.id
                                            ? "Copied!"
                                            : "Copy Link"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}