"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/services/authService";
import styles from "./signup.module.css";

export default function SignupPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");

        try {
            setLoading(true);

            await signup(
                name,
                email,
                password,
                confirmPassword
            );

            alert(
                "Account created successfully!"
            );

            router.push("/login");
        } catch (err) {
            setError(
                err.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>
                    Create Account
                </h1>

                <form onSubmit={handleSubmit}>
                    <div className={styles.group}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className={styles.group}>
                        <input
                            className={styles.input}
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className={styles.group}>
                        <input
                            className={styles.input}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className={styles.group}>
                        <input
                            className={styles.input}
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(
                                    e.target.value
                                )
                            }
                            required
                        />
                    </div>

                    <button
                        className={styles.button}
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Signup"}
                    </button>

                    {error && (
                        <p className={styles.error}>
                            {error}
                        </p>
                    )}
                </form>

                <p className={styles.footer}>
                    Already have an account?{" "}
                    <span
                        onClick={() => router.push("/login")}
                        className={styles.link}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}