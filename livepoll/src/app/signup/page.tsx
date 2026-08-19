"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./signup.module.css";

export default function SignupPage() {
    const supabase = createClient();
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setError("");

        // Check passwords
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // Basic password validation
        if (password.length < 6) {
            setError(
                "Password must be at least 6 characters."
            );
            return;
        }

        setLoading(true);

        // Create Supabase account
        const { error } = await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: {
                data: {
                    name: name.trim(),
                },
            },
        });

        // Handle error
        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        // Signup successful
        setLoading(false);

        router.push("/login");
        router.refresh();
    };

    return (
        <div className={styles.container}>
            <form
                onSubmit={handleSignup}
                className={styles.form}
            >
                <h1 className={styles.title}>
                    Create Account
                </h1>

                {/* Name */}
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    className={styles.input}
                    required
                />

                {/* Email */}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    className={styles.input}
                    required
                />

                {/* Password */}
                <div className={styles.passwordContainer}>
                    <input
                        type={
                            showPassword
                                ? "text"
                                : "password"
                        }
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className={styles.passwordInput}
                        minLength={6}
                        required
                    />

                    <button
                        type="button"
                        className={styles.eyeButton}
                        onClick={() =>
                            setShowPassword(
                                !showPassword
                            )
                        }
                        aria-label={
                            showPassword
                                ? "Hide password"
                                : "Show password"
                        }
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            {showPassword ? (
                                <>
                                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="3"
                                    />
                                </>
                            ) : (
                                <>
                                    <path d="M3 3l18 18" />
                                    <path d="M9.9 4.2A10.5 10.5 0 0 1 12 4c7 0 10 8 10 8a16.7 16.7 0 0 1-3 4.4" />
                                    <path d="M6.6 6.6C3.7 8.5 2 12 2 12s3 7 10 7a9.8 9.8 0 0 0 4.2-.9" />
                                </>
                            )}
                        </svg>
                    </button>
                </div>

                {/* Confirm Password */}
                <div className={styles.passwordContainer}>
                    <input
                        type={
                            showConfirmPassword
                                ? "text"
                                : "password"
                        }
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(
                                e.target.value
                            )
                        }
                        className={styles.passwordInput}
                        minLength={6}
                        required
                    />

                    <button
                        type="button"
                        className={styles.eyeButton}
                        onClick={() =>
                            setShowConfirmPassword(
                                !showConfirmPassword
                            )
                        }
                        aria-label={
                            showConfirmPassword
                                ? "Hide password"
                                : "Show password"
                        }
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            {showConfirmPassword ? (
                                <>
                                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="3"
                                    />
                                </>
                            ) : (
                                <>
                                    <path d="M3 3l18 18" />
                                    <path d="M9.9 4.2A10.5 10.5 0 0 1 12 4c7 0 10 8 10 8a16.7 16.7 0 0 1-3 4.4" />
                                    <path d="M6.6 6.6C3.7 8.5 2 12 2 12s3 7 10 7a9.8 9.8 0 0 0 4.2-.9" />
                                </>
                            )}
                        </svg>
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <p className={styles.error}>
                        {error}
                    </p>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className={styles.button}
                >
                    {loading
                        ? "Creating..."
                        : "Sign Up"}
                </button>

                {/* Login */}
                <p className={styles.loginText}>
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className={styles.loginLink}
                    >
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}