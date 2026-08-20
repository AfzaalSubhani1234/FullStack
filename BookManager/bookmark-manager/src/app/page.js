import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          Bookmark Manager
        </h1>

        <p className={styles.subtitle}>
          Organize your favorite websites,
          articles, tutorials, and resources
          in one place.
        </p>

        <div className={styles.buttons}>
          <Link
            href="/login"
            className={styles.button}
          >
            Login
          </Link>

          <Link
            href="/signup"
            className={styles.button}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}