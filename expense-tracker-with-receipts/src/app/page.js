import Link from "next/link";
import styles from "./app.module.css";

export default function HomePage() {
  return (
    <main className={styles.home}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          Expense Tracker With Receipts
        </h1>

        <p>
          Track your expenses, upload receipts,
          and manage your monthly spending.
        </p>

        <div className={styles.buttons}>
          <Link href="/signup">
            <button>Get Started</button>
          </Link>

          <Link href="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </main>
  );
}