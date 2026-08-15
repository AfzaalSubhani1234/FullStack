"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/services/authService";

export default function SignupPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
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

            alert("Account created successfully!");

            router.push("/login");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "30px" }}>
            <h1>Signup</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />
                </div>

                <br />

                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />
                </div>

                <br />

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />
                </div>

                <br />

                <div>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                    />
                </div>

                <br />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Signup"}
                </button>

                {error && (
                    <p>{error}</p>
                )}
            </form>
        </div>
    );
}