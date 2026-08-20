// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { supabase } from "../../lib/supabase";
// import styles from "./signup.module.css";

// export default function Signup() {
//     const router = useRouter();

//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");

//     async function handleSubmit(e) {
//         e.preventDefault();

//         if (password !== confirmPassword) {
//             setMessage("Passwords do not match.");
//             return;
//         }

//         setLoading(true);
//         setMessage("");

//         const { error } = await supabase.auth.signUp({
//             email,
//             password,
//         });

//         if (error) {
//             setMessage(error.message);
//             setLoading(false);
//             return;
//         }

//         setMessage("Account created successfully.");

//         router.push("/dashboard");

//         setLoading(false);
//     }

//     return (
//         <main className={styles.container}>
//             <div className={styles.card}>
//                 <h1 className={styles.title}>Sign Up</h1>

//                 <form
//                     onSubmit={handleSubmit}
//                     className={styles.form}
//                 >
//                     <input
//                         className={styles.input}
//                         type="text"
//                         placeholder="Username"
//                         value={username}
//                         onChange={(e) =>
//                             setUsername(e.target.value)
//                         }
//                     />

//                     <input
//                         className={styles.input}
//                         type="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) =>
//                             setEmail(e.target.value)
//                         }
//                         required
//                     />

//                     <input
//                         className={styles.input}
//                         type="password"
//                         placeholder="Enter your password"
//                         value={password}
//                         onChange={(e) =>
//                             setPassword(e.target.value)
//                         }
//                         required
//                     />

//                     <input
//                         className={styles.input}
//                         type="password"
//                         placeholder="Confirm your password"
//                         value={confirmPassword}
//                         onChange={(e) =>
//                             setConfirmPassword(
//                                 e.target.value
//                             )
//                         }
//                         required
//                     />

//                     <button
//                         className={styles.button}
//                         type="submit"
//                         disabled={loading}
//                     >
//                         {loading ? "Loading..." : "Sign Up"}
//                     </button>

//                     {message && (
//                         <p className={styles.message}>
//                             {message}
//                         </p>
//                     )}
//                 </form>

//                 <p className={styles.link}>
//                     Already have an account?{" "}
//                     <Link href="/login">
//                         Login
//                     </Link>
//                 </p>
//             </div>
//         </main>
//     );
// }




"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import styles from "./signup.module.css";

export default function Signup() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        setLoading(true);
        setMessage("");

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username: username,
                },
            },
        });

        if (error) {
            setMessage(error.message);
            setLoading(false);
            return;
        }

        if (!data.session) {
            setMessage(
                "Account created! Please check your email and confirm your account before logging in."
            );

            setLoading(false);
            return;
        }

        setMessage("Account created successfully. Redirecting...");

        router.push("/dashboard");
    }

    return (
        <main className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Sign Up</h1>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* Username */}
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    {/* Email */}
                    <input
                        className={styles.input}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {/* Password */}
                    <div className={styles.passwordBox}>
                        <input
                            className={styles.passwordInput}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                        />

                        <button
                            type="button"
                            className={styles.eyeButton}
                            onClick={() =>
                                setShowPassword((prev) => !prev)
                            }
                            aria-label={
                                showPassword
                                    ? "Hide password"
                                    : "Show password"
                            }
                        >
                            {showPassword ? (
                                /* Open eye */
                                <svg
                                    viewBox="0 0 24 24"
                                    className={styles.eyeIcon}
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2.5 12C2.5 12 6 5.5 12 5.5S21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="3"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    />
                                </svg>
                            ) : (
                                /* Closed / crossed eye */
                                <svg
                                    viewBox="0 0 24 24"
                                    className={styles.eyeIcon}
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M3 3L21 21"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M10.6 6C11.05 5.9 11.52 5.85 12 5.85C18 5.85 21.5 12 21.5 12C21.5 12 20.1 14.45 17.6 16.2"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M6.4 7.8C4.15 9.45 2.5 12 2.5 12C2.5 12 6 18.15 12 18.15C13.15 18.15 14.25 17.9 15.25 17.5"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className={styles.passwordBox}>
                        <input
                            className={styles.passwordInput}
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            required
                            minLength={6}
                        />

                        <button
                            type="button"
                            className={styles.eyeButton}
                            onClick={() =>
                                setShowConfirmPassword((prev) => !prev)
                            }
                            aria-label={
                                showConfirmPassword
                                    ? "Hide confirm password"
                                    : "Show confirm password"
                            }
                        >
                            {showConfirmPassword ? (
                                /* Open eye */
                                <svg
                                    viewBox="0 0 24 24"
                                    className={styles.eyeIcon}
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2.5 12C2.5 12 6 5.5 12 5.5S21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="3"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    />
                                </svg>
                            ) : (
                                /* Closed / crossed eye */
                                <svg
                                    viewBox="0 0 24 24"
                                    className={styles.eyeIcon}
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M3 3L21 21"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M10.6 6C11.05 5.9 11.52 5.85 12 5.85C18 5.85 21.5 12 21.5 12C21.5 12 20.1 14.45 17.6 16.2"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M6.4 7.8C4.15 9.45 2.5 12 2.5 12C2.5 12 6 18.15 12 18.15C13.15 18.15 14.25 17.9 15.25 17.5"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>

                    <button
                        className={styles.button}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Creating account..." : "Sign Up"}
                    </button>

                    {message && (
                        <p className={styles.message}>
                            {message}
                        </p>
                    )}
                </form>

                <p className={styles.link}>
                    Already have an account?{" "}
                    <Link href="/login">Login</Link>
                </p>
            </div>
        </main>
    );
}