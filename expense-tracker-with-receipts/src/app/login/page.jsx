"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/authService";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        try {
            setLoading(true);

            await login(email, password);

            router.push("/dashboard");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "30px" }}>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
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

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                {error && (
                    <p>{error}</p>
                )}
            </form>
        </div>
    );
}