"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./login.module.css";

export default function LoginPage() {
    const supabase = createClient();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setError("");

        const cleanEmail = email.trim();

        if (!cleanEmail) {
            setError("Please enter your email.");
            return;
        }

        if (!password) {
            setError("Please enter your password.");
            return;
        }

        setLoading(true);

        try {
            const { error: loginError } =
                await supabase.auth.signInWithPassword({
                    email: cleanEmail,
                    password: password,
                });

            if (loginError) {
                setError(loginError.message);
                setLoading(false);
                return;
            }

            // Login successful
            router.replace("/dashboard");
            router.refresh();
        } catch (err) {
            console.error("Login error:", err);

            setError(
                "Something went wrong. Please try again."
            );

            setLoading(false);
        }
    };

    return (
        <main className={styles.container}>
            <form
                className={styles.form}
                onSubmit={handleLogin}
            >
                {/* Title */}
                <h1 className={styles.title}>
                    Login
                </h1>

                <p className={styles.description}>
                    Login to create and manage your polls.
                </p>

                {/* Email */}
                <div className={styles.field}>
                    <label
                        htmlFor="email"
                        className={styles.label}
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className={styles.input}
                        autoComplete="email"
                        required
                    />
                </div>

                {/* Password */}
                <div className={styles.field}>
                    <label
                        htmlFor="password"
                        className={styles.label}
                    >
                        Password
                    </label>

                    <div
                        className={
                            styles.passwordContainer
                        }
                    >
                        <input
                            id="password"
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            className={`${styles.input} ${styles.passwordInput}`}
                            autoComplete="current-password"
                            required
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                            className={
                                styles.showPassword
                            }
                            aria-label={
                                showPassword
                                    ? "Hide password"
                                    : "Show password"
                            }
                        >
                            {showPassword
                                ? "Hide"
                                : "Show"}
                        </button>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className={styles.error}>
                        {error}
                    </div>
                )}

                {/* Login Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={styles.button}
                >
                    {loading
                        ? "Logging in..."
                        : "Login"}
                </button>

                {/* Signup */}
                <p className={styles.signupText}>
                    Don't have an account?{" "}
                    <Link
                        href="/signup"
                        className={styles.link}
                    >
                        Sign Up
                    </Link>
                </p>

                {/* Home */}
                <Link
                    href="/"
                    className={styles.homeLink}
                >
                    Back to Home
                </Link>
            </form>
        </main>
    );
}